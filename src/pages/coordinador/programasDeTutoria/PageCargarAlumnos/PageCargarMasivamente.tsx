import React, { useState, useRef, useEffect } from "react";
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
import { useStudent } from "../../../../store/hooks/useStudent";
import { Student } from '../../../../store/types/Student';
import { CloseIcon } from "../../../../assets";
//import { Button } from "../../../../components";
//import { useNavigate } from 'react-router-dom';

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

const rowDataKeys: string[] = [
  "Codigo",
  "Nombres",
  "Apellidos",
  "Correos",
  "Facultades",
];
//El papaParse para la cosa esa

type Props ={
  setStudentDataModified: (state:(studentData: Student[])=>Student[]) => void,
  setPopout: (state:boolean) => void
}

const PageCargarMasivamente = (
  {setStudentDataModified, setPopout}:Props
) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<InputFile>(initialFileState);
  const [inputState, setInputState] = useState<InputState>("normal");
  const [rowData, setRowData] = useState<RowData[]>([]);
  const { studentData, fetchStudentIdData } = useStudent();
  const [headerOk, setHeaderOk] = useState<boolean>(true);
  //const navigate=useNavigate();

  useEffect(() => {
    fetchStudentIdData(
      rowData.map((row) => {
        return {
          studentId: 0,
          name: row.Nombres,
          lastName: row.Apellidos,
          secondLastName: "",
          isActive: false,
          pucpCode: row.Codigo,
          institutionalEmail: row.Correos,
          facultyName: row.Facultades,
          isRegistered: false,
        };
      })
    );
  }, [rowData]);

  const handleAgregar = () => {
    setStudentDataModified((prevData) =>{
      return [...prevData, ...studentData.filter((student) => 
        student.studentId !== 0 && !prevData.some((prevStudent) => prevStudent.pucpCode === student.pucpCode))
      ]
      //return [...prevData, ...studentData.filter((student) => student.studentId !== 0)]
    });
    setPopout(false);
  }

  const handleUploadFile = () => {
    inputFileRef.current?.click();
  };

  const compareFieldsInFile = (
    header: string[],
    rowDataKeys: string[]
  ): boolean => {
    if (header.length !== rowDataKeys.length) {
      return false;
    }
    const lowerCaseHeader = header.map((field) => field.toLowerCase());
    const lowerCaseRowDataKeys = rowDataKeys.map((key) => key.toLowerCase());

    return lowerCaseHeader.every((field) =>
      lowerCaseRowDataKeys.includes(field)
    );
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
    setRowData([]);
    setHeaderOk(true);
  };

  const handleClearVerifiedData = () => {
    setRowData([]);
  };

  const handleReadFile = () => {
    if (file.file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const contenido = event.target?.result as string;
        let data: RowData[] = [];
        if (file.name.endsWith(".csv")) {
          const results = Papa.parse(contenido, { header: true });
          const header = results.meta.fields;
          if(header !== undefined){
            if (!compareFieldsInFile(header, rowDataKeys)) {
              setHeaderOk(false);
              return;
            } else {
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
              setHeaderOk(true);
              data = formattedData;
            }
          }
        } else if (file.name.endsWith(".xlsx")) {
          const workbook = XLSX.read(contenido, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convertir la hoja de cálculo a un array de objetos según la interfaz RowData
          //console.log(XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]);
          const cabeceras: any = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          })[0];
          if (!compareFieldsInFile(cabeceras, rowDataKeys)) {
            setHeaderOk(false);
            return;
          }
          else{
            const dictCabecera: any[] = cabeceras.map(
              (item: string, index: number) => {
                return {
                  position: index,
                  field: item,
                };
              }
            );
            const formattedData: RowData[] = XLSX.utils
              .sheet_to_json(worksheet, { header: 1 })
              .slice(1) // omitir la fila de encabezado
              .map((row: unknown) => {
                if (Array.isArray(row)) {
                  //console.log(row);
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
            setHeaderOk(true);
            data = formattedData;
          }
        }
        setRowData(data);
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
    { headerName: "Código", field: "pucpCode", maxWidth: 120 },
    { headerName: "Nombres", field: "name" , maxWidth: 150 },
    { headerName: "Apellidos", field: "lastName" },
    { headerName: "Correos", field: "institutionalEmail" },
    { headerName: "Facultades", field: "facultyName" },
    { headerName: "Estado de cuenta", field: "isActive", maxWidth: 150 },
  ];

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {/* Empieza input file */}
      <div className="flex gap-[10px] items-end">
        <div className="flex flex-col gap-[2px]">
          <label className="text-primary">
            .xlsx, .csv <span className="text-red-800">*</span>
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
          onClick={(e) => (e.currentTarget.value = "")}
          onChange={handleChangeInputFile}
          accept=".csv, .xlsx"
        />
        <button className={`flex justify-center items-center border rounded-[10px] h-[42px]`}
          onClick={()=>setPopout(false)}>
            <CloseIcon className=""/>
        </button>
      </div>
      {/* Fin input file */}

      {/* Vista previa */}
      <div className="w-full h-full">
        <h1 className="text-[28px] font-bold text-[#2F2F2F]">Vista previa</h1>
        <div className="flex flex-row justify-end gap-[10px] m-[15px]">
          <div className="w-full justify-items-center">
            <p className={`mt-4 ${ headerOk===false ? "text-red-600":"hidden" }`}>
              Las columnas del archivo no cumplen con el formato
            </p>
          </div>
          <button
            onClick={handleAgregar}
            disabled={studentData.length === 0}
            className={`flex justify-center items-center px-3 gap-[10px] border border-primary rounded-[10px] h-[42px] ${
              studentData.length === 0 ? "opacity-50" : ""
            }`}
          >
            <AddIcon height={16} width={16}></AddIcon>
            <p className="text-primary">Agregar</p>
          </button>
          <button
            onClick={handleClearVerifiedData}
            disabled={studentData.length === 0}
            className={`flex justify-center items-center px-3 gap-[10px] border border-primary rounded-[10px] h-[42px] ${
              studentData.length === 0 ? "opacity-50" : ""
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
              rowData={studentData.map((student) => {
                return {
                  pucpCode: student.pucpCode,
                  name: student.name,
                  lastName: student.lastName,
                  institutionalEmail: student.institutionalEmail,
                  facultyName: student.facultyName,
                  isActive:
                    student.studentId == 0
                      ? "No encontrado"
                      : student.isActive
                      ? "Activo"
                      : "Inactivo",
                };
              })}
            />
          </div>
        </div>
      </div>
      {/* Fin vista previa */}
    </div>
  );
};

export default PageCargarMasivamente;
