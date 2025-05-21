import { useForm } from '@inertiajs/react';
import { FinalSettlement } from '@/types';

interface UseFinalSettlementProps {
    employeeId: number;
    onSuccess?: () => void;
    onError?: (errors: any) => void;
}

export function useFinalSettlement({ employeeId, onSuccess, onError }: UseFinalSettlementProps) {
    const form = useForm({
        last_working_day: '',
        leave_encashment: 0,
        unpaid_salary: 0,
        unpaid_overtime: 0,
        deductions: 0,
        gratuity: 0,
        total_payable: 0,
        notes: '',
        agreement_terms: '',
        deductions_list: [] as Array<{
            type: string;
            description: string;
            amount: number;
            reference_number?: string;
            notes?: string;
        }>,
    })

    const create = () => {
        form.post(route('final-settlements.store', { employee: employeeId }), {
            onSuccess,
            onError,
        })
    };

    const approve = (settlementId: number) => {
        form.post(route('final-settlements.approve', settlementId), {
            onSuccess,
            onError,
        })
    };

    const reject = (settlementId: number) => {
        form.post(route('final-settlements.reject', settlementId), {
            onSuccess,
            onError,
        })
    };

    const complete = (settlementId: number) => {
        form.post(route('final-settlements.complete', settlementId), {
            onSuccess,
            onError,
        })
    };

    const addDeduction = () => {
        form.setData('deductions_list', [
            ...form.data.deductions_list,
            {
                type: '',
                description: '',
                amount: 0,
            },
        ]);
    };

    const removeDeduction = (index: number) => {
        form.setData(
            'deductions_list',
            form.data.deductions_list.filter((_, i) => i !== index)
        );
    };

    const updateDeduction = (index: number, field: string, value: string | number) => {
        const newDeductions = [...form.data.deductions_list];
        newDeductions[index] = {
            ...newDeductions[index],
            [field]: value,
        };
        form.setData('deductions_list', newDeductions);
    };

    return {
        form,
        create,
        approve,
        reject,
        complete,
        addDeduction,
        removeDeduction,
        updateDeduction,
    };
}
