import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types for our global state
export interface GlobalState {
  loading: {
    [key: string]: boolean;
  };
  errors: {
    [key: string]: string | null;
  };
  dashboardData: {
    lastUpdated: string | null;
    isRealTimeEnabled: boolean;
  };
}

// Initial state
const initialState: GlobalState = {
  loading: {},
  errors: {},
  dashboardData: {
    lastUpdated: null,
    isRealTimeEnabled: false,
  },
};

// Action types
type ActionType =
  | { type: 'SET_LOADING'; payload: { key: string; isLoading: boolean } }
  | { type: 'SET_ERROR'; payload: { key: string; error: string | null } }
  | { type: 'SET_DASHBOARD_LAST_UPDATED'; payload: string }
  | { type: 'TOGGLE_REAL_TIME_UPDATES'; payload: boolean }
  | { type: 'CLEAR_ERRORS' };

// Reducer function
const reducer = (state: GlobalState, action: ActionType): GlobalState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.isLoading,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: action.payload.error,
        },
      };
    case 'SET_DASHBOARD_LAST_UPDATED':
      return {
        ...state,
        dashboardData: {
          ...state.dashboardData,
          lastUpdated: action.payload,
        },
      };
    case 'TOGGLE_REAL_TIME_UPDATES':
      return {
        ...state,
        dashboardData: {
          ...state.dashboardData,
          isRealTimeEnabled: action.payload,
        },
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
};

// Create context
const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<ActionType>
}>({
  state: initialState,
  dispatch: () => null,
})

// Provider component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook for using the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
