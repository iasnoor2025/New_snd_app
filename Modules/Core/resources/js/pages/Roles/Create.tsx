import React from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../resources/js/components/ui/card';
import { Input } from '../../../../../../resources/js/components/ui/input';
import { Button } from '../../../../../../resources/js/components/ui/button';

const CreateRole: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('roles.store'));
  };

  return (
    <Card className="max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create Role</CardTitle>
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
          <Button type="submit" disabled={processing} className="w-full">Create</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateRole;
