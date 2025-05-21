import { FC } from 'react';
import { Head } from '@inertiajs/react';
import { EmployeeDashboard } from './EmployeeDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { AccountantDashboard } from './AccountantDashboard';
import { AdminDashboard } from './AdminDashboard';
import { useAuth } from '@/Hooks/useAuth';

interface Props {
    employeeData?: any;
    managerData?: any;
    accountantData?: any;
    adminData?: any;
}

export const Dashboard: FC<Props> = ({
    employeeData,
    managerData,
    accountantData,
    adminData
}) => {
    const { user } = useAuth();

    const renderDashboard = () => {
        if (user.roles.some(role => role.name === 'admin')) {
            return <AdminDashboard {...adminData} />
        }

        if (user.roles.some(role => role.name === 'accountant')) {
            return <AccountantDashboard {...accountantData} />
        }

        if (user.roles.some(role => role.name === 'manager')) {
            return <ManagerDashboard {...managerData} />
        }

        // Default to employee dashboard
        return <EmployeeDashboard {...employeeData} />
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="container mx-auto py-6">
                {renderDashboard()}
            </div>
        </>
    );
};

export default Dashboard;
