import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Outlet } from "react-router-dom";
import Page404 from "./pages/Page404.tsx"
import routes from "./routes/index.js"
import Home from "./pages/Home.tsx"
import Apartment from "./pages/Apartment.tsx"

function Layout() {
  return (
      <>
        <Outlet />
      </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout/>,
      errorElement: <Page404 />,
      children:[
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/apartment/:id',
          element: <Apartment />
        },
      ]
      
    }
  ])  
  return (
      <RouterProvider router={router} />
      
    );
}
// function App() {
//   // initialize a browser router
//   const router = createBrowserRouter([
//     {
//       children: routes,
//     },
//   ])
//   return (
//     <RouterProvider router={router} />
    
//   );
// }

export default App;

// const router = createBrowserRouter([
//   {
//     path: '*',  // This handles all paths
//     element: <Page404 />,  // Display Page404 for unmatched routes
//     children: routes,
//   },
// ]);