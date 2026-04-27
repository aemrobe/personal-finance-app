import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Pots from "./pages/Pots";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import RecurringBills from "./pages/RecurringBills";
import Budgets from "./pages/Budgets";
import Signup from "./pages/Signup";

import AppLayout from "./ui/AppLayout";
import ErrorFallBack from "./ui/ErrorFallBack";
import ProtectedRoute from "./ui/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext";

import { NETWORKERROREVENT } from "./utils/constants";
import Overview from "./pages/Overview";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error.message === "Failed to fetch" || !window.navigator.onLine) {
        window.dispatchEvent(new CustomEvent(NETWORKERROREVENT));
        return;
      }
    },
  }),
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.message === "Failed to fetch" || !window.navigator.onLine) {
        window.dispatchEvent(new CustomEvent(NETWORKERROREVENT));
        return;
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 0,
      networkMode: "always",
    },
    mutations: {
      retry: 0,
      networkMode: "always",
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
