import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type ForceChangePasswordForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

export default function ForceChangePassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ForceChangePasswordForm>>({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/user/password/change', {
            onFinish: () => reset('current_password', 'password', 'password_confirmation'),
        })
    };

    return (
        <AuthLayout title="Change password" description="Your password has expired. Please create a new password to continue.">
            <Head title="Change password" />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="current_password">Current Password</Label>
                        <Input
                            id="current_password"
                            type="password"
                            name="current_password"
                            value={data.current_password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            autoFocus
                            onChange={(e) => setData('current_password', e.target.value)}
                            placeholder="Current password"
                        />
                        <InputError message={errors.current_password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="New password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm New Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm new password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-4 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Change Password
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
