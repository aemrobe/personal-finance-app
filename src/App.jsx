import { useState } from "react";
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
import Budgets from "./features/budgets/Budgets";
import RecurringBills from "./features/recurring-bills/RecurringBills";
import Pots from "./features/Pots/Pots";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";

import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
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
    children: [
      { index: true, element: <Navigate replace to="overview" /> },
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
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          duration: 3000,
          ariaProps: {
            role: "status",
            "aria-live": "polite",
            "aria-relevant": "all",
          },

          style: {
            fontSize: "1rem",
            maxWidth: "21.25rem",
            width: "90%",
            padding: "1rem 1.5rem",
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
