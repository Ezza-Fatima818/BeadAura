import React, { useState } from "react";
import Palette from "./Palette";
import DesignPage from "./DesignPage";
import PropertiesPanel from "../components/PropertiesPanel";
import "./DesignerPage.css";

function DesignerPage() {
  const [selectedString, setSelectedString] =
    useState(null);

  // ✅ FIX HERE
  const [beads, setBeads] = useState({});

  const [selectedBeadIndex, setSelectedBeadIndex] =
    useState(null);

  // ✅ safer version
  const selectedBead =
    selectedBeadIndex !== null
      ? beads[selectedBeadIndex]
      : null;
  return (
    <div className="designer-page">
      {/* Top Bar */}
      <div className="topbar">
        <h2>Bead Aura</h2>

      </div>

      {/* Main Layout */}
      <div className="designer-container">
        
        {/* LEFT - Palette */}
        <div className="sidebar">
          <Palette
            setSelectedString={setSelectedString}
          />
        </div>

        {/* CENTER - Canvas */}
        <div className="canvas-area">
          <DesignPage
            selectedString={selectedString}
            beads={beads}
            setBeads={setBeads}
            selectedBeadIndex={selectedBeadIndex}
            setSelectedBeadIndex={
              setSelectedBeadIndex
            }
          />
        </div>

        {/* RIGHT - Properties */}
        <div className="properties">
          <PropertiesPanel
            selectedBead={selectedBead}
            selectedBeadIndex={
              selectedBeadIndex
            }
            setBeads={setBeads}
          />
        </div>

      </div>
    </div>
  );
}

export default DesignerPage;