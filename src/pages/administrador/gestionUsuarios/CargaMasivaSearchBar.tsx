import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components';
import { FiFileText } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import * as XLSX from 'xlsx';
import { useDataGrid } from '../../../context/UsersDataGridContext';
import { SaveIcon, TrashIcon } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { User, ExcelDataUser } from '../../../store/types/User';
import ModalConfirmation from '../../../components/ModalConfirmation';
import { useUser } from '../../../store/hooks/useUser';
import { useEspecialidad } from '../../../store/hooks/useEspecialidad';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { BiDownArrow } from 'react-icons/bi';
import ArrowDown from '../../../assets/svg/ArrowDown';

type InputProps = {
  rol: "estudiante" | "usuario";
}

export default function CargaMasivaSearchBar({ rol }: InputProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [jsonData, setJsonData] = useState("");
  const [existFile, setExistFile] = useState(false);
  const { setRowData, rowData, setLoading } = useDataGrid();
  const { postUser, postStudent, loading } = useUser();

  const { fetchEspecialidadData2, especialidadData } = useEspecialidad();
  const [isOpenModalSucess, setIsOpenModalSucess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);

  useEffect(() => {
    fetchEspecialidadData2();
  }, []);

  const handleClickDescargarFormato = async () => {
    let data = [
      ["Codigo", "Correo", "Nombres", "PrimerApellido", "SegundoApellido", "Telefono"],
      ["20240001", "ejemplo@pucp.edu.pe", "Lorem", "Ipsum", "Ipsum", "999999999"]
    ];

    if (rol === 'estudiante') {
      await fetchEspecialidadData2(); // Espera a que se obtengan los datos de especialidad
      console.log("especialidadData: ", especialidadData);

      let data2 = [["Facultad", "Especialidad"]];
      especialidadData.forEach((item) => {
        let newSpecialty = [item.faculty.name, item.name];
        data2.push(newSpecialty);
      });

      // Agregar los usuarios en la primera hoja de datos
      data = [
        ["Codigo", "Correo", "Nombres", "PrimerApellido", "SegundoApellido", "Telefono", "Especialidad"],
        ["20240001", "ejemplo@pucp.edu.pe", "Lorem", "Ipsum", "Ipsum", "999999999", "Ingeniería Informática"]
      ];

      // Crear una hoja de formato alumnos
      const ws2 = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws2, "Formato Alumnos");

      // Crear la hoja de especialidades y agregarla al libro
      const ws = XLSX.utils.aoa_to_sheet(data2);
      XLSX.utils.book_append_sheet(wb, ws, "Especialidades");

      // Descargar el archivo
      XLSX.writeFile(wb, "FormatoAlumnos.xlsx");
    } else {
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Formato Usuarios");
      XLSX.writeFile(wb, "FormatoUsuarios.xlsx");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files.length === 1 ? e.target.files[0] : null;

    if (selectedFile) {
      // Verificar si el archivo es de tipo Excel
      const isValidFileType =
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      if (!isValidFileType) {
        alert("El archivo seleccionado no es un archivo de Excel válido.");
        setFile(null);
        setExistFile(false);
        return;
      }

      // Actualizar el estado de file y existFile
      setFile(selectedFile);
      setExistFile(true);
    } else {
      // En caso de que no haya archivos seleccionados
      setFile(null);
      setExistFile(false);
    }
  };

  //en el caso rol sea estudiante debe tener una columna que se llame "Especialidad"
  const handleConvert = () => {
    if (file) {
      setLoading(true); // Inicia la carga
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: ExcelDataUser[] = XLSX.utils.sheet_to_json(worksheet);

        // Definir las columnas esperadas
        let expectedColumns = ['Codigo', 'Correo', 'Nombres', 'PrimerApellido', 'SegundoApellido', 'Telefono'];
        if (rol === 'estudiante') {
          expectedColumns.push('Especialidad');
        }

        // Obtener las columnas reales del primer objeto
        const actualColumns = Object.keys(jsonData[0]); // Obtener las columnas reales del primer objeto

        // Validar el formato de las columnas
        const isValidFormat = expectedColumns.every(column => actualColumns.includes(column));
        if (!isValidFormat) {
          alert("El archivo Excel no tiene el formato de columnas esperado.");
          setLoading(false); // Finaliza la carga
          return;
        }

        // Procesar los datos si el formato es válido
        const users: User[] = jsonData.map((item, index) => {
          let estudiante = null;

          if (rol === 'estudiante') {
            const specialty = especialidadData.find(spec => spec.name === item.Especialidad);
            console.log('Especialidad encontrada:', specialty);
            if (specialty) {
              estudiante = {
                isRisk: false, // Default value or fetch from data if available
                specialityId: specialty.id,
                specialtyName: specialty.name,
                specialtyAcronym: specialty.acronym,
                facultyId: specialty.faculty.facultyId,
                facultyName: specialty.faculty.name,
                facultyAcronym: specialty.faculty.acronym,
              };
            }
          }

          return {
            id: -1, // ID user nuevo
            institutionalEmail: item.Correo,
            pucpCode: item.Codigo,
            isActive: true,
            creationDate: new Date(),
            modificationDate: new Date(),
            persona: {
              id: -1, // ID user nuevo
              name: item.Nombres,
              lastName: item.PrimerApellido,
              secondLastName: item.SegundoApellido,
              phone: item.Telefono,
              isActive: true,
            },
            roles: null,
            isVerified: true,
            estudiante: estudiante,
          };
        });
        setRowData(users);
        setLoading(false); // Finaliza la carga
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setExistFile(false);
  }
  const handleClickLimpiarGridView = () => {
    setRowData([]);
  }

  const handleClickGuardarUsuarios = () => {
    //las validaciones
    setIsOpen(true);
  }

  const handleOnConfirmSaveUsuarios = () => {
    console.log("rowData: ", rowData);
    const promises = rowData.map(user => {
      user.pucpCode = String(user.pucpCode);
      user.persona.phone = String(user.persona.phone); // Convertir phone a string si es necesario
      console.log("User save 2: ", user);

      if (rol === 'estudiante') {
        // Si necesitas implementar postStudent, descomenta y ajusta según necesites
        return postStudent(user)
          .then(response => response)
          .catch(error => false); // Manejar error si la promesa falla
      } else {
        // Utilizar postUser y retornar la promesa
        //return postUser(user)
        //  .then(response => response)
        //  .catch(error => false); // Manejar error si la promesa falla
      }
    });

    // Utilizar Promise.all para esperar a que todas las promesas se resuelvan
    Promise.all(promises)
      .then(results => {
        // results contendrá un array con los resultados de cada promesa (true o false)
        const allSuccess = results.every(result => result === true);
        if (allSuccess) {
          setIsOpenModalSucess(true); // Mostrar modal de éxito si todas las inserciones fueron exitosas
        } else {
          setIsOpenModalError(true); // Mostrar modal de error si hubo al menos una inserción fallida
        }
      })
      .catch(error => {
        setIsOpenModalError(true); // Manejar cualquier error en Promise.all
      });
  };

  return (
    <div className='flex w-full h-full flex-col py-0 gap-4'>
      <div>
        <Button onClick={handleClickDescargarFormato} text="Descargar Formato" variant='primario' icon={ArrowDown} />
      </div>
      <div className='grid grid-cols-2 items-end w-full h-full gap-4'>
        <div className='col-span-1'>
          <input className='shadow-custom font-roboto text-sm font-medium rounded-xl w-full my-2'
            ref={fileInputRef}
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
          />
        </div>
        <div className='flex space-x-4'>
          <Button onClick={handleConvert} text="Cargar" variant='primario' icon={FiFileText} iconSize={24} className={"my-2"} disabled={!existFile} />
          <Button onClick={handleClearFile} variant='warning' icon={FaRegTrashCan} iconSize={24} className={"my-2"} />
        </div>
      </div>
      <div className='grid grid-cols-2 items-end gap-4'>
        <h2 className='font-montserrat text-2xl font-bold text-primary px-2'>Vista Previa</h2>
        <div className='flex w-full h-12 justify-end space-x-4'>
          <Button onClick={handleClickLimpiarGridView} text="Limpiar" variant='primario' icon={TrashIcon} />
          <Button onClick={handleClickGuardarUsuarios} text="Guardar" icon={SaveIcon} />
        </div>
      </div>
      <ModalConfirmation isOpen={isOpen} message={`¿Esta seguro de guardar los ${rowData.length} usuarios?`}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {
          handleOnConfirmSaveUsuarios();
          setIsOpen(false);
        }}
        isAcceptAction={true}
      />
      <ModalSuccess isOpen={isOpenModalSucess}
        message={"Se guardaron los cambios satisfactoriamente"}
        onClose={() => {
          setIsOpenModalSucess(false);
          navigate(`/${rol}s`);
        }}
      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un error al intentar procesar algún usuario. Intente nuevamente.'
        onClose={() => setIsOpenModalError(false)}
      />
    </div>
  )
}

/*
<InputAdmin titulo=".xlsx *" name="fileName" text={""} placeholder='Selecciona el archivo' enable={false} />

<Button onClick={handleClickNuevoUsuario} text={"Seleccionar"} icon={GrCursor} iconSize={24} className={"my-2"} />
*/