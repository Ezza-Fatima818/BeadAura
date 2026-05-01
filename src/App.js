import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DesignerPage from "./pages/DesignerPage";
import View3D from "./pages/View3D";
import SavedDesigns from "./pages/SavedDesigns";

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
        <Route path="/view3d" element={<View3D />} />
        <Route path="/saved-designs" element={<SavedDesigns />} />
      </Routes>
    </Router>
  );
}

export default App;