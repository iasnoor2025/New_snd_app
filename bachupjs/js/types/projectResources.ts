// Resource Types
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type ResourceType = 'manpower' | 'equipment' | 'material' | 'fuel' | 'expense';

// Base Resource Interface
export interface ProjectResource {
    id: number;
    project_id: number;
    name?: string;
    description?: string;
    notes?: string;
    daily_rate?: number;
    hourly_rate?: number;
    unit_price?: number;
    amount?: number;
    quantity?: number;
    unit?: string;
    date?: string;
    start_date?: string;
    end_date?: string;
    total_days?: number;
    maintenance_cost?: number;
    category?: string;
    created_at: string;
    updated_at: string;
}

// Specific Resource Types
export interface ManpowerResource extends ProjectResource {
    employee_id?: number;
    worker_name?: string;
    job_title?: string;
}

export interface EquipmentResource extends ProjectResource {
    equipment_id?: number;
    equipment_name?: string;
}

export interface MaterialResource extends ProjectResource {
    material_id?: number;
}

export interface FuelResource extends ProjectResource {
    equipment_id?: number;
    equipment_name?: string;
    fuel_type?: string;
}

export interface ExpenseResource extends ProjectResource {
    category: string;
}

// Page Props Interface
export interface ResourcesPageProps {
    project: {
        id: number;
        name: string;
        budget?: number;
    };
    manpower: ManpowerResource[] | null;
    equipment: EquipmentResource[] | null;
    materials: MaterialResource[] | null;
    fuel: FuelResource[] | null;
    expenses: ExpenseResource[] | null;
    assignableUsers: Array<{ id: number; name: string }>
}

// Filter Types
export interface ResourceFilters {
    search?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// Form Data Types
export type ManpowerFormData = Omit<ManpowerResource, 'id' | 'project_id' | 'created_at' | 'updated_at'>
export type EquipmentFormData = Omit<EquipmentResource, 'id' | 'project_id' | 'created_at' | 'updated_at'>
export type MaterialFormData = Omit<MaterialResource, 'id' | 'project_id' | 'created_at' | 'updated_at'>
export type FuelFormData = Omit<FuelResource, 'id' | 'project_id' | 'created_at' | 'updated_at'>
export type ExpenseFormData = Omit<ExpenseResource, 'id' | 'project_id' | 'created_at' | 'updated_at'>
