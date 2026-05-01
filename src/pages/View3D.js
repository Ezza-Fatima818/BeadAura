import React from "react";

export default function View3D() {
  const image = localStorage.getItem("previewImage");

  const savedBeads = JSON.parse(
    localStorage.getItem("braceletDesign")
  ) || [];

  console.log("Saved beads:", savedBeads);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>2D Design Preview</h2>

      {image && (
        <img
          src={image}
          alt="design"
          width="300"
        />
      )}

      <h2>Stored Bead Data</h2>

      <pre>
        {JSON.stringify(savedBeads, null, 2)}
      </pre>
    </div>
  );
}