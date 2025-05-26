import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Modules/TimesheetManagement/Resources/js/Layouts/MainLayout';
import Card from '@/Modules/TimesheetManagement/Resources/js/Components/Card';
import Button from '@/Modules/TimesheetManagement/Resources/js/Components/Button';
import Modal from '@/Modules/TimesheetManagement/Resources/js/Components/Modal';
import TextInput from '@/Modules/TimesheetManagement/Resources/js/Components/TextInput';
import TextArea from '@/Modules/TimesheetManagement/Resources/js/Components/TextArea';
import Label from '@/Modules/TimesheetManagement/Resources/js/Components/Label';
import InputError from '@/Modules/TimesheetManagement/Resources/js/Components/InputError';
import FormSection from '@/Modules/TimesheetManagement/Resources/js/Components/FormSection';
import SelectInput from '@/Modules/TimesheetManagement/Resources/js/Components/SelectInput';
import InputGroup from '@/Modules/TimesheetManagement/Resources/js/Components/InputGroup';
import Table from '@/Modules/TimesheetManagement/Resources/js/Components/Table';
import Pagination from '@/Modules/TimesheetManagement/Resources/js/Components/Pagination';
import Badge from '@/Modules/TimesheetManagement/Resources/js/Components/Badge';
import { formatDate, formatHours } from '@/Modules/TimesheetManagement/Resources/js/utils/formatters';

