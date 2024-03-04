import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.tsx'
const page404 = () => {

    return (
        <div>
            <h1>404 Page</h1>
            <span>You probably enterent wrong url, please go back to home page</span>
            <Route path="/" element={<Home />} />
        </div>
    );
};

export default page404;