import React from "react";
import PathConstants from "./pathConstants.js";

const Home = React.lazy(() => import("../pages/Home.tsx"));
const Apartment = React.lazy(() => import("../pages/Apartment.tsx"));
const Page404 = React.lazy(() => import("../pages/Page404.tsx"));

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.APARTMENT, element: <Apartment /> },
];

export default routes;