const TimesheetApprovalsIndex = ({ timesheets, employees, filters, canViewAll }) => {
  const [rejectingTimesheet, setRejectingTimesheet] = useState(null);
  const [approvingTimesheet, setApprovingTimesheet] = useState(null);

  const filterForm = useForm({
    employee_id: filters.employee_id || '',
    department_id: filters.department_id || '',
    show_all: filters.show_all || false,
  });

  const approvalForm = useForm({
    notes: '',
  });

  const rejectionForm = useForm({
    rejection_reason: '',
  });

  const handleApprove = (timesheet) => {
    setApprovingTimesheet(timesheet);
  };

  const handleReject = (timesheet) => {
    setRejectingTimesheet(timesheet);
  };

  const submitApproval = () => {
    approvalForm.post(route('timesheets.approvals.approve', approvingTimesheet.id), {
      onSuccess: () => {
        setApprovingTimesheet(null);
        approvalForm.reset();
      },
    });
  };

  const submitRejection = () => {
    rejectionForm.post(route('timesheets.approvals.reject', rejectingTimesheet.id), {
      onSuccess: () => {
        setRejectingTimesheet(null);
        rejectionForm.reset();
      },
    });
  };

  const handleFilterChange = () => {
    filterForm.get(route('timesheets.approvals.index'), {
      preserveState: true,
    });
  };

  return (
    <MainLayout>
      <Head title="Timesheet Approvals" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Timesheet Approvals</h1>

          <Card className="mt-4">
            <Card.Header>
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="employee_id">Employee</Label>
                  <SelectInput
                    id="employee_id"
                    name="employee_id"
                    value={filterForm.data.employee_id}
                    onChange={(e) => {
                      filterForm.setData('employee_id', e.target.value);
                      setTimeout(handleFilterChange, 100);
                    }}
                  >
                    <option value="">All Employees</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.first_name} {employee.last_name}
                      </option>
                    ))}
                  </SelectInput>
                </div>

                {canViewAll && (
                  <div>
                    <div className="flex items-center mt-7">
                      <input
                        id="show_all"
                        name="show_all"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={filterForm.data.show_all}
                        onChange={(e) => {
                          filterForm.setData('show_all', e.target.checked);
                          setTimeout(handleFilterChange, 100);
                        }}
                      />
                      <label htmlFor="show_all" className="ml-2 block text-sm text-gray-900">
                        Show all timesheets
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h2 className="text-lg font-medium text-gray-900">Timesheets Pending Approval</h2>
            </Card.Header>
            <Card.Body className="p-0">
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Employee</Table.HeaderCell>
                    <Table.HeaderCell>Week</Table.HeaderCell>
                    <Table.HeaderCell>Hours</Table.HeaderCell>
                    <Table.HeaderCell>Submitted</Table.HeaderCell>
                    <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {timesheets.data.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={5} className="text-center py-4">
                        No timesheets pending approval
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    timesheets.data.map((timesheet) => (
                      <Table.Row key={timesheet.id}>
                        <Table.Cell>
                          {timesheet.employee?.first_name} {timesheet.employee?.last_name}
                        </Table.Cell>
                        <Table.Cell>
                          {formatDate(timesheet.week_start_date)} - {formatDate(timesheet.week_end_date)}
                        </Table.Cell>
                        <Table.Cell>
                          <div>{formatHours(timesheet.total_hours)} Total</div>
                          <div className="text-xs text-gray-500">
                            {formatHours(timesheet.regular_hours)} Regular / {formatHours(timesheet.overtime_hours)} Overtime
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          {formatDate(timesheet.submitted_at, true)}
                        </Table.Cell>
                        <Table.Cell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={route('timesheets.weekly.show', timesheet.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View
                            </Link>
                            <button
                              type="button"
                              className="text-green-600 hover:text-green-800"
                              onClick={() => handleApprove(timesheet)}
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleReject(timesheet)}
                            >
                              Reject
                            </button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>

              <div className="px-4 py-3 border-t border-gray-200">
                <Pagination links={timesheets.links} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Approval Modal */}
      <Modal
        show={!!approvingTimesheet}
        onClose={() => setApprovingTimesheet(null)}
        maxWidth="md"
      >
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Approve Timesheet
          </h2>

          <div className="mt-4">
            <p>
              Are you sure you want to approve the timesheet for{' '}
              <span className="font-semibold">
                {approvingTimesheet?.employee?.first_name} {approvingTimesheet?.employee?.last_name}
              </span>{' '}
              for the week of{' '}
              <span className="font-semibold">
                {formatDate(approvingTimesheet?.week_start_date)} - {formatDate(approvingTimesheet?.week_end_date)}
              </span>
              ?
            </p>

            <div className="mt-4">
              <Label htmlFor="approval_notes" value="Notes (Optional)" />
              <TextArea
                id="approval_notes"
                className="mt-1 block w-full"
                value={approvalForm.data.notes}
                onChange={(e) => approvalForm.setData('notes', e.target.value)}
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setApprovingTimesheet(null)}
                disabled={approvalForm.processing}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={submitApproval}
                disabled={approvalForm.processing}
              >
                Approve Timesheet
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Rejection Modal */}
      <Modal
        show={!!rejectingTimesheet}
        onClose={() => setRejectingTimesheet(null)}
        maxWidth="md"
      >
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Reject Timesheet
          </h2>

          <div className="mt-4">
            <p>
              Are you sure you want to reject the timesheet for{' '}
              <span className="font-semibold">
                {rejectingTimesheet?.employee?.first_name} {rejectingTimesheet?.employee?.last_name}
              </span>{' '}
              for the week of{' '}
              <span className="font-semibold">
                {formatDate(rejectingTimesheet?.week_start_date)} - {formatDate(rejectingTimesheet?.week_end_date)}
              </span>
              ?
            </p>

            <div className="mt-4">
              <Label htmlFor="rejection_reason" value="Reason for Rejection *" />
              <TextArea
                id="rejection_reason"
                className="mt-1 block w-full"
                value={rejectionForm.data.rejection_reason}
                onChange={(e) => rejectionForm.setData('rejection_reason', e.target.value)}
                required
              />
              <InputError message={rejectionForm.errors.rejection_reason} className="mt-2" />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setRejectingTimesheet(null)}
                disabled={rejectionForm.processing}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={submitRejection}
                disabled={rejectionForm.processing || !rejectionForm.data.rejection_reason}
              >
                Reject Timesheet
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default TimesheetApprovalsIndex;
