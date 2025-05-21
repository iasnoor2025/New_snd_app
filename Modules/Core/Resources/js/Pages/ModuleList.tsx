import React from 'react';
import { AppLayout } from '../Components/Layout/AppLayout';
import { ModuleCard } from '../Components/Module/ModuleCard';
import { FlashMessageContainer } from '../Components/Common/FlashMessage';
import { useForm } from '@inertiajs/react';
import { route } from '../routes';

interface Module {
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'pending';
    config?: Record<string, any>;
}

interface ModuleListProps {
    modules: Module[];
}

export default function ModuleList({ modules }: ModuleListProps) {
    const { post, processing } = useForm();

    const handleInitialize = (moduleName: string) => {
        post(route('core.modules.initialize', { name: moduleName }), {
            onSuccess: () => {
                // The page will be refreshed with the updated module status
            }
        });
    };

    return (
        <AppLayout
            title="Module Management"
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Module Management
                </h2>
            }
        >
            <div className="space-y-6">
                {modules.map((module) => (
                    <ModuleCard
                        key={module.name}
                        {...module}
                        onInitialize={() => handleInitialize(module.name)}
                    />
                ))}
            </div>

            <FlashMessageContainer />
        </AppLayout>
    );
}
