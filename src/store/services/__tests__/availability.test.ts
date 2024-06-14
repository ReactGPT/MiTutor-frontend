import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Services as ServicesProperties } from '../../../config';
import { suite, test } from 'vitest';
import { eliminarDisponibilidad, getAvailabilityByTutorId, insertarDisponibilidad } from '../availability';

const mock = new MockAdapter(axios);

suite('Availability Service Tests', () => {
  test('should fetch availability by tutor ID', async () => {
    const tutorId = 123;
    const mockAvailabilityResponse = [
      {
        availabilityTutorId: 123,
        availabilityDate: '2024-06-01',
        startTime: '09:00',
        endTime: '12:00',
        isActive: true,
      },
      {
        availabilityTutorId: 123,
        availabilityDate: '2024-06-02',
        startTime: '10:00',
        endTime: '13:00',
        isActive: true,
      },
    ];

    mock.onGet(`${ServicesProperties.BaseUrl}/listarDisponibilidadPorTutor/${tutorId}`).reply(200, {
      data: mockAvailabilityResponse,
    });

    const availabilityList = await getAvailabilityByTutorId(tutorId);
    return { expect: availabilityList === mockAvailabilityResponse };
  });

  test('should insert availability', async () => {
    const mockAvailability = {
      availabilityTutorId: 123,
      availabilityDate: '2024-06-03',
      startTime: '13:00',
      endTime: '16:00',
      isActive: true,
    };

    mock.onPost(`${ServicesProperties.BaseUrl}/insertarDisponibilidad`).reply(200);

    await insertarDisponibilidad(mockAvailability);
    return { expect: mock.history.post.length === 1 };
  });

  test('should fail to insert availability due to missing data', async () => {
    const mockAvailability = {
      availabilityTutorId: 123,
      availabilityDate: '',
      startTime: '',
      endTime: '',
      isActive: true,
    };

    mock.onPost(`${ServicesProperties.BaseUrl}/insertarDisponibilidad`).reply(200);

    try {
      await insertarDisponibilidad(mockAvailability);
      return { expect: false };
    } catch (error) {
      return { expect: true };
    }
  });

  test('should delete availability by tutor ID', async () => {
    const tutorId = 123;

    mock.onDelete(`${ServicesProperties.BaseUrl}/eliminarDisponibilidad/${tutorId}`).reply(200);

    await eliminarDisponibilidad(tutorId);
    return { expect: mock.history.delete.length === 1 };
  });

  test('should fail to delete availability due to invalid tutor ID', async () => {
    const tutorId = -1;

    mock.onDelete(`${ServicesProperties.BaseUrl}/eliminarDisponibilidad/${tutorId}`).reply(200);

    try {
      await eliminarDisponibilidad(tutorId);
      return { expect: false };
    } catch (error) {
      return { expect: true };
    }
  });
});