import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import MainLayout from '@/Modules/LeaveManagement/Resources/js/Layouts/MainLayout';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Add as AddIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as PendingIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon
} from '@mui/icons-material';
import moment from 'moment';

const LeaveStatusChip = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Chip label="Pending" icon={<PendingIcon />} color="warning" size="small" />;
    case 'approved':
      return <Chip label="Approved" icon={<ApprovedIcon />} color="success" size="small" />;
    case 'rejected':
      return <Chip label="Rejected" icon={<RejectedIcon />} color="error" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

export default function Index() {
  const { leaves, leaveTypes, counts, filters: initialFilters, flash } = usePage().props;
  const [activeTab, setActiveTab] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters || {});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);

    if (newValue === 'all') {
      setFilters({ ...filters, status: undefined });
    } else {
      setFilters({ ...filters, status: newValue });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setFilters({ ...filters, [name]: date ? moment(date).format('YYYY-MM-DD') : null });
  };

  const applyFilters = () => {
    Inertia.get(route('leaves.index'), filters, { preserveState: true });
  };

  const clearFilters = () => {
    setFilters({});
    Inertia.get(route('leaves.index'), {}, { preserveState: true });
  };

  return (
    <MainLayout>
      <Head title="Leave Management" />

      <Card>
        <CardHeader
          title="My Leave Requests"
          action={
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                Filters
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                component={Link}
                href={route('leaves.create')}
              >
                New Request
              </Button>
            </Box>
          }
        />

        {filtersOpen && (
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Leave Type"
                  name="leave_type_id"
                  value={filters.leave_type_id || ''}
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {leaveTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <DatePicker
                  label="From Date"
                  value={filters.start_date ? moment(filters.start_date) : null}
                  onChange={(date) => handleDateChange('start_date', date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <DatePicker
                  label="To Date"
                  value={filters.end_date ? moment(filters.end_date) : null}
                  onChange={(date) => handleDateChange('end_date', date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={applyFilters}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={clearFilters}
                  >
                    Clear
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label={`All (${counts.total || 0})`} value="all" />
            <Tab label={`Pending (${counts.pending || 0})`} value="pending" />
            <Tab label={`Approved (${counts.approved || 0})`} value="approved" />
            <Tab label={`Rejected (${counts.rejected || 0})`} value="rejected" />
          </Tabs>
        </Box>

        <CardContent>
          {flash.success && (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="body2">{flash.success}</Typography>
            </Box>
          )}

          {leaves.data && leaves.data.length > 0 ? (
            <Box>
              {leaves.data.map((leave) => (
                <Box
                  key={leave.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1">
                        {leave.leaveType?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {leave.reason}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {moment(leave.start_date).format('MMM D, YYYY')}
                          {' - '}
                          {moment(leave.end_date).format('MMM D, YYYY')}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {leave.days_count} {leave.days_count === 1 ? 'day' : 'days'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <LeaveStatusChip status={leave.status} />
                    </Grid>
                    <Grid item xs={6} md={3} sx={{ textAlign: 'right' }}>
                      <Button
                        component={Link}
                        href={route('leaves.show', leave.id)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>

                      {leave.status === 'pending' && (
                        <Button
                          component={Link}
                          href={route('leaves.edit', leave.id)}
                          color="primary"
                          size="small"
                        >
                          Edit
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="textSecondary">
                No leave requests found.
              </Typography>
              <Button
                component={Link}
                href={route('leaves.create')}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Create New Request
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
