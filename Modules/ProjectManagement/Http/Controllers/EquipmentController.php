<?php

namespace Modules\ProjectManagement\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('ProjectManagement::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('ProjectManagement::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return view('ProjectManagement::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('ProjectManagement::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
