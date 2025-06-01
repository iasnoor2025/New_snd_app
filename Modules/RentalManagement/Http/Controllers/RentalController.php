<?php

namespace Modules\RentalManagement\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\RentalManagement\Domain\Models\Rental;
use Modules\RentalManagement\Services\RentalService;
use Modules\Core\Domain\Models\Location;

class RentalController extends Controller
{
    protected $rentalService;

    public function __construct(RentalService $rentalService)
    {
        $this->rentalService = $rentalService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rentals = $this->rentalService->getAllRentals();
        // Ensure rentals is always an array with a data key
        $rentalsArray = [
            'data' => $rentals ? $rentals->toArray() : [],
            'current_page' => 1,
            'last_page' => 1,
            'per_page' => count($rentals ?? []),
            'total' => count($rentals ?? []),
        ];
        return Inertia::render('Rentals/Index', [
            'rentals' => $rentalsArray
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $locations = Location::all();
        return Inertia::render('Rentals/Create', [
            'locations' => $locations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:pending,active,completed,cancelled',
            'total_amount' => 'required|numeric|min:0',
        ]);

        $this->rentalService->create($validated);

        return redirect()->route('rentals.index')
            ->with('success', 'Rental created successfully.');
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        $rental = $this->rentalService->findById((int) $id);
        return Inertia::render('Rentals/Show', [
            'rental' => $rental
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $rental = $this->rentalService->findById((int) $id);
        $locations = Location::all();
        return Inertia::render('Rentals/Edit', [
            'rental' => $rental,
            'locations' => $locations
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:pending,active,completed,cancelled',
            'total_amount' => 'required|numeric|min:0',
        ]);

        $this->rentalService->update($id, $validated);

        return redirect()->route('rentals.index')
            ->with('success', 'Rental updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->rentalService->delete($id);
        return redirect()->route('rentals.index')
            ->with('success', 'Rental deleted successfully.');
    }
}


