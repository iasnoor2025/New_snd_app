import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InventoryTransaction, InventoryItem } from '@/types/models';
import { Table, Card, Input, Button, Select, DatePicker, Tag, Space, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined, FilterOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { usePermission } from '@/hooks/usePermission';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Props extends PageProps {
  transactions: {
    data: InventoryTransaction[];
    links: any;
    total: number;
  };
  items: InventoryItem[];
}

export default function Index({ auth, transactions, items }: Props) {
  const { hasPermission } = usePermission();
  const canCreateInventoryTransaction = hasPermission('inventory-transactions.create');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [itemFilter, setItemFilter] = useState<number | null>(null);

  const handleSearch = () => {
    // Implement search functionality with Inertia
  };

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter(null);
    setDateRange(null);
    setItemFilter(null);
  };

  const getTransactionTypeTag = (type: string) => {
    switch (type) {
      case 'addition':
        return <Tag color="green">Addition</Tag>
      case 'removal':
        return <Tag color="red">Removal</Tag>
      case 'adjustment':
        return <Tag color="blue">Adjustment</Tag>
      case 'transfer':
        return <Tag color="purple">Transfer</Tag>
      default:
        return <Tag>{type}</Tag>
    }
  };

  const columns = [;
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      render: (item: InventoryItem) => item.name,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => getTransactionTypeTag(type),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: InventoryTransaction) => {
        const isPositive = ['addition', 'adjustment'].includes(record.type) && quantity > 0;
        const isNegative = ['removal', 'adjustment'].includes(record.type) && quantity < 0;

        return (
          <span style={{ color: isPositive ? 'green' : isNegative ? 'red' : 'inherit' }}>
            {isPositive ? '+' : ''}{quantity}
          </span>
        );
      },
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: {
        showTitle: false,
      },
      render: (notes: string) => (
        <Tooltip placement="topLeft" title={notes}>
          {notes}
        </Tooltip>
      ),
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => user?.name || 'System',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: InventoryTransaction) => (
        <Space size="middle">
          <Link href={route('inventory.transactions.show', record.id)}>
            <Button type="text" icon={<EyeOutlined />} />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventory Transactions</h2>}
      <Head title="Inventory Transactions" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="mb-4 flex flex-wrap gap-4 items-center">
              <Input
                placeholder="Search by reference or notes"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: 250 }}
                prefix={<SearchOutlined />}
              />

              <Select
                placeholder="Filter by type"
                allowClear
                style={{ width: 150 }}
                value={typeFilter}
                onChange={value => setTypeFilter(value)}
                <Option value="addition">Addition</Option>
                <Option value="removal">Removal</Option>
                <Option value="adjustment">Adjustment</Option>
                <Option value="transfer">Transfer</Option>
              </Select>

              <Select
                placeholder="Filter by item"
                allowClear
                style={{ width: 200 }}
                value={itemFilter}
                onChange={value => setItemFilter(value)}
                {items.map(item => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>

              <RangePicker
                value={dateRange}
                onChange={dates => setDateRange(dates)}
              />

              <Button
                type="primary"
                icon={<FilterOutlined />}
                onClick={handleSearch}
                Filter
              </Button>

              <Button
                icon={<ReloadOutlined />}
                onClick={resetFilters}
                Reset
              </Button>

              {canCreateInventoryTransaction && (
                <Link href={route('inventory.transactions.create')}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add Transaction
                  </Button>
                </Link>
              )}
            </div>

            <Table
              columns={columns}
              dataSource={transactions.data}
              rowKey="id"
              pagination={{
                total: transactions.total,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

