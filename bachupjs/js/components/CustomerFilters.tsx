import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@/hooks/useDebounce';
import { router } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface CustomerFiltersProps {
  onApplyFilters: (filters: CustomerFilters) => void;
  filters?: CustomerFilters;
}

export interface CustomerFilters {
  search?: string;
  status?: 'active' | 'inactive' | '';
  country?: string;
  city?: string;
}

export default function CustomerFilters({ onApplyFilters, filters = {} }: CustomerFiltersProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { register, watch, reset, handleSubmit } = useForm<CustomerFilters>({
    defaultValues: {
      search: filters.search || '',
      status: filters.status || '',
      country: filters.country || '',
      city: filters.city || '',
    }
  })

  const watchedValues = watch();
  const debouncedSearch = useDebounce(watchedValues.search || '', 300);

  const handleFilterSubmit = (data: CustomerFilters) => {
    if (!data) return;
    onApplyFilters(data);
    setIsMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    reset({
      search: '',
      status: '',
      country: '',
      city: ''
    })
    onApplyFilters({})
  };

  React.useEffect(() => {
    if (debouncedSearch !== undefined) {
      onApplyFilters({ ...watchedValues, search: debouncedSearch })
    }
  }, [debouncedSearch]);

  const filterContent = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="search">Search</Label>
        <div className="relative mt-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search";
            placeholder="Search customers...";
            className="pl-8";
            {...register('search')}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          {...register('status')}
          onValueChange={(value) => onApplyFilters({ ...watchedValues, status: value as any })}
          value={watchedValues.status || ''}
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="Filter by country"
          {...register('country')}
        />
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="Filter by city"
          {...register('city')}
        />
      </div>

      <div className="flex flex-col mt-6 space-y-2">
        <Button type="button" onClick={handleSubmit(handleFilterSubmit)}>
          Apply Filters
        </Button>
        <Button type="button" variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );

  return (
      {/* Desktop filters */}
      <Card className="hidden md:block sticky top-0 z-10 bg-background/95 backdrop-blur">
        <CardContent className="py-4">
          <form onSubmit={handleSubmit(handleFilterSubmit)}>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search customers..."
                  className="pl-8"
                  {...register('search')}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Open filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down customer results with advanced filters
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">{filterContent}</div>
                </SheetContent>
              </Sheet>
              {(watchedValues.status || watchedValues.country || watchedValues.city) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearFilters}
                  className="shrink-0"
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear filters</span>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Mobile filters */}
      <div className="md:hidden sticky top-0 z-10 bg-background/95 backdrop-blur p-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
              {...register('search')}
            />
          </div>
          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down customer results with advanced filters
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">{filterContent}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}



