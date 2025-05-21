import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ServerErrorProps {
  status?: number;
  statusText?: string;
  message?: string;
}

export default function ServerError({ status = 500, statusText = "Server Error", message }: ServerErrorProps) {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Head title={`${status} - ${statusText}`} />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
        <div className="mx-auto max-w-md px-6 py-12">
          <AlertTriangle className="mx-auto mb-6 h-24 w-24 text-amber-500" />
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
            {status} - {statusText}
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            {message || "Sorry, something went wrong on our server. We're working to fix the issue."}
          </p>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="mr-4 inline-flex items-center"
          >
            Go Back
          </Button>
          <Button
            onClick={refreshPage}
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      </div>
    </>
  );
}
