import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, CellClassParams, CellMouseOverEvent } from 'ag-grid-community';
import * as XLSX from 'xlsx';
import { Button, Spinner } from '../../../components';
import { FiFileText } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { SaveIcon, TrashIcon } from '../../../assets';
import { json, useNavigate } from 'react-router-dom';
import { User, ExcelDataUser } from '../../../store/types/User';
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { useUser } from '../../../store/hooks/useUser';
import { useEspecialidad } from '../../../store/hooks/useEspecialidad';
import ArrowDown from '../../../assets/svg/ArrowDown';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface Especialidad {
  id: number;
  nombre: string;
  nombreFacultad: string;
}

export default function PageActualizacionMasivaAlumnos() {
  const [file, setFile] = useState<File | null>(null);
  const [rowData, setRowData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { postStudent, fetchStudentsSingleSet } = useUser();
  const { fetchEspecialidadData2, especialidadData } = useEspecialidad();
  const [existingStudents, setExistingStudents] = useState<User[]>([]);
  const [listaEspecialidades, setListaEspecialidades] = useState<Especialidad[]>([]);
  const [codes, setCodes] = useState<string[]>([]);
  const [hasErrors, setHasErrors] = useState(true);
  const [cleanActive, setCleanActive] = useState(true);
  const gridRef = useRef<AgGridReact>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetchEspecialidadData2();
      const students = await fetchStudentsSingleSet();
      setExistingStudents(students);
      students.forEach((item) => {
        codes.push(item.pucpCode);
      });
    };
    fetchData();
    setCleanActive(false);
  }, []);

  const handleClickDescargarFormato = async () => {
    await fetchEspecialidadData2();
    let data = [
      //["Correo", "Codigo", "Nombres", "PrimerApellido", "SegundoApellido", "Telefono", "Facultad", "Especialidad"],
      //["ejemplo@pucp.edu.pe", "20240001", "Juan", "Perez", "Gomez", "999999999", "Estudios Generales Ciencias", "Ingeniería Informática",]
      ["Correo", "Facultad", "Especialidad"],
      ["ejemplo@pucp.edu.pe", "Facultad de Ejemplo", "Especialidad de Ejemplo",]
    ];

    let data2 = [["Facultad", "Especialidad"]];
    especialidadData.forEach((item) => {
      data2.push([item.faculty.name, item.name]);
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(data), "Formato Alumnos");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(data2), "Especialidades");
    XLSX.writeFile(wb, "FormatoActualizacionAlumnos.xlsx");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const isValidFileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(selectedFile.type);
      if (!isValidFileType) {
        alert("El archivo seleccionado no es un archivo de Excel válido.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const validateSpecialty = (specialty: string): { isValid: boolean; errorMessage: string } => {
    //console.log('rowData: ', especialidadData, specialty)
    const specialtyExists = listaEspecialidades.some(item => item.nombre === specialty);
    if (!specialtyExists) {
      return { isValid: false, errorMessage: 'La especialidad no existe en el sistema' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validatePhone = (phone: string): { isValid: boolean; errorMessage: string } => {
    if (phone === undefined || phone === null || phone === '') {
      return { isValid: true, errorMessage: '' };
    }
    // Verifica que el teléfono solo contenga números y tenga una longitud razonable
    const phoneRegex = /^\d{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return { isValid: false, errorMessage: 'El teléfono solo debe contener números' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateCode = (code: string): { isValid: boolean; errorMessage: string } => {
    if (code === undefined || code === null || code === '') {
      return { isValid: true, errorMessage: '' };
    }
    // Verificar longitud del código
    if (code.length < 7 || code.length > 15) {
      return { isValid: false, errorMessage: 'El código debe tener entre 7 y 15 caracteres' };
    }
    // Verificar que solo contenga letras y números
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(code)) {
      return { isValid: false, errorMessage: 'El código solo puede contener letras y números' };
    }
    // Verificar si el código ya pertenece a otro estudiante
    const codeExists = codes.some(cod => cod == code);
    if (codeExists) {
      return { isValid: false, errorMessage: 'Este código ya está registrado para otro estudiante' };
    }
    // Si pasa todas las verificaciones, es válido
    return { isValid: true, errorMessage: '' };
  }

  const validateFaculty = (faculty: string): { isValid: boolean; errorMessage: string } => {
    // Verificar que la facultad exista
    const facultyExists = listaEspecialidades.some(item => item.nombreFacultad === faculty);
    if (!facultyExists) {
      return { isValid: false, errorMessage: 'La facultad no existe en el sistema' };
    }
    return { isValid: true, errorMessage: '' };
  }

  const validateCell = (field: string, value: any): { isValid: boolean; errorMessage: string } => {
    ////console.log('rowData: ', especialidadData)
    switch (field) {
      case 'persona.phone':
        return validatePhone(value);
      case 'estudiante.specialtyName':
        return validateSpecialty(value);
      case 'persona.name':
      case 'persona.lastName':
      case 'persona.secondLastName':
      case 'pucpCode':
        return validateCode(value);
      case 'estudiante.facultyName':
        return validateFaculty(value);
      default:
        return { isValid: true, errorMessage: '' };
    }
  };

  const handleConvert = () => {
    if (file) {
      ////console.log("lista solo especialidadData:", especialidadData);
      for (let i = 0; i < especialidadData.length; i++) {
        listaEspecialidades.push({ id: especialidadData[i].id, nombre: especialidadData[i].name, nombreFacultad: especialidadData[i].faculty.name });
      }
      //console.log("lista solo especialidadData:", listaEspecialidades);
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: ExcelDataUser[] = XLSX.utils.sheet_to_json(worksheet);
        if (jsonData.length == 0) {
          alert("El archivo Excel no tiene datos.");
          setLoading(false);
          return;
        }

        const expectedColumns = ['Correo', 'Facultad', 'Especialidad'];
        console.log("expectedColumns", expectedColumns);
        const actualColumns = Object.keys(jsonData[0]);
        console.log("actualColumns", actualColumns);

        const isValidFormat = expectedColumns.every(column => actualColumns.includes(column));

        if (!isValidFormat) {
          alert("El archivo Excel no tiene el formato de columnas esperado. Asegúrese de que las columnas Correo, Facultad y Especialidad estén presentes.");
          setLoading(false);
          return;
        }

        if (jsonData.length > 0) {
          setCleanActive(true);
        }

        let hasAnyError = false;
        const processedEmails = new Set();
        const users: User[] = jsonData
          .filter(item => {
            const isExistingStudent = existingStudents.some(student => student.institutionalEmail === item.Correo);
            const isFirstOccurrence = !processedEmails.has(item.Correo);
            if (isFirstOccurrence) {
              processedEmails.add(item.Correo);
            }
            return isExistingStudent && isFirstOccurrence;
          })
          .map(item => {
            const existingStudent = existingStudents.find(student => student.institutionalEmail === item.Correo)!;
            const specialty = especialidadData.find(spec => spec.name === item.Especialidad && spec.faculty.name === item.Facultad);
            if (specialty === undefined && existingStudent.estudiante) {
              // Para que en el datagrid muestre esa especialidad que ingresó mal el usuario
              existingStudent.estudiante.specialtyName = item.Especialidad;
              existingStudent.estudiante.facultyName = item.Facultad;
            }
            console.log("especialidadData", especialidadData)
            console.log("item.Facultad", item.Facultad)

            if (!validateSpecialty(item.Especialidad).isValid || !validateFaculty(item.Facultad).isValid) {
              hasAnyError = true;
              console.log(validateSpecialty(item.Especialidad).errorMessage, validateFaculty(item.Facultad).errorMessage);
            }

            return {
              ...existingStudent,
              persona: {
                ...existingStudent.persona,
                name: item.Nombres || existingStudent.persona.name,
                lastName: item.PrimerApellido || existingStudent.persona.lastName,
                secondLastName: item.SegundoApellido || existingStudent.persona.secondLastName,
                phone: item.Telefono || existingStudent.persona.phone,
              },
              estudiante: specialty ? {
                ...existingStudent.estudiante,
                specialityId: specialty.id,
                specialtyName: item.Especialidad,
                specialtyAcronym: specialty.acronym,
                facultyId: specialty.faculty.facultyId,
                facultyName: item.Facultad,
                facultyAcronym: specialty.faculty.acronym,
                isRisk: existingStudent.estudiante?.isRisk || false,
              } : existingStudent.estudiante,
            };
          });

        setRowData(users);
        setHasErrors(hasAnyError);
        setLoading(false);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setRowData([]);
    setHasErrors(true);
    setCleanActive(false);
  };

  const handleClickLimpiarGridView = () => {
    setRowData([]);
    setHasErrors(true);
  };

  const handleClickGuardarUsuarios = () => {
    console.log("para guardar, de student solo toma el id de especilidad", rowData);
    if (!hasErrors) {
      setIsOpen(true);
    }
  };

  const handleOnConfirmActualizarUsuarios = async () => {
    rowData.forEach(user => {
      user.pucpCode = String(user.pucpCode);
      user.persona.phone = String(user.persona.phone);
    });

    //console.log("User save masi", rowData[0]);

    let updates = 0;

    try {
      const updatePromises = rowData.map(user =>
        postStudent(user).then(response => {
          if (response) updates++;
          return response;
        })
      );

      await Promise.all(updatePromises);
      if (updates > 0) {
        setIsOpenModalSuccess(true);
      } else {
        setIsOpenModalError(true);
      }
    } catch (error) {
      console.error("Error al actualizar usuarios:", error);
      setIsOpenModalError(true);
    }
  };

  const defaultColDef = useMemo(() => ({
    suppressHeaderMenuButton: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
      padding: '0',
      flexDirection: 'column',
    },
    autoHeight: true, // Permitir que las celdas se expandan verticalmente
    floatingFilter: true,
  }), []);

  const columnDefs: ColDef[] = useMemo(() => [
    {
      headerName: 'Correo',
      field: 'institutionalEmail',
      filter: 'agTextColumnFilter',
      minWidth: 250,
    },
    {
      headerName: 'Nueva Facultad', field: 'estudiante.facultyName', filter: 'agTextColumnFilter', minWidth: 150, cellClassRules: {
        'cell-error': (params: CellClassParams) => !validateCell('estudiante.facultyName', params.value).isValid
      }
    },
    {
      headerName: 'Nueva Especialidad', field: 'estudiante.specialtyName', filter: 'agTextColumnFilter', minWidth: 150, cellClassRules: {
        'cell-error': (params: CellClassParams) => !validateCell('estudiante.specialtyName', params.value).isValid
      }
    },
    {
      headerName: 'Código', field: 'pucpCode', filter: 'agTextColumnFilter', minWidth: 100,
    },
    {
      headerName: 'Alumno',
      field: 'persona',
      filter: 'agTextColumnFilter',
      minWidth: 250,
      valueGetter: (params) => {
        const { name, lastName, secondLastName } = params.data.persona;
        return [name, lastName, secondLastName].filter(Boolean).join(' ');
      },
      filterValueGetter: (params) => {
        const { name, lastName, secondLastName } = params.data.persona;
        return [name, lastName, secondLastName].filter(Boolean).join(' ');
      }
    }
  ], []);

  const handleCellMouseOver = (event: CellMouseOverEvent) => {
    const cellValue = event.value; // Obtener el valor de la celda
    const validacion = validateCell(event.column.getColId(), cellValue); // Validar

    // Verificar si la columna es 'persona.phone', 'estudiante.specialtyName' o 'pucpCode'
    if (
      //event.column.getColId() === 'persona.phone' ||
      event.column.getColId() === 'estudiante.specialtyName' ||
      //event.column.getColId() === 'pucpCode' ||
      event.column.getColId() === 'estudiante.facultyName'
    ) {
      if (!validacion.isValid) {
        setTooltipContent(validacion.errorMessage); // Contenido del tooltip
        setShowTooltip(true); // Mostrar el tooltip
      } else {
        setShowTooltip(false); // Ocultar el tooltip si es válido
      }
    } else {
      setShowTooltip(false); // Ocultar el tooltip para otras columnas
    }
  };

  return (
    <div className='flex w-full h-full flex-col space-y-10'>
      <div className='flex w-full h-[25%]'>
        <div className='flex w-full h-full flex-col py-0 gap-4'>
          <div className='flex flex-row justify-between'>
            <div>
              <Button onClick={handleClickDescargarFormato} text="Descargar Formato" variant='primario' icon={ArrowDown} />
            </div>
            {showTooltip && (
              <div title={tooltipContent}>{tooltipContent}</div>
            )}
          </div>
          <div className='grid grid-cols-2 items-end w-full h-full gap-4'>
            <div className='col-span-1'>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                className='shadow-custom font-roboto text-sm font-medium rounded-xl w-full my-2'
              />
            </div>
            <div className='flex space-x-4 justify-start'>
              <Button onClick={handleConvert} text="Cargar" variant='primario' icon={FiFileText} iconSize={24} className={"my-2"} disabled={!file} />
              <Button onClick={handleClearFile} variant='warning' icon={FaRegTrashCan} iconSize={24} className={"my-2"} />
            </div>
          </div>
          <div className='grid grid-cols-2 items-end gap-4'>
            <h2 className='font-montserrat text-2xl font-bold text-primary px-2'>Vista Previa</h2>
            <div className='flex w-full h-12 justify-end space-x-4'>
              <Button onClick={handleClickLimpiarGridView} text="Limpiar" variant='primario' icon={TrashIcon} disabled={!cleanActive} />
              <Button onClick={handleClickGuardarUsuarios} text="Guardar" icon={SaveIcon} disabled={hasErrors} />
            </div>
          </div>
          <ModalConfirmation
            isOpen={isOpen}
            message={`¿Está seguro de actualizar los ${rowData.length} estudiantes?`}
            onClose={() => setIsOpen(false)}
            onConfirm={() => {
              handleOnConfirmActualizarUsuarios();
              setIsOpen(false);
            }}
            isAcceptAction={true}
          />
          <ModalSuccess
            isOpen={isOpenModalSuccess}
            message={"Se actualizaron los estudiantes satisfactoriamente"}
            onClose={() => {
              setIsOpenModalSuccess(false);
              navigate('/estudiantes');
            }}
          />
          <ModalError
            isOpen={isOpenModalError}
            message='Ocurrió un error al intentar actualizar algún estudiante. Intente nuevamente.'
            onClose={() => setIsOpenModalError(false)}
          />
        </div>
      </div>
      <div className="text-base text-primary font-medium w-1/2 flex flex-col items-start justify-center">
        <label>
          • Solo se muestran estudiantes cuyos correos ya estén registrados.
        </label>
        <label>
          • Si los correos se repiten, solo se subirá el primero.
        </label>
      </div>
      <div className='flex w-full h-full ag-theme-alpine items-center justify-center' style={{ marginTop: "20px" }}>
        {loading ? <Spinner size='lg' /> : <div className='w-full h-full'>
          <AgGridReact
            ref={gridRef}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={rowData}
            pagination={true}
            paginationAutoPageSize
            suppressMovableColumns
            onCellMouseOver={(event) => {
              handleCellMouseOver(event);
            }}
          />
        </div>}
      </div>
    </div>
  );
}