import { useState } from "react";
import {
  Building2,
  Database,
  Bell,
  Save,
  ShieldCheck,
  Settings as SettingsIcon,
} from "lucide-react";

export default function Settings() {
  const [companyName, setCompanyName] =
    useState("RetailPOS");

  const [email, setEmail] =
    useState("admin@retailpos.com");

  const [notifications, setNotifications] =
    useState(true);

  const [lowStockAlerts, setLowStockAlerts] =
    useState(true);

  const handleSave = () => {
    alert(
      "Settings saved successfully."
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Settings
        </h1>

        <p className="mt-1 text-sm text-base-content/60">
          Configure application, company and notification settings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-3">
          {[
            ["Company", Building2],
            ["Notifications", Bell],
            ["Database", Database],
            ["Security", ShieldCheck],
          ].map(
            ([label, Icon], index) => (
              <button
                key={label}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm ${
                  index === 0
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-base-content/60 hover:bg-base-200"
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            )
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Building2
                  size={19}
                  className="text-primary"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Company Settings
                </h2>

                <p className="text-xs text-base-content/50">
                  Basic company information
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Company Name
                </label>

                <input
                  value={companyName}
                  onChange={(event) =>
                    setCompanyName(
                      event.target.value
                    )
                  }
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Admin Email
                </label>

                <input
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Bell
                size={19}
                className="text-primary"
              />

              <div>
                <h2 className="font-semibold">
                  Notifications
                </h2>

                <p className="text-xs text-base-content/50">
                  Control application notifications
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-base-300 p-4">
                <div>
                  <p className="text-sm font-medium">
                    Application Notifications
                  </p>

                  <p className="mt-1 text-xs text-base-content/50">
                    Receive important system notifications.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(event) =>
                    setNotifications(
                      event.target.checked
                    )
                  }
                  className="toggle toggle-primary"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-base-300 p-4">
                <div>
                  <p className="text-sm font-medium">
                    Low Stock Alerts
                  </p>

                  <p className="mt-1 text-xs text-base-content/50">
                    Notify when stock falls below reorder level.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={lowStockAlerts}
                  onChange={(event) =>
                    setLowStockAlerts(
                      event.target.checked
                    )
                  }
                  className="toggle toggle-primary"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="btn btn-primary gap-2"
            >
              <Save size={17} />
              Save Settings
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex items-center gap-3">
          <SettingsIcon
            size={18}
            className="text-primary"
          />

          <span className="text-sm text-base-content/60">
            Backend, SQL Server and authentication configuration will be connected in the backend phase.
          </span>
        </div>
      </div>
    </div>
  );
}