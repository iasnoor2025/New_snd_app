/**
 * Resources Route Component
 *
 * This component serves as the route handler for the project resources page.
 * It receives data from the backend and passes it to the ResourcesPage component.
 */

import React from 'react';
// Import Inertia.js types and components
import { PageProps } from '@inertiajs/react';
import { ResourcesPage } from '@/pages/Projects/Resources/ResourcesPage';

/**
 * Interface extending PageProps to include project resource data
 *
 * @extends PageProps - Base Inertia.js page props
 * @property project - Project information
 * @property manpowers - Array of manpower resources
 * @property equipments - Array of equipment resources
 * @property materials - Array of material resources
 * @property fuels - Array of fuel resources
 * @property expenses - Array of expense resources
 * @property availableEquipment - Array of available equipment for selection
 */
interface ResourcesPageData extends PageProps {
    project: {
        id: number;
        name: string;
    };
    manpowers: any[];
    equipments: any[];
    materials: any[];
    fuels: any[];
    expenses: any[];
    availableEquipment: any[];
}

/**
 * Resources Component
 *
 * This is the main route component that receives data from the backend
 * and renders the ResourcesPage with the provided data.
 *
 * @param project - Project information
 * @param manpowers - Array of manpower resources
 * @param equipments - Array of equipment resources
 * @param materials - Array of material resources
 * @param fuels - Array of fuel resources
 * @param expenses - Array of expense resources
 * @param availableEquipment - Array of available equipment for selection
 * @returns ResourcesPage component with all necessary props
 */
export default function Resources({
    project,
    manpowers,
    equipments,
    materials,
    fuels,
    expenses,
    availableEquipment
}: ResourcesPageData) {
    // Convert project ID to string for components that expect string IDs
    const projectWithStringId = {
        ...project,
        id: project.id.toString()
    };

    return (
        <ResourcesPage
            project={projectWithStringId}
            manpowers={manpowers}
            equipments={equipments}
            materials={materials}
            fuels={fuels}
            expenses={expenses}
            availableEquipment={availableEquipment}
        />
    );
}



