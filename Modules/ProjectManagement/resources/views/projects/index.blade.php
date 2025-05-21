@extends('projectmanagement::components.layouts.master')

@section('title', 'Projects')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Projects
                            <a href="{{ route('projects.create') }}" class="btn btn-primary float-end">Add Project</a>
                        </h4>
                    </div>
                    <div class="card-body">
                        @if(session('success'))
                            <div class="alert alert-success">{{ session('success') }}</div>
                        @endif

                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Manager</th>
                                    <th>Progress</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($projects as $project)
                                    <tr>
                                        <td>{{ $project->id }}</td>
                                        <td>{{ $project->name }}</td>
                                        <td>{{ ucfirst($project->status) }}</td>
                                        <td>{{ ucfirst($project->priority) }}</td>
                                        <td>{{ $project->start_date->format('Y-m-d') }}</td>
                                        <td>{{ $project->end_date ? $project->end_date->format('Y-m-d') : 'N/A' }}</td>
                                        <td>{{ $project->manager ? $project->manager->name : 'Not Assigned' }}</td>
                                        <td>
                                            <div class="progress">
                                                <div class="progress-bar" role="progressbar" style="width: {{ $project->progress }}%";" aria-valuenow="{{ $project->progress }}" aria-valuemin="0" aria-valuemax="100">{{ $project->progress }}%</div>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="{{ route('projects.show', $project->id) }}" class="btn btn-sm btn-info">View</a>
                                            <a href="{{ route('projects.edit', $project->id) }}" class="btn btn-sm btn-primary">Edit</a>
                                            <form action="{{ route('projects.destroy', $project->id) }}" method="POST" style="display: inline-block";">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this project?')">Delete</button>;
                                            </form>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="9" class="text-center">No projects found</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

