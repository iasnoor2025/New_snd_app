import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ResourceState {
  // Modal states
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedResource: any | null;

  // Form states
  formData: Record<string, any>
  formErrors: Record<string, string[]>
  isLoading: boolean;

  // Filter states
  searchQuery: string;
  filters: Record<string, any>
  sortBy: string;
  sortOrder: 'asc' | 'desc';

  // Actions
  setCreateModalOpen: (isOpen: boolean) => void;
  setEditModalOpen: (isOpen: boolean) => void;
  setDeleteModalOpen: (isOpen: boolean) => void;
  setSelectedResource: (resource: any | null) => void;
  setFormData: (data: Record<string, any>) => void;
  setFormErrors: (errors: Record<string, string[]>) => void;
  setLoading: (isLoading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Record<string, any>) => void;
  setSort: (by: string, order: 'asc' | 'desc') => void;
  resetState: () => void;
}

const initialState = {
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  selectedResource: null,
  formData: {},
  formErrors: {},
  isLoading: false,
  searchQuery: '',
  filters: {},
  sortBy: 'created_at',
  sortOrder: 'desc' as const,
};

export const useProjectResourcesStore = create<ResourceState>()(
  devtools(
    immer((set) => ({
      ...initialState,

      setCreateModalOpen: (isOpen) =>
        set((state) => {
          state.isCreateModalOpen = isOpen;
        }),

      setEditModalOpen: (isOpen) =>
        set((state) => {
          state.isEditModalOpen = isOpen;
        }),

      setDeleteModalOpen: (isOpen) =>
        set((state) => {
          state.isDeleteModalOpen = isOpen;
        }),

      setSelectedResource: (resource) =>
        set((state) => {
          state.selectedResource = resource;
        }),

      setFormData: (data) =>
        set((state) => {
          state.formData = data;
        }),

      setFormErrors: (errors) =>
        set((state) => {
          state.formErrors = errors;
        }),

      setLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),

      setSearchQuery: (query) =>
        set((state) => {
          state.searchQuery = query;
        }),

      setFilters: (filters) =>
        set((state) => {
          state.filters = filters;
        }),

      setSort: (by, order) =>
        set((state) => {
          state.sortBy = by;
          state.sortOrder = order;
        }),

      resetState: () =>
        set((state) => {
          Object.assign(state, initialState);
        }),
    }))
  )
);
