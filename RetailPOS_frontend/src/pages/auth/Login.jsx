import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LogIn,
  ShieldCheck,
} from "lucide-react";

import { login } from "../../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname ||
    "/dashboard";

  const handleSubmit = (event) => {
    event.preventDefault();

    login();

    navigate(from, {
      replace: true,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-6">
      <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <ShieldCheck
              size={28}
              className="text-primary"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            RetailPOS
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            Sign in to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Username
            </label>

            <input
              type="text"
              defaultValue="admin"
              className="input input-bordered w-full"
              placeholder="Username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              defaultValue="admin"
              className="input input-bordered w-full"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full gap-2"
          >
            <LogIn size={17} />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}