import axios from 'axios';

export interface DepreciationSetupData {
  initial_value?: number;
  residual_value?: number;
  depreciation_method?: string;
  useful_life_years?: number;
  depreciation_start_date?: string;
}

export interface DepreciationUpdateData {
  residual_value?: number;
  depreciation_method?: string;
  useful_life_years?: number;
  depreciation_start_date?: string;
}

export interface ValuationData {
  valuation_date?: string;
  valuation_amount: number;
  valuation_method: string;
  valuation_type: string;
  appraiser_name?: string;
  notes?: string;
}

export interface DepreciationSummaryFilters {
  category_id?: number;
  status?: string;
  is_fully_depreciated?: boolean;
}

export interface ReplacementNeedsFilters {
  category_id?: number;
  limit?: number;
}

class DepreciationTrackingService {
  /**
   * Setup depreciation for equipment
   */
  async setupDepreciation(equipmentId: number, data: DepreciationSetupData) {
    try {
      const response = await axios.post(`/api/equipment/${equipmentId}/depreciation/setup`, data);
      return response.data;
    } catch (error) {
      console.error('Error setting up depreciation:', error);
      throw error;
    }
  }

  /**
   * Update depreciation settings
   */
  async updateDepreciation(depreciationId: number, data: DepreciationUpdateData) {
    try {
      const response = await axios.put(`/api/depreciation/${depreciationId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating depreciation:', error);
      throw error;
    }
  }

  /**
   * Calculate current value of equipment
   */
  async calculateCurrentValue(equipmentId: number, asOfDate?: string) {
    try {
      const params = asOfDate ? { as_of_date: asOfDate } : {};
      const response = await axios.get(`/api/equipment/${equipmentId}/depreciation/value`, { params })
      return response.data;
    } catch (error) {
      console.error('Error calculating current value:', error);
      throw error;
    }
  }

  /**
   * Record a new valuation for equipment
   */
  async recordValuation(equipmentId: number, data: ValuationData) {
    try {
      const response = await axios.post(`/api/equipment/${equipmentId}/valuation`, data);
      return response.data;
    } catch (error) {
      console.error('Error recording valuation:', error);
      throw error;
    }
  }

  /**
   * Get depreciation report for equipment
   */
  async getDepreciationReport(equipmentId: number) {
    try {
      const response = await axios.get(`/api/equipment/${equipmentId}/depreciation/report`);
      return response.data;
    } catch (error) {
      console.error('Error getting depreciation report:', error);
      throw error;
    }
  }

  /**
   * Get fleet-wide depreciation summary
   */
  async getFleetDepreciationSummary(filters?: DepreciationSummaryFilters) {
    try {
      const response = await axios.get('/api/depreciation/summary', { params: filters })
      return response.data;
    } catch (error) {
      console.error('Error getting fleet depreciation summary:', error);
      throw error;
    }
  }

  /**
   * Get valuation history for equipment
   */
  async getValuationHistory(equipmentId: number) {
    try {
      const response = await axios.get(`/api/equipment/${equipmentId}/valuation/history`);
      return response.data;
    } catch (error) {
      console.error('Error getting valuation history:', error);
      throw error;
    }
  }

  /**
   * Get equipment needing replacement
   */
  async getEquipmentNeedingReplacement(filters?: ReplacementNeedsFilters) {
    try {
      const response = await axios.get('/api/depreciation/replacement-needs', { params: filters })
      return response.data;
    } catch (error) {
      console.error('Error getting equipment needing replacement:', error);
      throw error;
    }
  }

  /**
   * Get depreciation methods
   */
  async getDepreciationMethods() {
    return {
      straight_line: 'Straight Line',
      double_declining: 'Double Declining Balance',
      sum_of_years_digits: 'Sum of Years Digits',
      units_of_production: 'Units of Production',
    };
  }

  /**
   * Get valuation methods
   */
  async getValuationMethods() {
    return {
      market_comparison: 'Market Comparison Approach',
      cost_approach: 'Cost Approach',
      income_approach: 'Income Approach',
      age_life: 'Age-Life Method',
      expert_opinion: 'Expert Opinion',
    };
  }

  /**
   * Get valuation types
   */
  async getValuationTypes() {
    return {
      appraisal: 'Professional Appraisal',
      market_estimation: 'Market-based Estimation',
      internal_assessment: 'Internal Assessment',
    };
  }
}

export default new DepreciationTrackingService();
