import { Equipment } from './EquipmentTypes';

export interface EquipmentDepreciation {
  id: number;
  equipment_id: number;
  initial_value: number;
  residual_value: number;
  current_value: number;
  depreciation_method: string;
  useful_life_years: number;
  depreciation_start_date: string;
  last_depreciation_date: string | null;
  fully_depreciated_date: string | null;
  annual_depreciation_rate: number;
  annual_depreciation_amount: number;
  depreciation_schedule: DepreciationScheduleItem[];
  depreciation_factors: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  created_by: number | null;
  updated_by: number | null;
}

export interface DepreciationScheduleItem {
  year: number;
  start_date: string;
  end_date: string;
  starting_value: number;
  ending_value: number;
  depreciation_amount: number;
  accumulated_depreciation: number;
  book_value: number;
}

export interface EquipmentValuationRecord {
  id: number;
  equipment_id: number;
  valuation_date: string;
  valuation_amount: number;
  valuation_method: string;
  valuation_type: string;
  appraiser_name: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: number | null;
}

export interface DepreciationReport {
  equipment: Equipment;
  has_depreciation: boolean;
  depreciation?: EquipmentDepreciation;
  current_value?: number;
  error?: string;
  purchase_details?: {
    purchase_date: string;
    purchase_cost: number;
  };
  depreciation_details?: {
    method: string;
    useful_life_years: number;
    start_date: string;
    initial_value: number;
    residual_value: number;
    annual_depreciation_rate: number;
    annual_depreciation_amount: number;
  };
  current_status?: {
    current_value: number;
    depreciated_value: number;
    is_fully_depreciated: boolean;
    remaining_useful_life: number;
    last_update: string;
  };
  valuation?: {
    latest_valuation_date: string;
    latest_valuation_amount: number;
    valuation_method: string;
    book_to_market_ratio: number;
  } | null;
  replacement_planning?: {
    should_consider_replacement: boolean;
    replacement_cost_estimate: number;
    expected_replacement_date: string | null;
  };
  depreciation_schedule?: DepreciationScheduleItem[];
  valuation_history?: {
    id: number;
    date: string;
    amount: number;
    method: string;
    type: string;
    appraiser: string | null;
  }[];
}

export interface DepreciationSummary {
  financial_summary: {
    total_original_value: number;
    total_current_value: number;
    total_accumulated_depreciation: number;
    depreciation_rate: number;
    average_remaining_life: number;
  };
  equipment_counts: {
    total: number;
    with_depreciation: number;
    without_depreciation: number;
    fully_depreciated: number;
    needing_replacement: number;
  };
  category_summary: {
    category_id: number;
    category_name: string;
    count: number;
    original_value: number;
    current_value: number;
    depreciation: number;
  }[];
  replacement_needs: {
    id: number;
    name: string;
    current_value: number;
    replacement_cost: number;
    is_fully_depreciated: boolean;
    remaining_life: number;
  }[];
  recently_depreciated: {
    id: number;
    name: string;
    last_update: string;
    current_value: number;
  }[];
}

export interface CurrentValueResult {
  equipment: Equipment;
  has_depreciation: boolean;
  current_value: number;
  error?: string;
  as_of_date?: string;
  fully_depreciated?: boolean;
  depreciation_method?: string;
  annual_depreciation_amount?: number;
  remaining_useful_life?: number;
}

export interface ValuationHistory {
  equipment: {
    id: number;
    name: string;
  };
  valuations: {
    id: number;
    valuation_date: string;
    valuation_amount: number;
    valuation_method: string;
    valuation_type: string;
    appraiser_name: string | null;
    notes: string | null;
    created_at: string;
  }[];
}

export interface EquipmentNeedingReplacement {
  count: number;
  equipment: {
    id: number;
    name: string;
    category: string;
    current_value: number;
    replacement_cost: number;
    is_fully_depreciated: boolean;
    remaining_life: number;
    purchase_date: string;
    purchase_cost: number;
  }[];
}



