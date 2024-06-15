import { describe, it, expect, beforeEach, afterEach, suite, test } from 'vitest';
import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getActionPlans, getActionPlansStudent, getActionPlanById, updateActionPlan, deleteActionPlan } from '../../services/actionPlan';
import { Services as ServicesProperties } from '../../../config';
import { ActionPlan, ActionPlanUpdate } from '../../types/ActionPlan';

const mock = new MockAdapter(axios);

const mockActionPlan: ActionPlan = {
  actionPlanId: 1,
  name: 'Test Action Plan',
  description: 'Description of test action plan',
  isActive: true,
  studentProgramId: 1,
  TutorId: 1,
  creationDate: new Date(),
  modificationDate: new Date(),
};

const mockActionPlanUpdate: ActionPlanUpdate = {
  actionPlanId: 1,
  name: 'Updated Action Plan Name',
  description: 'Updated description',
  isActive: true,
  studentProgramId: 1,
  tutorId: 1,
  creationDate: new Date().toISOString(),
  modificationDate: new Date().toISOString(),
};

suite('ActionPlan Service Tests', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('deberia trae todo los planes de accion', async () => {
    const expectedData: ActionPlan[] = [mockActionPlan];

    mock.onGet(`${ServicesProperties.BaseUrl}/listarActionPlans`).reply(200, { data: expectedData });

    const actionPlans = await getActionPlans(1, 1, 1);
    const expectedDataISO = expectedData.map(item => ({
      ...item,
      creationDate: item.creationDate.toISOString(),
      modificationDate: item.modificationDate.toISOString(),
    }));
    expect(actionPlans).toEqual(expectedDataISO);
  });

  test('debe traer todos los planes de accion para un alumno', async () => {
    const expectedData: ActionPlan[] = [mockActionPlan];

    mock.onGet(`${ServicesProperties.BaseUrl}/listarActionPlansStudent`).reply(200, { data: expectedData });

    const actionPlans = await getActionPlansStudent(1, 1, 1);
    const expectedDataISO = expectedData.map(item => ({
      ...item,
      creationDate: item.creationDate.toISOString(),
      modificationDate: item.modificationDate.toISOString(),
    }));
    expect(actionPlans).toEqual(expectedDataISO);
  });


  test('debe traer el plan de accion por su id', async () => {
    const actionPlanId = 1;
    const expectedData: ActionPlan[] = [mockActionPlan];

    mock.onGet(`${ServicesProperties.BaseUrl}/listarActionPlansPorId`).reply(200, { data: expectedData });

    const actionPlan = await getActionPlanById(actionPlanId);
    const expectedDataISO = expectedData.map(item => ({
      ...item,
      creationDate: item.creationDate.toISOString(),
      modificationDate: item.modificationDate.toISOString(),
    }));
    expect(actionPlan).toEqual(expectedDataISO);
  });

  test('debe actualizar el plan de accion', async () => {
    mock.onPut(`${ServicesProperties.BaseUrl}/actualizarActionPlan`).reply(200);

    await updateActionPlan(mockActionPlanUpdate);

    expect(mock.history.put.length).toBe(1);
  });

});