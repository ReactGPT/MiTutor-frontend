import React, { useState, useRef } from "react";
import ArrowIcon from "../../../../assets/svg/ArrowIcon";
import FileIcon from "../../../../assets/svg/FileIcon";
import TrashIcon from "../../../../assets/svg/TrashIcon";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import AddIcon from "../../../../assets/svg/AddIcon";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useStudentId } from "../../../../store/hooks/useStudentId";

interface InputFile {
  name: string;
  file: File | null;
}

const initialFileState: InputFile = {
  name: "",
  file: null,
};

type InputState = "normal" | "error" | "success";

interface RowData {
  Codigo: string;
  Nombres: string;
  Apellidos: string;
  Correos: string;
  Facultades: string;
  EstadoCuenta?: string;
}
//El papaParse para la cosa esa

const InputFile = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<InputFile>(initialFileState);
  const [inputState, setInputState] = useState<InputState>("normal");
  //const [rowData, setRowData] = useState<RowData[]>([]);
  const [rowVerified, setRowVerified] = useState<RowData[]>([]);
  const { studentIdData, fetchStudentIdData } = useStudentId();

  const handleUploadFile = () => {
    inputFileRef.current?.click();
  };

  const handleChangeInputFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectFile = event.target.files && event.target.files[0];
    if (selectFile) {
      const { name, type } = selectFile;
      const validFiles = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      if (validFiles.includes(type)) {
        setInputState("success");
        setFile({ name: name, file: selectFile });
      } else {
        setInputState("error");
        setFile({ name: name, file: null });
      }
    }
  };

  const handleClearInput = () => {
    setInputState("normal");
    setFile(initialFileState);
    setRowVerified([]);
  };

  const handleClearVerifiedData = () => {
    setRowVerified([]);
  }

  const handleVerifiedData = async (data: RowData[]) => {
    const mappedStudents = data.map(async (estudiante) => {
      const studentRes = await fetchStudentIdData(Number(estudiante.Codigo));
      const student = studentRes[0];
      console.log("student fetched", studentIdData);

      let studentData;

      if (student === null) {
        studentData = {
          Codigo: estudiante.Codigo,
          Nombres: estudiante.Nombres,
          Apellidos: estudiante.Apellidos,
          Correos: estudiante.Correos,
          Facultades: estudiante.Facultades,
          EstadoCuenta: "No encontrado",
        };
      } else {
        studentData = {
          Codigo: student.pucpCode.toString(),
          Nombres: student.name,
          Apellidos: student.lastName,
          Correos: student.institutionalEmail,
          Facultades: student.facultyName,
          EstadoCuenta: student.isActive ? "Activo" : "Inactivo",
        };
      }
      console.log("fetched estudiante", studentData, "from:", estudiante);
      return studentData;
    });
    //console.log("mapped students",mappedStudents);
    const verifiedData = await Promise.all(mappedStudents);

    console.log("verifiedData", verifiedData);

    setRowVerified(
      verifiedData.filter((studentData) => studentData !== null) as RowData[]
    );
  };

  const handleReadFile = () => {
    if (file.file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const contenido = event.target?.result as string;
        let data: RowData[] = [];
        if (file.name.endsWith(".csv")) {
          const results = Papa.parse(contenido, { header: true });
          const formattedData: RowData[] = results.data
            .filter((row: unknown): row is RowData => {
              // Verifica si row es un objeto y no es nulo
              if (row && typeof row === "object") {
                // Realiza una comprobación de tipo para cada fila
                return (
                  "Codigo" in row &&
                  "Nombres" in row &&
                  "Apellidos" in row &&
                  "Correos" in row &&
                  "Facultades" in row
                );
              }
              return false; // Descarta filas que son nulas o no son objetos para el papaParse de la cosa esa
            })
            .map((row: RowData) => ({
              Codigo: row.Codigo || "",
              Nombres: row.Nombres || "",
              Apellidos: row.Apellidos || "",
              Correos: row.Correos || "",
              Facultades: row.Facultades || "",
            }));

          //console.log('Formatted Data:', formattedData);
          data = formattedData;
        } else if (file.name.endsWith(".xlsx")) {
          const workbook = XLSX.read(contenido, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convertir la hoja de cálculo a un array de objetos según la interfaz RowData
          console.log(XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]);
          const cabeceras: any = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          })[0];

          const dictCabecera: any[] = cabeceras.map(
            (item: string, index: number) => {
              return {
                position: index,
                field: item,
              };
            }
          );
          //console.log("Dict",dictCabecera);
          const formattedData: RowData[] = XLSX.utils
            .sheet_to_json(worksheet, { header: 1 })
            .slice(1) // omitir la fila de encabezado
            .map((row: unknown) => {
              if (Array.isArray(row)) {
                console.log(row);
                return {
                  Codigo:
                    String(
                      row[
                        dictCabecera.find(
                          (item: any) => item.field === "Codigo"
                        ).position
                      ]
                    ) || "",
                  Nombres:
                    String(
                      row[
                        dictCabecera.find(
                          (item: any) => item.field === "Nombres"
                        ).position
                      ]
                    ) || "",
                  Apellidos:
                    String(
                      row[
                        dictCabecera.find(
                          (item: any) => item.field === "Apellidos"
                        ).position
                      ]
                    ) || "",
                  Correos:
                    String(
                      row[
                        dictCabecera.find(
                          (item: any) => item.field === "Correos"
                        ).position
                      ]
                    ) || "",
                  Facultades:
                    String(
                      row[
                        dictCabecera.find(
                          (item: any) => item.field === "Facultades"
                        ).position
                      ]
                    ) || "",
                };
              }
              return {
                Codigo: "",
                Nombres: "",
                Apellidos: "",
                Correos: "",
                Facultades: "",
              };
            }) as RowData[];

          //console.log('Formatted Data:', formattedData);
          data = formattedData;
        }
        handleVerifiedData(data);
        //setRowData(data);
      };

      if (file.name.endsWith(".csv")) {
        reader.readAsText(file.file);
      } else if (file.name.endsWith(".xlsx")) {
        reader.readAsArrayBuffer(file.file);
      }
    }
  };

  const defaultColDef = {
    suppressHeaderMenuButton: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
  };
  const columnDefs: ColDef[] = [
    { headerName: "Código", field: "Codigo", maxWidth: 150 },
    { headerName: "Nombres", field: "Nombres" },
    { headerName: "Apellidos", field: "Apellidos" },
    { headerName: "Correos", field: "Correos" },
    { headerName: "Facultades", field: "Facultades" },
    { headerName: "Estado de cuenta", field: "EstadoCuenta" },
  ];

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {/* Empieza input file */}
      <div className="flex gap-[10px] items-end">
        <div className="flex flex-col gap-[2px]">
          <label className="text-primary">
            .xlxs, .csv <span className="text-red-800">*</span>
          </label>
          <input
            value={file.name}
            className={`rounded-[15px] outline-none p-3 w-[460px] h-[43px] bg-file-${inputState}`}
            type="text"
            readOnly
          />
        </div>
        <div>
          <button
            onClick={handleUploadFile}
            className="flex justify-center items-center px-3 gap-[10px] border border-primary rounded-[10px] h-[42px]"
          >
            <ArrowIcon width={20} height={20}></ArrowIcon>
            <p className="text-primary">Seleccionar</p>
          </button>
        </div>
        <div>
          <button
            disabled={inputState !== "success"}
            onClick={handleReadFile}
            className={`flex justify-center items-center px-3 gap-[10px] border border-primary rounded-[10px] h-[42px] ${
              inputState !== "success" ? "opacity-50" : ""
            }`}
          >
            <FileIcon width={16} height={20}></FileIcon>
            <p>Cargar</p>
          </button>
        </div>
        <div>
          <button
            onClick={handleClearInput}
            disabled={file.name === ""}
            className={`flex justify-center items-center px-3 gap-[10px] border rounded-[10px] h-[42px] ${
              inputState === "success" || inputState === "error"
                ? "bg-file-error"
                : "border-primary"
            } ${file.name === "" ? "opacity-50" : ""}`}
          >
            <TrashIcon
              width={18}
              height={20}
              color={`${
                inputState === "success" || inputState === "error"
                  ? "red"
                  : "#042354"
              }`}
            ></TrashIcon>
          </button>
        </div>
        <input
          className="hidden"
          type="file"
          ref={inputFileRef}
          onChange={handleChangeInputFile}
          accept=".csv, .xlsx"
        />
      </div>
      {/* Fin input file */}

      {/* Vista previa */}
      <div className="w-full h-full">
        <h1 className="text-[28px] font-bold text-[#2F2F2F]">Vista previa</h1>
        <div className="flex flex-row justify-end gap-[10px] m-[15px]">
          <div className="w-full justify-items-center">
            <p className={`mt-4`}>Las columnas del archivo no cumplen con el formato</p>
          </div>
          <button
            disabled={inputState !== "success"}
            className={`flex justify-center items-center px-3 gap-[10px] border border-primary rounded-[10px] h-[42px] ${
              inputState !== "success" ? "opacity-50" : ""
            }`}
          >
            <AddIcon height={16} width={16}></AddIcon>
            <p className="text-primary">Agregar</p>
          </button>
          <button
            onClick={handleClearVerifiedData}
            disabled={inputState !== "success"}
            className={`flex justify-center items-center px-3 gap-[10px] border border-primary rounded-[10px] h-[42px] ${
              inputState !== "success" ? "opacity-50" : ""
            }`}
          >
            <TrashIcon height={18} width={20}></TrashIcon>
            <p className="text-primary">Limpiar</p>
          </button>
        </div>

        <div className="flex w-full h-[75%] ag-theme-alpine ag-theme-alpine2">
          <div className="w-full h-full">
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={columnDefs}
              rowData={rowVerified}
            />
          </div>
        </div>
      </div>
      {/* Fin vista previa */}
    </div>
  );
};

export default InputFile;
