import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Avatar,
  Breadcrumb,
  theme
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  ShopOutlined,
  ToolOutlined,
  CarOutlined,
  FileTextOutlined,
  BankOutlined,
  SettingOutlined,
  LogoutOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { User } from '@/types/models';

const { Header, Sider, Content } = Layout;

interface Props {
  user: User;
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ user, header, children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  const handleLogout = () => {
    router.post(route('logout'));
  };

  const menuItems = [;
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href={route('dashboard')}>Dashboard</Link>,
    },
    {
      key: 'customers',
      icon: <TeamOutlined />,
      label: <Link href={route('customers.index')}>customers</Link>,
    },
    {
      key: 'equipment',
      icon: <ToolOutlined />,
      label: <Link href={route('equipment.index')}>Equipment</Link>,
    },
    {
      key: 'rentals',
      icon: <CarOutlined />,
      label: <Link href={route('rentals.index')}>Rentals</Link>,
    },
    {
      key: 'invoices',
      icon: <FileTextOutlined />,
      label: <Link href={route('invoices.index')}>Invoices</Link>,
    },
    {
      key: 'employees',
      icon: <TeamOutlined />,
      label: <Link href={route('employees.index')}>Employees</Link>,
    },
    {
      key: 'advances',
      icon: <CreditCardOutlined />,
      label: <Link href={route('advances.all')}>Advances</Link>,
    },
    {
      key: 'locations',
      icon: <ShopOutlined />,
      label: <Link href={route('locations.index')}>Locations</Link>,
    },
    {
      key: 'reports',
      icon: <BankOutlined />,
      label: <Link href={route('reports.index')}>Reports</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link href={route('profile.edit')}>Settings</Link>,
    },
  ];

  const userMenuItems = [;
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link href={route('profile.edit')}>Profile</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
          zIndex: 10,
        }}
        <div className="logo" style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 24px',
        }}>
          <Link href="/">
            <h1 style={{
              color: token.colorPrimary,
              margin: 0,
              fontSize: collapsed ? '20px' : '24px',
              fontWeight: 'bold',
            }}>
              {collapsed ? 'SR' : 'SND Rental'}
            </h1>
          </Link>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header style={{
          padding: '0 24px',
          background: token.colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <div style={{ marginLeft: '16px' }}>
              {header}
            </div>
          </div>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Avatar icon={<UserOutlined />} />
              <span style={{ marginLeft: '8px' }}>{user.name}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{
          margin: '24px 16px',
          padding: 0,
          minHeight: 280,
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

