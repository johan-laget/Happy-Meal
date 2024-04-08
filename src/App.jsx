import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/Error";
import { FavoritePage } from "./pages/Favorite";
import { HomePage } from "./pages/Home";
import { RecipesPage } from "./pages/Recipes";
import { RootLayout } from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/favorite", element: <FavoritePage /> },
      { path: "/recipes", element: <RecipesPage /> },
    ],
  },
]);
export const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
