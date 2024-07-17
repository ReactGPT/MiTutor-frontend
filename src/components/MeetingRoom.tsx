import React, { useEffect, useState } from 'react';
import { useAuth } from '../context';
import IconCamara from '../assets/svg/IconCamara';
import { MdOutlineEdit, MdOutlineVideoCameraFront } from 'react-icons/md';
import { IoMdSave } from "react-icons/io";
import Button from './Button';
import { getTutorId } from '../store/hooks/RolesIdTutor';
import useMeetingRoom from '../store/hooks/useUpdateMeetingRoom';
import Spinner from './Spinner';

const esUrlValida = (url: string) => {
  // Expresión regular para validar una URL
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  // Devuelve true si la URL coincide con la expresión regular
  return urlRegex.test(url);
};

const MeetingRoom: React.FC = () => {
  const { userData } = useAuth();
  const idTutor = getTutorId(userData);
  const { meetingRoom, loading, updateMeetingRoom } = useMeetingRoom(idTutor);
  const [isOpen, setIsOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editedMeetingRoom, setEditedMeetingRoom] = useState('');

  useEffect(() => {
    if (meetingRoom) {
      setEditedMeetingRoom(meetingRoom);
    }
    if (isOpen) {
      setEditable(false);
    }
  }, [meetingRoom, isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      await updateMeetingRoom(editedMeetingRoom);
      setEditable(false);
    } catch (error) {
      console.error('Error al actualizar MeetingRoom:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMeetingRoom(e.target.value);
  };

  const handleRedirect = () => {
    closeModal();
    if (editedMeetingRoom && esUrlValida(editedMeetingRoom)) {
      window.open(editedMeetingRoom, '_blank');
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-white text-primary hover:bg-gray-500 rounded-full p-2.5 size-13">
        <IconCamara size={6} />
      </button>
      {isOpen && (
        <div className="gap-3 flex flex-col absolute w-[450px] h-fit mt-4 right-0 bg-[rgba(253,250,250,1.0)] rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 p-5">
          <h1 className="text-xl font-bold justify-center flex">
            Enlace de sala de reuniones
          </h1>
          {loading
            ?
            <div className='flex items-center justify-center'>
              <Spinner color="primary" size='xxxxxxl' />
            </div>
            :
            <>
              <div className='grid-cols-1 grid gap-4 max-w-[700px]'>
                <div className='flex justify-between align-center gap-5'>
                  <input
                    className={`grow border text-sm border-secondary rounded-xl shadow-md shadow-terciary text-primary py-1 px-5 ${editable ? 'bg-white' : 'bg-secondary'}`}
                    type="text"
                    placeholder='Enlace'
                    value={editedMeetingRoom}
                    disabled={!editable}
                    onChange={handleInputChange}
                  />
                  <>
                    {
                      editable
                        ?
                        <button
                          className={`rounded-lg bg-white hover:bg-secondary shadow-custom p-2`}
                          onClick={handleSave}
                          disabled={loading}
                        >
                          <IoMdSave />
                        </button>
                        :
                        <button
                          className={`rounded-lg bg-white hover:bg-secondary shadow-custom p-2`}
                          onClick={handleEdit}
                          disabled={loading}
                        >
                          <MdOutlineEdit />
                        </button>
                    }

                  </>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Button onClick={handleRedirect}
                  icon={MdOutlineVideoCameraFront}
                  iconSize={24}
                  text='Unirse a la reunión'
                  disabled={loading}
                />
              </div>
            </>
          }
        </div>
      )}
    </div >
  );

};

export default MeetingRoom;