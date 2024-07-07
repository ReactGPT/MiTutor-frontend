import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { Student } from "../../../../store/types/Student";
import { SearchInput } from "../../../../components";
import { useStudent } from "../../../../store/hooks";
import { BiCheckbox, BiSolidCheckSquare } from "react-icons/bi";
import { Button } from "../../../../components";
import { SaveIcon, CloseIcon } from "../../../../assets";

type Props = {
  setStudentDataModified: (
    state: (studentData: Student[]) => Student[]
  ) => void;
  setPopout: (state: boolean) => void;
  idEspecialidad: number;
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

const PageCargarAlumno = ({ setStudentDataModified, setPopout, idEspecialidad }: Props) => {
  const { studentData, fetchStudentSpecialtyData } = useStudent();
  const [studentDataSelected, setStudentDataSelected] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudentSpecialtyData(idEspecialidad);
  }, []);
  console.log("cargando",studentData)
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSave = () => {
    setStudentDataModified((studentData) => {
      return [...studentData, ...studentDataSelected.filter((item) => !studentData.find((student) => student.studentId === item.studentId))];
    });
    setPopout(false);
  }

  const handleOnAddSelectUser = (student: Student) => {
    if (
      studentDataSelected.find((item) => item.studentId === student.studentId)
    ) {
      setStudentDataSelected(
        studentDataSelected.filter(
          (item) => item.studentId !== student.studentId
        )
      );
    } else {
      setStudentDataSelected([...studentDataSelected, student]);
    }
  };

  const columnStudent: ColDef[] = [
    {
      headerName: "Nombre",
      valueGetter: (p) => p.data.name + " " + p.data.lastName,
      minWidth: 3,
    },
    { headerName: "Código", field: "pucpCode", minWidth: 150, maxWidth: 180 },
    { headerName: "Facultad", field: "facultyName", minWidth: 180, maxWidth: 250 },
    {
      headerName: "Seleccionar",
      field: "",
      maxWidth: 120,
      minWidth: 120,
      cellRenderer: (rowData: any) => {
        return (
          <button
            className="text-primary"
            onClick={() => {
              handleOnAddSelectUser(rowData.data);
            }}
          >
            {studentDataSelected.find(
              (item) => item.studentId === rowData.data.studentId
            ) ? (
              <BiSolidCheckSquare size={22} />
            ) : (
              <BiCheckbox size={22} />
            )}
          </button>
        );
      },
    },
  ];

  return (
    <div className="w-full h-full">
      <SearchInput
        onSearch={handleSearch}
        handleOnChangeFilters={() => {}}
        placeholder={`Nombre o código del usuario...`}
        selectDisabled={true}
      />
      <div className="flex w-full h-full ag-theme-alpine items-center justify-center mt-4" style={{ height: '300px' }}>
        <div className="w-full h-full">
          <AgGridReact
            defaultColDef={defaultColDef}
            columnDefs={columnStudent}
            rowData={studentData.filter(
              (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.pucpCode
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
            )}
          />
        </div>
      </div>
      <div className="flex flex-row h-[80px] w-full items-center justify-center gap-[100px]">
        <Button onClick={() => { handleSave(); }} disabled={studentDataSelected.length === 0} text="Guardar" icon={SaveIcon} />
        <Button onClick={() => { setPopout(false) }} text="Cancelar" icon={CloseIcon} variant="primario" iconSize={4} />
      </div>
    </div>
  );
};

export default PageCargarAlumno;
