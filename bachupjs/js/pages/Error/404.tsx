import { FolderX } from "lucide-react";
import { Head, Link } from "@inertiajs/react";

export default function NotFound() {
    return (
        <>
            <Head title="Page Not Found" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
                <div className="mx-auto max-w-md px-6 py-12">
                    <FolderX className="mx-auto mb-6 h-24 w-24 text-indigo-500" />
                    <h1 className="mb-2 text-3xl font-bold">Page not found</h1>
                    <p className="mb-8 text-gray-600">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <Link
                        href="/"
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </>
    );
}
