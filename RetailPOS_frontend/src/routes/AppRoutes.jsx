import {
  lazy,
  Suspense,
} from "react";

import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import RouteLoader from "../components/common/RouteLoader";

/* =====================================================
   AUTH
===================================================== */

const Login = lazy(() =>
  import("../pages/auth/Login")
);

/* =====================================================
   DASHBOARD
===================================================== */

const Dashboard = lazy(() =>
  import("../pages/dashboard/Dashboard")
);

/* =====================================================
   MASTERS OVERVIEW
===================================================== */

const MastersOverview = lazy(() =>
  import("../pages/master/MastersOverview")
);

/* =====================================================
   CORE MASTERS
===================================================== */

const StatePage = lazy(() =>
  import(
    "../features/masters/core/state/StatePage"
  )
);

const CityPage = lazy(() =>
  import(
    "../features/masters/core/city/CityPage"
  )
);

const BranchPage = lazy(() =>
  import(
    "../features/masters/core/branch/BranchPage"
  )
);

const TaxPage = lazy(() =>
  import(
    "../features/masters/core/tax/TaxPage"
  )
);

const FinancialYearPage = lazy(() =>
  import(
    "../features/masters/core/financial-year/FinancialYearPage"
  )
);

/* =====================================================
   PRODUCT MASTERS
===================================================== */

const GroupPage = lazy(() =>
  import(
    "../features/masters/products/group/GroupPage"
  )
);

const CategoryPage = lazy(() =>
  import(
    "../features/masters/products/category/CategoryPage"
  )
);

const BrandPage = lazy(() =>
  import(
    "../features/masters/products/brand/BrandPage"
  )
);

const MarkPage = lazy(() =>
  import(
    "../features/masters/products/mark/MarkPage"
  )
);

const AttributePage = lazy(() =>
  import(
    "../features/masters/products/attribute/AttributePage"
  )
);

const SlabManagerPage = lazy(() =>
  import(
    "../features/masters/products/slab-manager/SlabManagerPage"
  )
);

const ProductPage = lazy(() =>
  import(
    "../features/masters/products/product/ProductPage"
  )
);

const ProductEntryPage = lazy(() =>
  import(
    "../features/masters/products/product-entry/ProductEntryPage"
  )
);

/* =====================================================
   PARTY MASTERS
===================================================== */

const CustomerPage = lazy(() =>
  import(
    "../features/masters/parties/customer/CustomerPage"
  )
);

const SupplierPage = lazy(() =>
  import(
    "../features/masters/parties/supplier/SupplierPage"
  )
);

const AgentPage = lazy(() =>
  import(
    "../features/masters/parties/agent/AgentPage"
  )
);

const PurchaserPage = lazy(() =>
  import(
    "../features/masters/parties/purchaser/PurchaserPage"
  )
);

const SalespersonPage = lazy(() =>
  import(
    "../features/masters/parties/salesperson/SalespersonPage"
  )
);

/* =====================================================
   MAIN APPLICATION
===================================================== */

const PointOfSale = lazy(() =>
  import(
    "../pages/pos/PointOfSale"
  )
);

const Inventory = lazy(() =>
  import(
    "../pages/inventory/Inventory"
  )
);

const Reports = lazy(() =>
  import(
    "../pages/reports/Reports"
  )
);

const Settings = lazy(() =>
  import(
    "../pages/settings/Settings"
  )
);

/* =====================================================
   ERROR
===================================================== */

const NotFound = lazy(() =>
  import("../pages/errors/NotFound")
);

/* =====================================================
   ROUTES
===================================================== */

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>

        {/* =================================================
            PUBLIC
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* =================================================
            PROTECTED APPLICATION
        ================================================= */}

        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>

            {/* =================================================
                DEFAULT
            ================================================= */}

            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            {/* =================================================
                DASHBOARD
            ================================================= */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* =================================================
                OPERATIONS
            ================================================= */}

            <Route
              path="/pos"
              element={<PointOfSale />}
            />

            <Route
              path="/inventory"
              element={<Inventory />}
            />

            {/* =================================================
                MASTERS OVERVIEW
            ================================================= */}

            <Route
              path="/masters"
              element={<MastersOverview />}
            />

            {/* =================================================
                CORE MASTERS
            ================================================= */}

            <Route
              path="/masters/state"
              element={<StatePage />}
            />

            <Route
              path="/masters/city"
              element={<CityPage />}
            />

            <Route
              path="/masters/branch"
              element={<BranchPage />}
            />

            <Route
              path="/masters/tax"
              element={<TaxPage />}
            />

            <Route
              path="/masters/financial-year"
              element={<FinancialYearPage />}
            />

            {/* =================================================
                PRODUCT MASTERS
            ================================================= */}

            <Route
              path="/masters/group"
              element={<GroupPage />}
            />

            <Route
              path="/masters/category"
              element={<CategoryPage />}
            />

            <Route
              path="/masters/brand"
              element={<BrandPage />}
            />

            <Route
              path="/masters/mark"
              element={<MarkPage />}
            />

            <Route
              path="/masters/attribute"
              element={<AttributePage />}
            />

            <Route
              path="/masters/slab-manager"
              element={<SlabManagerPage />}
            />

            <Route
              path="/masters/product"
              element={<ProductPage />}
            />

            <Route
              path="/masters/product-entry"
              element={<ProductEntryPage />}
            />

            {/* =================================================
                PARTY MASTERS
            ================================================= */}

            <Route
              path="/masters/customer"
              element={<CustomerPage />}
            />

            <Route
              path="/masters/supplier"
              element={<SupplierPage />}
            />

            <Route
              path="/masters/agent"
              element={<AgentPage />}
            />

            <Route
              path="/masters/purchaser"
              element={<PurchaserPage />}
            />

            <Route
              path="/masters/salesperson"
              element={<SalespersonPage />}
            />

            {/* =================================================
                REPORTS
            ================================================= */}

            <Route
              path="/reports"
              element={<Reports />}
            />

            {/* =================================================
                SETTINGS
            ================================================= */}

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>
        </Route>

        {/* =================================================
            404
        ================================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </Suspense>
  );
}