import React from "react";
import { usePage } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";

export function ErrorAlert() {
  const { errors, flash } = usePage().props;
  const hasErrors = Object.keys(errors).length > 0;
  const errorMessage = flash.error;
  
  if (!hasErrors && !errorMessage) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          {errorMessage && (
            <p className="text-sm font-medium text-red-800">{errorMessage}</p>
          )}
          
          {hasErrors && (
            <div className="mt-2">
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(errors).map(([key, value]) => (
                  <li key={key} className="text-sm">
                    {Array.isArray(value) ? value[0] : value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorAlert; 