import * as React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../components';
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import { AgGridReact } from 'ag-grid-react';
import { useUser } from '../../../store/hooks/useUser';
import { useEspecialidad } from '../../../store/hooks/useEspecialidad';
import * as XLSX from 'xlsx';
import { ExcelDataUser, User } from '../../../store/types/User';
import ArrowDown from '../../../assets/svg/ArrowDown';
import { CellMouseOverEvent, ColDef, CellClassParams } from 'ag-grid-community';
import { Spinner } from '../../../components';
import { FiFileText } from 'react-icons/fi';
import { FaRegTrashCan } from 'react-icons/fa6';
import { SaveIcon, TrashIcon } from '../../../assets';

interface Especialidad {
  id: number;
  nombre: string;
  nombreFacultad: string;
}

export default function PageCargaMasiva() {

  const { state } = useLocation();
  const { rol } = state ? state : "usuario";
  console.log(rol);
  // search bar
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [existFile, setExistFile] = useState(false);
  const { postUser, postStudent, fetchUsersSingleSet } = useUser();

  const { fetchEspecialidadData2, especialidadData } = useEspecialidad();
  const [existingUsers, setExistingUsers] = useState<User[]>([]);

  const [isOpenModalSucess, setIsOpenModalSucess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  //data
  const [rowData, setRowData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [listaEspecialidades, setListaEspecialidades] = useState<Especialidad[]>([]);
  const [codes, setCodes] = useState<string[]>([]);
  const [hasErrors, setHasErrors] = useState(true);
  const [cleanActive, setCleanActive] = useState(true);
  const gridRef = useRef<AgGridReact>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  //----------------------------------------------

  // Search bar
  useEffect(() => {
    const fetchData = async () => {
      await fetchEspecialidadData2();
      const users = await fetchUsersSingleSet();
      setExistingUsers(users);
      users.forEach((item) => {
        codes.push(item.pucpCode);
      });
    };
    fetchData();
    setCleanActive(false);
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
        ["Codigo", "Correo", "Nombres", "PrimerApellido", "SegundoApellido", "Telefono", "Facultad", "Especialidad"],
        ["20240001", "ejemplo@pucp.edu.pe", "Lorem", "Ipsum", "Ipsum", "999999999", "Facultad Ejemplo", "Especialidad Ejemplo"]
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
    console.log("selectedFile", selectedFile)

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
    console.log(file, existFile, selectedFile);
  };

  const validateSpecialty = (specialty: string, faculty: string): { isValid: boolean; errorMessage: string; } => {
    //console.log('rowData: ', especialidadData, specialty)
    const specialtyExists = listaEspecialidades.some(item => item.nombre === specialty);
    if (rol === "estudiante") {
      if (!specialtyExists) {
        return { isValid: false, errorMessage: 'La especialidad no existe en el sistema' };
      }
      //verificar que en esa facultad, exista la especialidad
      const specialtyFacultyExists = listaEspecialidades.some(item => item.nombre === specialty && item.nombreFacultad === faculty);
      if (!specialtyFacultyExists) {
        return { isValid: false, errorMessage: 'La especialidad no existe en la facultad seleccionada' };
      }
      return { isValid: true, errorMessage: '' };
    } else {
      return { isValid: true, errorMessage: '' };
    }
  };

  const validatePhone = (phone: string): { isValid: boolean; errorMessage: string; } => {
    // El teléfono puede estar vacío o contener hasta 15 dígitos
    if (phone === '' || phone === undefined) {
      return { isValid: true, errorMessage: '' };
    }

    const phoneRegex = /^\d{1,15}$/;
    if (!phoneRegex.test(phone)) {
      return { isValid: false, errorMessage: 'El teléfono solo debe contener números y tener máximo 15 dígitos' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateCode = (code: string): { isValid: boolean; errorMessage: string; } => {
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
      return { isValid: false, errorMessage: 'Este código ya está registrado para otro usuario' };
    }
    // Si pasa todas las verificaciones, es válido
    return { isValid: true, errorMessage: '' };
  };

  const validateEmail = (email: string): { isValid: boolean; errorMessage: string; } => {
    // Puede ser cualquier correo, pero debe ser válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, errorMessage: 'El correo no es válido' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateName = (name: string): { isValid: boolean; errorMessage: string; } => {
    if (!name || name.trim() === '') {
      return { isValid: false, errorMessage: 'El nombre no puede estar vacío' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateLastName = (lastName: string): { isValid: boolean; errorMessage: string; } => {
    if (!lastName || lastName.trim() === '') {
      return { isValid: false, errorMessage: 'El primer apellido no puede estar vacío' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateFaculty = (faculty: string): { isValid: boolean; errorMessage: string } => {
    // Verificar que la facultad exista
    const facultyExists = listaEspecialidades.some(item => item.nombreFacultad === faculty);
    if (rol === "estudiante") {
      if (!facultyExists) {
        return { isValid: false, errorMessage: 'La facultad no existe en el sistema' };
      }
    }
    return { isValid: true, errorMessage: '' };
  }

  const validateCell = (field: string, value: any, secondValue?: any): { isValid: boolean; errorMessage: string; } => {
    ////console.log('rowData: ', especialidadData)
    switch (field) {
      case 'persona.phone':
        return validatePhone(value);
      case 'estudiante.specialtyName':
        return validateSpecialty(value, secondValue);
      case 'persona.name':
        return validateName(value);
      case 'persona.lastName':
        return validateLastName(value);
      case 'persona.secondLastName':
      case 'pucpCode':
        return validateCode(value);
      case 'institutionalEmail':
        return validateEmail(value);
      case 'estudiante.facultyName':
        return validateFaculty(value);
      default:
        return { isValid: true, errorMessage: '' };
    }
  };

  //en el caso rol sea estudiante debe tener una columna que se llame "Especialidad"
  const handleConvert = () => {
    if (file) {

      console.log(file);

      for (let i = 0; i < especialidadData.length; i++) {
        listaEspecialidades.push({ id: especialidadData[i].id, nombre: especialidadData[i].name, nombreFacultad: especialidadData[i].faculty.name });
      }

      setLoading(true); // Inicia la carga
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

        // Definir las columnas esperadas
        let expectedColumns = ['Codigo', 'Correo', 'Nombres', 'PrimerApellido', 'SegundoApellido', 'Telefono'];
        if (rol === 'estudiante') {
          expectedColumns.push('Especialidad');
          expectedColumns.push('Facultad');
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
        if (jsonData.length > 0) {
          setCleanActive(true);
        }

        let hasAnyError = false;
        const processedEmails = new Set();

        // Procesar los datos si el formato es válido
        const users: User[] = jsonData
          .filter(item => {
            const isExistingUser = existingUsers.some(user => user.institutionalEmail === item.Correo);
            const isFirstOccurrence = !processedEmails.has(item.Correo);
            if (isFirstOccurrence) {
              processedEmails.add(item.Correo);
            }
            return !isExistingUser && isFirstOccurrence;
          })
          .map((item, index) => {
            let estudiante = null;
            if (rol === 'estudiante') {
              const specialty = especialidadData.find(spec => spec.name === item.Especialidad && spec.faculty.name === item.Facultad);
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
              } else {
                estudiante = {
                  isRisk: false, // Default value or fetch from data if available
                  specialityId: 0,
                  specialtyName: item.Especialidad,
                  specialtyAcronym: "",
                  facultyId: 0,
                  facultyName: item.Facultad,
                  facultyAcronym: "",
                }
              }
            }

            if (!validatePhone(item.Telefono).isValid || !validateSpecialty(item.Especialidad, item.Facultad).isValid || !validateCode(item.Codigo).isValid || !validateEmail(item.Correo).isValid || !validateName(item.Nombres).isValid || !validateLastName(item.PrimerApellido).isValid || !validateFaculty(item.Facultad).isValid) {
              console.log("error de validacion");
              hasAnyError = true;
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
              estudiante: rol === 'estudiante' ? estudiante : null,
            };
          });

        if (users.length === 0) {
          //DEPENDE DEL rol
          alert((rol === 'estudiante' ? 'Todos los estudiantes del archivo ya están registrados' : 'Todos los usuarios del archivo ya están registrados'));
        }

        setRowData(users);
        setHasErrors(hasAnyError);
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
    setRowData([]);
    setHasErrors(true);
    setCleanActive(false);
  };
  const handleClickLimpiarGridView = () => {
    setRowData([]);
    setHasErrors(true);
  };

  const handleClickGuardarUsuarios = () => {
    //las validaciones
    if (!hasErrors) {
      setIsOpen(true);
    }
  };

  const handleOnConfirmSaveUsuarios = () => {
    console.log("rowData: ", rowData);
    const promises = rowData.map(user => {
      user.pucpCode = String(user.pucpCode);
      user.persona.phone = String(user.persona.phone); // Convertir phone a string si es necesario
      console.log("User save 2: ", user);

      if (rol === 'estudiante') {
        return postStudent(user)
          .then(response => response)
          .catch(error => false); // Manejar error si la promesa falla
      } else {
        // Utilizar postUser y retornar la promesa
        return postUser(user)
          .then(response => response)
          .catch(error => false); // Manejar error si la promesa falla
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


  // Grid
  const defaultColDef = {
    suppressHeaderMenuButton: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    },
    //filter: 'agTextColumnFilter',
    floatingFilter: true,
  };

  const columnDefs: ColDef[] = [
    {
      headerName: 'Correo', field: 'institutionalEmail', filter: 'agTextColumnFilter', minWidth: 250, maxWidth: 250,
      cellClassRules: {
        'cell-error': (params: CellClassParams) => !validateCell('institutionalEmail', params.value).isValid
      }
    },
    {
      headerName: 'Código', field: 'pucpCode', filter: 'agNumberColumnFilter', minWidth: 150,
      cellClassRules: {
        'cell-error': (params: CellClassParams) => !validateCell('pucpCode', params.value).isValid
      }
    },
    {
      headerName: 'Nombres', field: 'persona.name', filter: 'agTextColumnFilter', minWidth: 150,
      cellClassRules: {
        'cell-error': (params: CellClassParams) => !validateCell('persona.name', params.value).isValid
      }
    },
    {
      headerName: 'Primer Apellido', field: 'persona.lastName', filter: 'agTextColumnFilter', minWidth: 150,
      cellClassRules: {
        'cell-error': (params: CellClassParams) => !validateCell('persona.lastName', params.value).isValid
      }
    },
    { headerName: 'Segundo Apellido', field: 'persona.secondLastName', filter: 'agTextColumnFilter', minWidth: 150 },
    {
      headerName: 'Teléfono', field: 'persona.phone', filter: 'agNumberColumnFilter', minWidth: 100, maxWidth: 200,
      cellClassRules: {
        'cell-error': (params: CellClassParams) => !validateCell('persona.phone', params.value).isValid
      }
    },
    // Si el rol es estudiante, agregar columna de Especialidad
    ...(rol === 'estudiante' ? [
      {
        headerName: 'Facultad',
        field: 'estudiante.facultyName',
        filter: 'agTextColumnFilter',
        minWidth: 150,
        cellClassRules: {
          'cell-error': (params: CellClassParams) => !validateCell('estudiante.facultyName', params.value).isValid
        }
      },
      {
        headerName: 'Especialidad',
        field: 'estudiante.specialtyName',
        filter: 'agTextColumnFilter',
        minWidth: 150,
        cellClassRules: {
          'cell-error': (params: CellClassParams) => {
            const facultyName = params.data.estudiante.facultyName;
            return !validateCell('estudiante.specialtyName', params.value, facultyName).isValid;
          }
          //'cell-error': (params: CellClassParams) => !validateCell('estudiante.specialtyName', params.value).isValid
        }
      }
    ] : [])
  ];

  const handleCellMouseOver = (event: CellMouseOverEvent) => {
    const cellValue = event.value; // Obtener el valor de la celda
    let validacion;

    if (event.column.getColId() === 'estudiante.specialtyName') {
      const facultyValue = event.data.estudiante.facultyName; // Obtener el valor de la facultad
      validacion = validateCell(event.column.getColId(), cellValue, facultyValue);
    } else {
      validacion = validateCell(event.column.getColId(), cellValue);
    }

    // Verificar si la columna es 'persona.phone', 'estudiante.specialtyName' o 'pucpCode'
    if (
      event.column.getColId() === 'persona.phone' ||
      event.column.getColId() === 'estudiante.specialtyName' ||
      event.column.getColId() === 'pucpCode' ||
      event.column.getColId() === 'institutionalEmail' ||
      event.column.getColId() === 'persona.name' ||
      event.column.getColId() === 'persona.lastName' ||
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
            <Button onClick={handleClickDescargarFormato} text="Descargar Formato" variant='primario' icon={ArrowDown} />
            {showTooltip && (
              <div title={tooltipContent}>{tooltipContent}</div>
            )}
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
      </div>
      <div className="text-base text-primary font-medium w-1/2 flex flex-col items-start justify-center">
        <label>
          • Solo se subirán usuarios cuyos correos no estén registrados.
        </label>
        <label>
          • Si los correos se repiten, solo se subirá el primero.
        </label>
      </div>
      <div className='flex w-full h-[80%] ag-theme-alpine items-center justify-center' style={{ marginTop: "20px" }}>
        {loading ? <Spinner size='lg' /> : <div className='w-full h-full'>
          <AgGridReact
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
