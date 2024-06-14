import React, { useRef, useState } from 'react';
import { Button } from '../../../components';
import { FiFileText } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import * as XLSX from 'xlsx';
import { useDataGrid } from '../../../context/UsersDataGridContext';
import { SaveIcon, TrashIcon } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { User, ExcelDataUser } from '../../../store/types/User';


type InputProps = {
  rol: "estudiante" | "usuario";
}

export default function CargaMasivaSearchBar({ rol }: InputProps) {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [jsonData, setJsonData] = useState("");
  const [existFile, setExistFile] = useState(false);
  const { setRowData, setLoading } = useDataGrid();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);

      // Verificar si el archivo es de tipo Excel
      const isValidFileType = file?.type === "application/vnd.ms-excel" || file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isValidFileType) {
        alert("El archivo seleccionado no es un archivo de Excel válido.");
        return;
      }

      setExistFile(true);
    } else {
      setFile(null); // En caso de que no haya archivos seleccionados
      setExistFile(false);
    }
  };

  const handleConvert = () => {
    if (file) {
      setLoading(true); // Inicia la carga
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: ExcelDataUser[] = XLSX.utils.sheet_to_json(worksheet);
        //setJsonData(JSON.stringify(json, null, 2));



        const users: User[] = json.map((item, index) => ({
          id: index + 1, // Generar un ID temporal
          institutionalEmail: item.Correo,
          pucpCode: item.Codigo,
          isActive: item.EstadoCuenta === 1,
          creationDate: new Date(),
          modificationDate: new Date(),
          persona: {
            id: index + 1, // Generar un ID temporal
            name: item.Nombres,
            lastName: item.PrimerApellido,
            secondLastName: item.SegundoApellido,
            phone: item.Telefono,
            isActive: true,
          },
          roles: null,
          isVerified: true,
          estudiante: null,
        }));

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

  }

  return (
    <div className='flex w-full h-full flex-col py-0 gap-4'>
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
    </div>
  )
}

/*
<InputAdmin titulo=".xlsx *" name="fileName" text={""} placeholder='Selecciona el archivo' enable={false} />

<Button onClick={handleClickNuevoUsuario} text={"Seleccionar"} icon={GrCursor} iconSize={24} className={"my-2"} />
*/