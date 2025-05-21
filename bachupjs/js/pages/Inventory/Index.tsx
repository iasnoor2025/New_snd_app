import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { InventoryItem, InventoryCategory } from '@/types/models';
import { Button, Card, Input, Select, Table, Tag, Tooltip, message } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined, WarningOutlined } from '@ant-design/icons';
import { formatCurrency } from '@/utils';
import { useToast } from '@/components/ui/use-toast';

interface Props extends PageProps {
  inventoryItems: {
    data: InventoryItem[];
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
  };
  categories: InventoryCategory[];
  filters: {
    category: string | null;
    status: string | null;
    search: string | null;
  };
}

export default function Index({ auth, inventoryItems, categories, filters }: Props) {

  const { hasPermission } = usePermission();
  const canCreateInventory = hasPermission('inventory.create');
const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || undefined);
  const [selectedStatus, setSelectedStatus] = useState(filters.status || undefined);

  const handleSearch = () => {
    router.get(route('inventory.index'), {
      search: searchTerm,
      category: selectedCategory,
      status: selectedStatus,
    }, {
      preserveState: true,
      replace: true,
    })
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(undefined);
    setSelectedStatus(undefined);
    router.get(route('inventory.index'), {}, {
      preserveState: true,
      replace: true,
    })
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      router.delete(route('inventory.destroy', id), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Inventory item deleted successfully"
          })
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to delete inventory item",
            variant: "destructive"
          })
        },
      })
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: InventoryItem) => (
        <Link href={route('inventory.show', record.id)}>{text}</Link>
      ),
    },
    {
      title: 'Part Number',
      dataIndex: 'part_number',
      key: 'part_number',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_: any, record: InventoryItem) => record.category?.name,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity_in_stock',
      key: 'quantity_in_stock',
      render: (quantity: number, record: InventoryItem) => {
        if (quantity <= 0) {
          return <Tag color="red">Out of Stock</Tag>
        } else if (quantity <= record.reorder_threshold) {
          return (
            <Tooltip title="Low Stock">
              <Tag color="orange">
                {quantity} <WarningOutlined />
              </Tag>
            </Tooltip>
          );
        }
        return <Tag color="green">{quantity}</Tag>
      },
    },
    {
      title: 'Unit Cost',
      dataIndex: 'unit_cost',
      key: 'unit_cost',
      render: (cost: number) => formatCurrency(cost),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: InventoryItem) => (
        <div className="flex space-x-2">
          <Link href={route('inventory.show', record.id)}>
            <Button type="primary" icon={<EyeOutlined />} size="small" />
          </Link>
          <Link href={route('inventory.edit', record.id)}>
            <Button type="default" icon={<EditOutlined />} size="small" />
          </Link>
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventory Management</h2>}
    >
      <Head title="Inventory Management" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold">Inventory Items</div>
              <div className="flex space-x-2">
                <Link href={route('inventory.create')}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add New Item
                  </Button>
                </Link>
                <Link href={route('inventory.low-stock')}>
                  <Button type="default" icon={<WarningOutlined />}>
                    Low Stock Items
                  </Button>
                </Link>
                <Link href={route('inventory.report')}>
                  <Button type="default">
                    Generate Report
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <Input
                placeholder="Search by name, part number or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 300 }}
                onPressEnter={handleSearch}
              />
              <Select
                placeholder="Filter by Category"
                style={{ width: 200 }}
                allowClear
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categories.map((category) => ({
                  value: category.id.toString(),
                  label: category.name,
                }))}
              />
              <Select
                placeholder="Filter by Status"
                style={{ width: 200 }}
                allowClear
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={[
                  { value: 'in_stock', label: 'In Stock' },
                  { value: 'low_stock', label: 'Low Stock' },
                  { value: 'out_of_stock', label: 'Out of Stock' },
                ]}
              />
              <Button type="primary" onClick={handleSearch}>
                Search
              </Button>
              <Button icon={<ReloadOutlined />} onClick={resetFilters}>
                Reset
              </Button>
            </div>

            <Table
              columns={columns}
              dataSource={inventoryItems.data}
              rowKey="id"
              pagination={{
                current: inventoryItems.current_page,
                pageSize: inventoryItems.per_page,
                total: inventoryItems.total,
                onChange: (page) => {
                  router.get(
                    route('inventory.index'),
                    {
                      page,
                      search: searchTerm,
                      category: selectedCategory,
                      status: selectedStatus,
                    },
                    {
                      preserveState: true,
                      replace: true,
                    }
                  );
                },
              }}
            />
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

</Button>

