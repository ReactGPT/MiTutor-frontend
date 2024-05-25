import { useState } from 'react';
import { deleteActionPlan, getActionPlanById, getActionPlans, getActionPlansStudent, updateActionPlan } from '../services/actionPlan';
import { ActionPlan, ActionPlanUpdate } from '../types/ActionPlan';

type ActionPlanHooksReturn = {
    actionPlans: ActionPlan[];
    loading: boolean;
    error: any;
    fetchActionPlans: () => Promise<void>;
};

function useActionPlans(studentId: number, programId: number, tutorId: number): ActionPlanHooksReturn {
    const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchActionPlans = async () => {
        try {
            const data = await getActionPlans(studentId, programId, tutorId);
            setActionPlans(data);
            setLoading(false);
        } catch (error) {
            setError("Error en useActionPlans");
            setLoading(false);
        }
    }

    return { actionPlans, loading, error, fetchActionPlans };
}

function useActionPlansStudent(studentId: number, programId: number, tutorId: number): ActionPlanHooksReturn {
    const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchActionPlans = async () => {
        try {
            const data = await getActionPlansStudent(studentId, programId, tutorId);
            setActionPlans(data);
            setLoading(false);
        } catch (error) {
            setError("Error en useActionPlansStudent");
            setLoading(false);
        }
    }

    return { actionPlans, loading, error, fetchActionPlans };
}


function useActionPlanById(actionPlanId: number): ActionPlanHooksReturn {
    const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchActionPlans = async () => {
        try {
            const data = await getActionPlanById(actionPlanId);
            console.log('soy el detalle del plan: ', data);
            setActionPlans(data);
            setLoading(false);

        } catch (error) {
            setError("Error en useActionPlanById");
            setLoading(false);
        }
    }

    return { actionPlans, loading, error, fetchActionPlans };
}

function useUpdateActionPlan(actionPlan: ActionPlanUpdate) {
    try {
        updateActionPlan(actionPlan);
        console.log('Plan de acción actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el plan de acción:', error);
    }
}

function useDeleteActionPlan(actionPlanId: number) {
    try {
        deleteActionPlan(actionPlanId);
        console.log('Plan de acción eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar el plan de acción:', error);
    }
}


export { useActionPlans, useActionPlansStudent, useActionPlanById,  useUpdateActionPlan, useDeleteActionPlan};