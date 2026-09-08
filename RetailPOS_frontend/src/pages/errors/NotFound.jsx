import {
  ArrowLeft,
  Home,
  SearchX,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <SearchX
            size={38}
            className="text-primary"
          />
        </div>

        <div className="mt-6 text-6xl font-bold">
          404
        </div>

        <h1 className="mt-3 text-2xl font-semibold">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-base-content/60">
          The requested page does not exist.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() =>
              window.history.back()
            }
            className="btn btn-ghost gap-2"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <Link
            to="/dashboard"
            className="btn btn-primary gap-2"
          >
            <Home size={17} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}