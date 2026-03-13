import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Overview from "./features/overview/Overview";
import Transactions from "./features/transactions/Transactions";
import RecurringBills from "./features/recurring-bills/RecurringBills";
import Pots from "./pages/Pots";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";

import Signup from "./pages/Signup";
import ErrorFallBack from "./ui/ErrorFallBack";
import { ToastProvider } from "./context/ToastContext";
import Budgets from "./pages/Budgets";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      throwOnError: true,
      retry: false,
    },
  },
});

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallBack />,
    children: [
      { index: true, element: <Navigate replace to="pots" /> },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "budgets",
        element: <Budgets />,
      },
      {
        path: "pots",
        element: <Pots />,
      },
      {
        path: "recurring-bills",
        element: <RecurringBills />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" /> */}
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
