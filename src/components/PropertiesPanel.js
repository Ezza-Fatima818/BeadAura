export default function PropertiesPanel({
  selectedBead,
  selectedBeadIndex,
  setBeads,
  selectedIds,
  deleteSelectedShape
}) {

  // 🔥 UPDATE FUNCTIONS (same as yours)
  const updateSize = (size) => {
    if (selectedBeadIndex === null) return;

    setBeads((prev) => ({
      ...prev,
      [selectedBeadIndex]: {
        ...prev[selectedBeadIndex],
        size
      }
    }));
  };

  const updateShade = (value) => {
    if (selectedBeadIndex === null) return;

    setBeads((prev) => ({
      ...prev,
      [selectedBeadIndex]: {
        ...prev[selectedBeadIndex],
        brightness: value
      }
    }));
  };

  const updateColor = (hex) => {
    if (selectedBeadIndex === null) return;

    const hue = getHueFromHex(hex);

    setBeads((prev) => ({
      ...prev,
      [selectedBeadIndex]: {
        ...prev[selectedBeadIndex],
        hue
      }
    }));
  };

  function getHueFromHex(hex) {
    const r = parseInt(hex.substr(1, 2), 16) / 255;
    const g = parseInt(hex.substr(3, 2), 16) / 255;
    const b = parseInt(hex.substr(5, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;

    if (max === min) return 0;

    if (max === r) {
      h = (g - b) / (max - min);
    } else if (max === g) {
      h = 2 + (b - r) / (max - min);
    } else {
      h = 4 + (r - g) / (max - min);
    }

    h = Math.round(h * 60);
    return h < 0 ? h + 360 : h;
  }

  // 🔥 ALWAYS RENDER PANEL (IMPORTANT)
  return (
    <div className="properties-panel">

      {/* 🟡 EMPTY STATE */}
      {!selectedBead && (!selectedIds || selectedIds.length === 0) && (
        <p>Select something</p>
      )}

      {/* 🔷 BEAD CONTROLS */}
      {selectedBead && (
        <>
          <h3>Customize Bead</h3>

          <input
            type="color"
            onChange={(e) => updateColor(e.target.value)}
          />

          <label>Shade</label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={selectedBead?.brightness || 1}
            onChange={(e) => updateShade(e.target.value)}
          />

          <h4>Size</h4>

          <div style={{ display: "flex", gap: "10px" }}>
            {["small", "medium", "large"].map((size) => (
              <button
                key={size}
                onClick={() => updateSize(size)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  background:
                    selectedBead?.size === size ? "#8e44ad" : "white",
                  color:
                    selectedBead?.size === size ? "white" : "black",
                  cursor: "pointer"
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </>
      )}

      {/* 🔥 SHAPE ACTIONS */}
      {selectedIds && selectedIds.length > 0 && (
        <>
          <h4 style={{ marginTop: "20px" }}>Shape Actions</h4>

          <p>{selectedIds.length} shape(s) selected</p>

          <button
            onClick={deleteSelectedShape}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            🗑 Delete Selected
          </button>
        </>
      )}

    </div>
  );
}