import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getActionPlans, getActionPlansStudent, getActionPlanById, updateActionPlan, deleteActionPlan } from '../../services/actionPlan';
import { Services as ServicesProperties } from '../../../config';
import { ActionPlan, ActionPlanUpdate } from '../../types/ActionPlan';

const mock = new MockAdapter(axios);

// Mock base URL for testing
ServicesProperties.BaseUrl = 'https://localhost:44369';

// Mock data
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

const mockActionPlanId = 1;

describe('ActionPlan Service Tests', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch action plans', async () => {
    // Convert dates to ISO strings
    const expectedData: ActionPlan[] = [{
      ...mockActionPlan,
      creationDate: mockActionPlan.creationDate.toISOString(),
      modificationDate: mockActionPlan.modificationDate.toISOString(),
    }];

    mock.onGet(`${ServicesProperties.BaseUrl}/listarActionPlans`).reply(200, { data: expectedData });

    const actionPlans = await getActionPlans(1, 1, 1);
    expect(actionPlans).toEqual(expectedData);
  });

  it('should fetch action plans for a student', async () => {
    const expectedData: ActionPlan[] = [{
      ...mockActionPlan,
      creationDate: mockActionPlan.creationDate.toISOString(),
      modificationDate: mockActionPlan.modificationDate.toISOString(),
    }];

    mock.onGet(`${ServicesProperties.BaseUrl}/listarActionPlansStudent`).reply(200, { data: expectedData });

    const actionPlans = await getActionPlansStudent(1, 1, 1);
    expect(actionPlans).toEqual(expectedData);
  });

  it('should fetch action plan by id', async () => {
    const actionPlanId = 1;
    const expectedData: ActionPlan[] = [{
      ...mockActionPlan,
      creationDate: mockActionPlan.creationDate.toISOString(),
      modificationDate: mockActionPlan.modificationDate.toISOString(),
    }];
    mock.onGet(`${ServicesProperties.BaseUrl}/listarActionPlansPorId`).reply(200, { data: expectedData });

    const actionPlan = await getActionPlanById(actionPlanId);
    expect(actionPlan).toEqual(expectedData);
  });

  it('should update an action plan', async () => {
    mock.onPut(`${ServicesProperties.BaseUrl}/actualizarActionPlan`).reply(200);

    await updateActionPlan(mockActionPlanUpdate);

    // Assert that the request was successful
    expect(mock.history.put.length).toBe(1);

    // AxiosMockAdapter doesn't provide the response status directly on the request object,
    // instead, we assume the request was successful if no error was thrown.
  });

  it('should delete an action plan', async () => {
    mock.onPut(`${ServicesProperties.BaseUrl}/eliminarActionPlan?actionPlanId=${mockActionPlanId}`).reply(200);

    await deleteActionPlan(mockActionPlanId);

    // Assert that the request was successful
    expect(mock.history.put.length).toBe(1);

    // Similar to updateActionPlan, AxiosMockAdapter doesn't provide the response status directly.
  });
});