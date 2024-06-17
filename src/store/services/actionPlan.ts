import axios from 'axios';
import { Services as ServicesProperties } from '../../config';
import { ActionPlan, ActionPlanUpdate } from '../types/ActionPlan';


async function getActionPlans(studentId: number, programId: number, tutorId: number): Promise<ActionPlan[]> {
    try {
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarActionPlans`, {
            params: {
                studentId: studentId,
                programId: programId,
                TutorId: tutorId
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching action plans:', error);
        throw new Error('Error en getActionPlans');
    }
}

async function getActionPlansStudent(studentId: number, programId: number, tutorId: number): Promise<ActionPlan[]> {
    try {
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarActionPlansStudent`, {
            params: {
                studentId: studentId,
                programId: programId,
                TutorId: tutorId
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching action plans student:', error);
        throw new Error('Error en getActionPlansStudent');
    }
}

async function getActionPlanById(actionPlanId: number): Promise<ActionPlan[]> {
    try {
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarActionPlansPorId`, {
            params: { ActionPlanId: actionPlanId }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching action plan by id:', error);
        throw new Error('Error en getActionPlanById');
    }
}

async function updateActionPlan(actionPlan: ActionPlanUpdate) {
    try {
        const response = await axios.put(`${ServicesProperties.BaseUrl}/actualizarActionPlan`, actionPlan);
    } catch (error) {
        console.error('Error updating action plan:', error);
        throw new Error('Error en updateActionPlan');
    }
}

async function deleteActionPlan(actionPlanId: number) {
    try {
        console.log(actionPlanId)
        const response = await axios.put(ServicesProperties.BaseUrl + '/eliminarActionPlan?actionPlanId=' + actionPlanId);
        console.log(actionPlanId, response)
    } catch (error) {
        console.error('Error deleting action plan:', error);
        throw new Error('Error en deleteActionPlan');
    }

}



export { getActionPlans, getActionPlanById, getActionPlansStudent, updateActionPlan, deleteActionPlan};