import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useEffect } from 'react';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useToast } from '@/hooks/use-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Company settings',
        href: '/settings/company',
    },
];

interface CompanySettings {
    name: string;
    logo: File | null;
    current_logo?: string;
    _method?: string;
}

interface Props {
    name: string;
    current_logo: string;
    success?: string;
}

export default function CompanySettings({ name, current_logo, success }: Props) {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm<CompanySettings>({
        name: name.replace(/^"|"$/g, ''), // Remove quotes when displaying
        logo: null,
        current_logo: current_logo,
        _method: 'post',
    })

    useEffect(() => {
        if (success) {
            toast({
                title: "Success",
                description: success,
            })
        }
    }, [success]);

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name); // Send unquoted - backend will handle quotes
        if (data.logo) {
            formData.append('logo', data.logo);
        }

        post('/settings/company', {
            onSuccess: () => {
                reset('logo');
                // Reload the page to update the sidebar and reflect .env changes
                window.location.reload();
            },
        })
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Company settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold">Company settings</h2>
                        <p className="text-muted-foreground">
                            Update your company information and logo
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Company Information</h3>
                                <p className="text-sm text-muted-foreground mb-4">Update your company name and branding</p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Company Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1"
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <Label htmlFor="logo">Company Logo</Label>
                                        {data.current_logo && (
                                            <div className="mt-2 mb-2">
                                                <img
                                                    src={data.current_logo}
                                                    alt="Current company logo"
                                                    className="h-12"
                                                />
                                            </div>
                                        )}
                                        <div className="mt-1">
                                            <input
                                                id="logo"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setData('logo', e.target.files?.[0] || null)}
                                                className="block w-full text-sm
                                                text-gray-500 file:mr-4 file:py-2
                                                file:px-4 file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-primary/10 file:text-primary
                                                hover:file:bg-primary/20"
                                            />
                                            <InputError message={errors.logo} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[#111827] hover:bg-[#172033] text-white"
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
