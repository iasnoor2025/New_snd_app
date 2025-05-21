import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
    ManpowerResource,
    EquipmentResource,
    MaterialResource,
    FuelResource,
    ExpenseResource
} from '@/types/projectResources';

interface ResourceState {
    // Resource data
    manpowers: ManpowerResource[];
    equipments: EquipmentResource[];
    materials: MaterialResource[];
    fuel: FuelResource[];
    expenses: ExpenseResource[];
    availableEquipment: EquipmentResource[];

    // Loading states
    isLoading: boolean;
    error: string | null;

    // Actions
    setManpowers: (manpowers: ManpowerResource[]) => void;
    setEquipments: (equipments: EquipmentResource[]) => void;
    setMaterials: (materials: MaterialResource[]) => void;
    setFuel: (fuel: FuelResource[]) => void;
    setExpenses: (expenses: ExpenseResource[]) => void;
    setAvailableEquipment: (equipment: EquipmentResource[]) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

const initialState = {
    manpowers: [],
    equipments: [],
    materials: [],
    fuel: [],
    expenses: [],
    availableEquipment: [],
    isLoading: false,
    error: null,
};

export const useResourceStore = create<ResourceState>()(
    devtools(
        (set) => ({
            ...initialState,

            setManpowers: (manpowers) => set({ manpowers }),
            setEquipments: (equipments) => set({ equipments }),
            setMaterials: (materials) => set({ materials }),
            setFuel: (fuel) => set({ fuel }),
            setExpenses: (expenses) => set({ expenses }),
            setAvailableEquipment: (availableEquipment) => set({ availableEquipment }),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            reset: () => set(initialState),
        }),
        {
            name: 'resource-store',
        }
    )
);



