import axios from 'axios';
import { ToastService } from '@/components/shared/ToastManager';
import type {
    ManpowerFormData,
    EquipmentFormData,
    MaterialFormData,
    FuelFormData,
    ExpenseFormData
} from '@/types/projectResources';

type ResourceType = 'manpower' | 'equipment' | 'material' | 'fuel' | 'expense';
type ResourceData = ManpowerFormData | EquipmentFormData | MaterialFormData | FuelFormData | ExpenseFormData;

interface ResourceResponse {
    id: number;
    [key: string]: any;
}

class ResourceService {
    private static instance: ResourceService;
    private baseUrl: string;

    private constructor() {
        this.baseUrl = '/api/projects';
    }

    public static getInstance(): ResourceService {
        if (!ResourceService.instance) {
            ResourceService.instance = new ResourceService();
        }
        return ResourceService.instance;
    }

    private getResourceUrl(projectId: number, type: string, resourceId?: number): string {
        const base = `${this.baseUrl}/${projectId}/resources/${type}`;
        return resourceId ? `${base}/${resourceId}` : base;
    }

    // Manpower
    async createManpower(projectId: number, data: ManpowerFormData) {
        const url = this.getResourceUrl(projectId, 'manpower');
        return axios.post(url, data);
    }

    async updateManpower(projectId: number, resourceId: number, data: ManpowerFormData) {
        const url = this.getResourceUrl(projectId, 'manpower', resourceId);
        return axios.put(url, data);
    }

    async deleteManpower(projectId: number, resourceId: number) {
        const url = this.getResourceUrl(projectId, 'manpower', resourceId);
        return axios.delete(url);
    }

    // Equipment
    async createEquipment(projectId: number, data: EquipmentFormData) {
        const url = this.getResourceUrl(projectId, 'equipment');
        return axios.post(url, data);
    }

    async updateEquipment(projectId: number, resourceId: number, data: EquipmentFormData) {
        const url = this.getResourceUrl(projectId, 'equipment', resourceId);
        return axios.put(url, data);
    }

    async deleteEquipment(projectId: number, resourceId: number) {
        const url = this.getResourceUrl(projectId, 'equipment', resourceId);
        return axios.delete(url);
    }

    // Material
    async createMaterial(projectId: number, data: MaterialFormData) {
        const url = this.getResourceUrl(projectId, 'material');
        return axios.post(url, data);
    }

    async updateMaterial(projectId: number, resourceId: number, data: MaterialFormData) {
        const url = this.getResourceUrl(projectId, 'material', resourceId);
        return axios.put(url, data);
    }

    async deleteMaterial(projectId: number, resourceId: number) {
        const url = this.getResourceUrl(projectId, 'material', resourceId);
        return axios.delete(url);
    }

    // Fuel
    async createFuel(projectId: number, data: FuelFormData) {
        const url = this.getResourceUrl(projectId, 'fuel');
        return axios.post(url, data);
    }

    async updateFuel(projectId: number, resourceId: number, data: FuelFormData) {
        const url = this.getResourceUrl(projectId, 'fuel', resourceId);
        return axios.put(url, data);
    }

    async deleteFuel(projectId: number, resourceId: number) {
        const url = this.getResourceUrl(projectId, 'fuel', resourceId);
        return axios.delete(url);
    }

    // Expense
    async createExpense(projectId: number, data: ExpenseFormData) {
        const url = this.getResourceUrl(projectId, 'expense');
        return axios.post(url, data);
    }

    async updateExpense(projectId: number, resourceId: number, data: ExpenseFormData) {
        const url = this.getResourceUrl(projectId, 'expense', resourceId);
        return axios.put(url, data);
    }

    async deleteExpense(projectId: number, resourceId: number) {
        const url = this.getResourceUrl(projectId, 'expense', resourceId);
        return axios.delete(url);
    }
}

export const resourceService = ResourceService.getInstance();
