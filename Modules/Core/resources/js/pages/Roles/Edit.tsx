import React, { useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../resources/js/components/ui/card';
import { Input } from '../../../../../../resources/js/components/ui/input';
import { Button } from '../../../../../../resources/js/components/ui/button';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../../../../../../resources/js/components/ui/select';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Permission {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Props {
  role: Role;
  permissions: Permission[];
  success?: string;
  error?: string;
}

const EditRole: React.FC<Props> = ({ role, permissions, success, error }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: role.name,
    permissions: role.permissions.map(p => p.id),
  });
  const page = usePage();

  useEffect(() => {
    if (page.props.success) toast.success(page.props.success as string);
    if (page.props.error) toast.error(page.props.error as string);
  }, [page.props.success, page.props.error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('roles.update', role.id));
  };

  const handlePermissionChange = (id: number) => {
    setData('permissions', data.permissions.includes(id)
      ? data.permissions.filter((pid: number) => pid !== id)
      : [...data.permissions, id]
    );
  };

  return (
    <Card className="max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle>Edit Role</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Name"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              placeholder="Role Name"
              required
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Permissions</label>
            <div className="flex flex-wrap gap-2">
              {permissions.map(permission => (
                <label key={permission.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={data.permissions.includes(permission.id)}
                    onChange={() => handlePermissionChange(permission.id)}
                  />
                  {permission.name}
                </label>
              ))}
            </div>
            {errors.permissions && <div className="text-red-500 text-sm">{errors.permissions}</div>}
          </div>
          <Button type="submit" disabled={processing} className="w-full">Update</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditRole;
