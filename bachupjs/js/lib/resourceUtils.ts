import axios from 'axios';
import { ToastService } from '@/components/shared/ToastManager';

/**
 * Process form submission for a batch of resources
 * @param projectId The project ID
 * @param resourceType The type of resource (manpower, equipment, material, fuel, expense)
 * @param resources Array of resources to save
 * @param options Additional options for batch processing
 */
export async function batchSaveResources(
    projectId: number,
    resourceType: string,
    resources: any[],
    options: {
        useAsync?: boolean;
        asyncThreshold?: number;
        onProgress?: (current: number, total: number) => void;
        onComplete?: (result: any) => void;
        onError?: (error: any) => void;
    } = {}
) {
    const {
        useAsync = false,
        asyncThreshold = 50,
        onProgress,
        onComplete,
        onError
    } = options;

    try {
        // Choose endpoint based on batch size and async flag
        const useAsyncProcessing = useAsync || resources.length > asyncThreshold;

        // Construct the URL for the batch operation
        const endpoint = useAsyncProcessing
            ? `/api/projects/${projectId}/resources/batch/queue`
            : `/api/projects/${projectId}/resources/batch`;

        // Send the batch request
        const response = await axios.post(endpoint, {
            resource_type: resourceType,
            resources
        })

        // Handle progress updates
        if (onProgress) {
            let savedCount = 0;
            const totalCount = resources.length;

            for (let i = 0; i < totalCount; i++) {
                savedCount++;
                onProgress(savedCount, totalCount);
                // Small delay to allow UI updates
                if (i % 10 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
            }
        }

        // Call completion handler
        if (onComplete) {
            onComplete(response.data);
        }

        return response.data;
    } catch (error) {
        console.error('Batch save error:', error);

        if (onError) {
            onError(error);
        }

        throw error;
    }
}

/**
 * Apply loading state to a form by disabling form controls
 * @param formRef Reference to the form element
 * @param isLoading Whether the form is in a loading state
 */
export function applyFormLoadingState(formRef: React.RefObject<HTMLFormElement>, isLoading: boolean) {
    if (!formRef.current) return;

    // Get all form elements that can be disabled
    const elements = formRef.current.querySelectorAll('input, select, textarea, button');

    // Set disabled state for each element
    elements.forEach((element: HTMLElement) => {
        if (element instanceof HTMLButtonElement ||
            element instanceof HTMLInputElement ||
            element instanceof HTMLSelectElement ||
            element instanceof HTMLTextAreaElement) {
            element.disabled = isLoading;
        }
    })
}



