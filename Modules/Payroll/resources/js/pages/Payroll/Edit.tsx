import { FC } from 'react';
import { Head } from '@inertiajs/react';

interface Props {
    payroll: any;
}

export const Edit: FC<Props> = ({ payroll }) => {
    return (
        <>
            <Head title="Edit Payroll" />
            <div className="container mx-auto py-6">
                {/* Payroll edit form will go here */}
            </div>
        </>
    );
};

export default Edit;
