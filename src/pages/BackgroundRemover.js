import React, { useState } from "react";
import { removeBackground } from "@imgly/background-removal";

const BackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setOriginalImage(URL.createObjectURL(file));
    setLoading(true);

    try {
      const blob = await removeBackground(file);

      const url = URL.createObjectURL(blob);

      setProcessedImage(url);
    } catch (error) {
      console.error("Background removal failed:", error);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>Background Remover</h1>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {loading && <p>Removing background...</p>}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        {originalImage && (
          <div>
            <h3>Original</h3>
            <img
              src={originalImage}
              alt="original"
              style={{
                width: "300px",
                borderRadius: "10px",
              }}
            />
          </div>
        )}

        {processedImage && (
          <div>
            <h3>Background Removed</h3>
            <img
              src={processedImage}
              alt="processed"
              style={{
                width: "300px",
                borderRadius: "10px",
                background:
                  "linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0,0 10px,10px -10px,-10px 0px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundRemover;