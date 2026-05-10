import { useLocation }
from "react-router-dom";



export default function ModelViewerPage() {

  const location = useLocation();

  const modelUrl =
    location.state?.modelUrl;
    console.log(modelUrl);

  return (

    <div
      style={{
        textAlign: "center",
        padding: "30px",
      }}
    >

      <h1>3D Bracelet Preview</h1>

      {modelUrl ? (

        <model-viewer
          src={modelUrl}
          auto-rotate
          camera-controls
          shadow-intensity="1"

          style={{
            width: "700px",
            height: "700px",
            margin: "auto",
          }}
        />

      ) : (

        <p>No model found</p>

      )}

    </div>
  );
}