// src/App.tsx
import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { store } from "./store";
import { router } from "./router";
import LoadingFallback from "./components/LoadingFallback";

export default function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}