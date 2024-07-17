import { useEffect, useState } from 'react';
import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

const useMeetingRoom = (tutorId: number) => {
  const [meetingRoom, setMeetingRoom] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMeetingRoom();
  }, [tutorId]);

  const fetchMeetingRoom = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${ServicesProperties.BaseUrl}/obtenerMeetingRoom?tutorId=${tutorId}`);
      setMeetingRoom(response.data.meetingRoom);
    } catch (error) {
      setError('Hubo un error al obtener el MeetingRoom');
    } finally {
      setLoading(false);
    }
  };

  const updateMeetingRoom = async (newMeetingRoom: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${ServicesProperties.BaseUrl}/actualizarMeetingRoom?tutorId=${tutorId}&MeetingRoom=${newMeetingRoom}`);
      setMeetingRoom(newMeetingRoom);
    } catch (error) {
      setError('Hubo un error al actualizar el MeetingRoom');
    } finally {
      setLoading(false);
    }
  };

  return { meetingRoom, loading, error, updateMeetingRoom };
};

export default useMeetingRoom;