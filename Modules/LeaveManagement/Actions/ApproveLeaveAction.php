<?php

namespace Modules\LeaveManagement\Actions;

use Modules\LeaveManagement\Domain\Models\Leave;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ApproveLeaveAction
{
    /**
     * Execute the action to approve a leave request.
     *
     * @param int $leaveId
     * @param array|null $additionalData
     * @return \Modules\LeaveManagement\Domain\Models\Leave;
     * @throws \Exception
     */
    public function execute(int $leaveId, ?array $additionalData = null): Leave
    {
        return DB::transaction(function () use ($leaveId, $additionalData) {
            // Find the leave request
            $leave = Leave::findOrFail($leaveId);

            // Check if leave is already approved or rejected
            if ($leave->status !== 'pending') {
                throw new \Exception('Leave request is already ' . $leave->status);
            }

            // Update leave status to approved
            $leave->status = 'approved';
            $leave->approved_by = Auth::id();

            // Add any additional data if provided
            if ($additionalData && is_array($additionalData)) {
                foreach ($additionalData as $key => $value) {
                    if (in_array($key, $leave->getFillable())) {
                        $leave->{$key} = $value;
                    }
                }
            }

            // Save the leave request
            $leave->save();

            // Return the updated leave request
            return $leave->fresh();
        });
    }
}


