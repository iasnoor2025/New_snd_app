import { useState, useCallback } from 'react';
import { useGlobalState } from '../providers/GlobalStateProvider';

// Type for the operation function
type AsyncOperation<T> = (...args: any[]) => Promise<T>

// Hook for managing loading states with global state integration
export function useLoadingState<T>(key: string) {
  const { state, dispatch } = useGlobalState();
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  // Get global loading state for this key
  const isLoading = state.loading[key] || localLoading;

  // Set loading state
  const setLoading = useCallback((isLoading: boolean) => {
    dispatch({
      type: 'SET_LOADING',
      payload: { key, isLoading },
    })
    setLocalLoading(isLoading);
  }, [dispatch, key]);

  // Set error state
  const setError = useCallback((error: string | null) => {
    dispatch({
      type: 'SET_ERROR',
      payload: { key, error },
    })
  }, [dispatch, key]);

  // Wrapper function to handle async operations with loading state
  const withLoading = useCallback(
    async <R>(operation: AsyncOperation<R>, ...args: any[]): Promise<R> => {
      setLoading(true);
      try {
        const result = await operation(...args);
        setError(null);
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  // Get error state for this key
  const error = state.errors[key] || null;

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
    withLoading,
  };
}

export default useLoadingState;

