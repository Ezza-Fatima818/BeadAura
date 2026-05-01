export default function PropertiesPanel({
  selectedBead,
  selectedBeadIndex,
  setBeads
}) {
  if (!selectedBead) {
    return <p>Select a bead</p>;
  }

  const updateShade = (value) => {
    setBeads((prev) => ({
      ...prev,
      [selectedBeadIndex]: {
        ...prev[selectedBeadIndex],
        brightness: value
      }
    }));
  };
const updateColor = (hex) => {
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
  return (
    <div className="properties-panel">
      
      <h3>Customize Bead</h3>

      {/* 🎨 Color Picker */}
    <input
  type="color"
  onChange={(e) => updateColor(e.target.value)}
/>

      {/* 🌗 Shade Slider (ADD HERE) */}
      <label>Shade</label>
      <input
        type="range"
        min="0.5"
        max="1.5"
        step="0.1"
        value={selectedBead?.brightness || 1}
        onChange={(e) =>
          updateShade(e.target.value)
        }
      />

    </div>
  );
}