import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../resources/js/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../../resources/js/components/ui/table';
import { Button } from '../../../../../../resources/js/components/ui/button';
import { Input } from '../../../../../../resources/js/components/ui/input';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../../../../../../resources/js/components/ui/select';
import AdminLayout from '../../../../../../resources/js/layouts/AdminLayout';

interface Role { id: number; name: string; }
interface User {
  id: number;
  name: string;
  email: string;
  is_active?: boolean;
  roles: Role[];
}
interface Props {
  users: User[];
  roles: Role[];
}

const UsersIndex: React.FC<Props> = ({ users, roles }) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [roleUpdates, setRoleUpdates] = useState<{ [userId: number]: number }>({});
  const [loading, setLoading] = useState(false);

  // Filter users by search
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handle role change
  const handleRoleChange = (userId: number, roleId: number) => {
    setRoleUpdates(prev => ({ ...prev, [userId]: roleId }));
  };

  // Assign role
  const assignRole = (userId: number) => {
    const roleId = roleUpdates[userId];
    if (!roleId) return;
    setLoading(true);
    router.post(`/users/${userId}/roles`, { role_id: roleId }, {
      onFinish: () => setLoading(false),
    });
  };

  // Delete user
  const deleteUser = (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoading(true);
    router.delete(`/users/${userId}`, {
      onFinish: () => setLoading(false),
    });
  };

  // Bulk delete
  const bulkDelete = () => {
    if (!window.confirm('Delete selected users?')) return;
    setLoading(true);
    router.delete('/users/bulk-destroy', {
      data: { ids: selected },
      onFinish: () => { setLoading(false); setSelected([]); },
    });
  };

  // Toggle select
  const toggleSelect = (userId: number) => {
    setSelected(sel => sel.includes(userId) ? sel.filter(id => id !== userId) : [...sel, userId]);
  };

  // Select all
  const selectAll = () => {
    setSelected(filteredUsers.map(u => u.id));
  };

  // Deselect all
  const deselectAll = () => {
    setSelected([]);
  };

  return (
    <AdminLayout title="User Management">
      <Head title="User Management" />
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email" />
            <Button variant="outline" onClick={selectAll}>Select All</Button>
            <Button variant="outline" onClick={deselectAll}>Deselect All</Button>
            <Button variant="destructive" onClick={bulkDelete} disabled={selected.length === 0}>Delete Selected</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assign Role</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <input type="checkbox" checked={selected.includes(user.id)} onChange={() => toggleSelect(user.id)} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles.map(r => r.name).join(', ')}</TableCell>
                  <TableCell>{user.is_active ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <Select value={roleUpdates[user.id] ? String(roleUpdates[user.id]) : ''} onValueChange={val => handleRoleChange(user.id, Number(val))}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button size="sm" onClick={() => assignRole(user.id)} disabled={!roleUpdates[user.id] || loading}>Assign</Button>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)} disabled={loading}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default UsersIndex;
