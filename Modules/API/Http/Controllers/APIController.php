<?php

namespace Modules\API\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class APIController extends Controller
{
    /**
     * Display the API dashboard.
     *
     * @return \Inertia\Response;
     */
    public function index()
    {
        return Inertia::render('API/Index', [
            'apiVersion' => config('api.version'),
            'apiDescription' => config('api.description'),
        ]);
    }

    /**
     * Display the API documentation.
     *
     * @return \Inertia\Response;
     */
    public function documentation()
    {
        return Inertia::render('API/Documentation', [
            'apiVersion' => config('api.version'),
            'apiVersions' => config('api.versioning.supported'),
            'defaultVersion' => config('api.versioning.default'),
        ]);
    }
}


