import React from "react";
import { ProjectProgress } from "@/components/project/ProjectProgress";

export default function ProjectProgressDemo() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-2xl font-bold">Project Progress Component</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="mb-4 text-lg font-medium">Default State</h2>
          <ProjectProgress
            percentage={25}
            completed={1}
            total={4}
            inProgress={2}
            pending={1}
            overdue={0}
          />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-medium">50% Complete</h2>
          <ProjectProgress
            percentage={50}
            completed={3}
            total={6}
            inProgress={2}
            pending={1}
            overdue={0}
          />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-medium">With Overdue Tasks</h2>
          <ProjectProgress
            percentage={60}
            completed={6}
            total={10}
            inProgress={1}
            pending={1}
            overdue={2}
          />
        </div>
      </div>
    </div>
  );
}
