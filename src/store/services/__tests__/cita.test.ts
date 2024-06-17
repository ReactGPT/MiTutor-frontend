import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { suite, test } from 'vitest';
import { Services as ServicesProperties } from '../../../config';
import { ListCita } from '../../types/ListCita';
import { addAppointment, cancelAppointment, getListaDeCitasByStudentId, getListaDeCitasByTutorId, getListaDeCitasByTutorIdByStudentId } from '../cita';

const mock = new MockAdapter(axios);

suite('Citas Service Tests', () => {
  test('deberia listar las citas por el id del tutor', async () => {
    const tutorId = 123;
    const mockAppointmentResponse: ListCita[] = [{
      appointmentId: 1,
      programId: 1,
      programName: 'Program Name',
      appointmentStatus: 'Scheduled',
      groupBased: false,
      creationDate: '2024-06-01T09:00:00Z',
      personId: 1,
      name: 'John',
      lastName: 'Doe',
      secondLastName: '',
      isInPerson: true,
      startTime: new Date('2024-06-01T10:00:00Z'),
      endTime: new Date('2024-06-01T11:00:00Z'),
      reason: 'Meeting',
      tutorId: 123,
      meetingRoom: 'Room 101',
      tutorName: 'Tutor',
      tutorLastName: 'Smith',
      tutorSecondLastName: '',
      tutorEmail: 'tutor@example.com',
      commentId: 1,
      message: 'Appointment confirmed',
    }];

    mock.onGet(`${ServicesProperties.BaseUrl}/listarCitasPorTutor/${tutorId}`).reply(200, {
      data: { listaDeCitas: mockAppointmentResponse },
    });

    try {
      const response = await getListaDeCitasByTutorId(tutorId);
      return { expect: response.listaDeCitas === mockAppointmentResponse };
    } catch (error: any) {
      return { expect: false, error: error.message };
    }
  });

  test('deberia listar las citas por tutor ID y student ID', async () => {
    const tutorId = 123;
    const studentId = 456;
    const mockAppointmentResponse: ListCita[] = [{
      appointmentId: 1,
      programId: 1,
      programName: 'Program Name',
      appointmentStatus: 'Scheduled',
      groupBased: false,
      creationDate: '2024-06-01T09:00:00Z',
      personId: 1,
      name: 'John',
      lastName: 'Doe',
      secondLastName: '',
      isInPerson: true,
      startTime: new Date('2024-06-01T10:00:00Z'),
      endTime: new Date('2024-06-01T11:00:00Z'),
      reason: 'Meeting',
      tutorId: 123,
      meetingRoom: 'Room 101',
      tutorName: 'Tutor',
      tutorLastName: 'Smith',
      tutorSecondLastName: '',
      tutorEmail: 'tutor@example.com',
      commentId: 1,
      message: 'Appointment confirmed',
    }];

    mock.onGet(`${ServicesProperties.BaseUrl}/listarCitasPorTutorPorAlumno/${tutorId}/${studentId}`).reply(200, {
      data: { listaDeCitas: mockAppointmentResponse },
    });

    try {
      const response = await getListaDeCitasByTutorIdByStudentId(tutorId, studentId);
      return { expect: response.listaDeCitas === mockAppointmentResponse };
    } catch (error: any) {
      return { expect: false, error: error.message };
    }
  });

  test('deberia listar las citas por student ID', async () => {
    const studentId = 456;
    const mockAppointmentResponse: ListCita[] = [{
      appointmentId: 1,
      programId: 1,
      programName: 'Program Name',
      appointmentStatus: 'Scheduled',
      groupBased: false,
      creationDate: '2024-06-01T09:00:00Z',
      personId: 1,
      name: 'John',
      lastName: 'Doe',
      secondLastName: '',
      isInPerson: true,
      startTime: new Date('2024-06-01T10:00:00Z'),
      endTime: new Date('2024-06-01T11:00:00Z'),
      reason: 'Meeting',
      tutorId: 123,
      meetingRoom: 'Room 101',
      tutorName: 'Tutor',
      tutorLastName: 'Smith',
      tutorSecondLastName: '',
      tutorEmail: 'tutor@example.com',
      commentId: 1,
      message: 'Appointment confirmed',
    }];

    mock.onGet(`${ServicesProperties.BaseUrl}/listarCitasPorAlumnoId/${studentId}`).reply(200, {
      data: { listaDeCitas: mockAppointmentResponse },
    });

    try {
      const response = await getListaDeCitasByStudentId(studentId);
      return { expect: response.listaDeCitas === mockAppointmentResponse };
    } catch (error: any) {
      return { expect: false, error: error.message };
    }
  });

  test('deberia agregar un cita exitosamente', async () => {
    const mockAppointmentData = {
      appointment: {
        startTime: '2024-06-01T10:00:00Z',
        endTime: '2024-06-01T11:00:00Z',
        creationDate: '2024-06-01T09:00:00Z',
        reason: 'Meeting',
        isInPerson: true,
        classroom: 'Room 101',
      },
      idProgramTutoring: 1,
      idTutor: 123,
      idStudent: [456],
    };

    mock.onPost(`${ServicesProperties.BaseUrl}/agregarCita`).reply(200);

    await addAppointment(mockAppointmentData);
    return { expect: mock.history.post.length === 1 };
  });

  test('deberia fallar al agregar un cita', async () => {
    const mockAppointmentData = {
      appointment: {
        startTime: '2024-06-01T10:00:00Z',
        endTime: '2024-06-01T11:00:00Z',
        creationDate: '2024-06-01T09:00:00Z',
        reason: 'Meeting',
        isInPerson: true,
        classroom: 'Room 101',
      },
      idProgramTutoring: 1,
      idTutor: 123,
      idStudent: [456],
    };

    mock.onPost(`${ServicesProperties.BaseUrl}/agregarCita`).reply(500);

    try {
      await addAppointment(mockAppointmentData);
      return { expect: false };
    } catch (error) {
      return { expect: true };
    }
  });

  test('deberia cancelar un cita', async () => {
    const appointmentId = 1;

    mock.onPut(`${ServicesProperties.BaseUrl}/cancelarCita/${appointmentId}`).reply(200, {
      success: true,
      message: 'Appointment canceled successfully',
    });

    const cancelResponse = await cancelAppointment(appointmentId);
    return { expect: cancelResponse.success === true };
  });

  test('deberia fallar al cancelar un cita pir id incorrecto', async () => {
    const appointmentId = -1;

    mock.onPut(`${ServicesProperties.BaseUrl}/cancelarCita/${appointmentId}`).reply(404); // Simular que la cita no se encuentra

    try {
      await cancelAppointment(appointmentId);
      return { expect: false };
    } catch (error) {
      return { expect: true };
    }
  });
});