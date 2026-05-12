import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DesignerPage from "./pages/DesignerPage";
import View3D from "./pages/View3D";
import SavedDesigns from "./pages/SavedDesigns";
import AdminDashboard from "./pages/AdminDashboard"; 

import BackgroundRemover from "./pages/BackgroundRemover";

import ModelViewerPage from "./pages/ModelViewerPage";
import Dashboard from "./pages/Dashboard";
import ResetPassword
from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Jewelry Designer */}
        <Route path="/designer" element={<DesignerPage />} />

         <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/view3d" element={<View3D />} />
        <Route path="/saved-designs" element={<SavedDesigns />} />
           

            <Route path="/bg-remover" element={<BackgroundRemover />} />
       
  
  <Route
  path="/3d-view"
  element={<ModelViewerPage />}
/>

<Route
  path="/dashboard"
  element={<Dashboard />}
/>
<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

      </Routes>

    </Router>
  );
}

export default App;