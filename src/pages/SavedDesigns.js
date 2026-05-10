
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./SavedDesigns.css";
import { useNavigate }
from "react-router-dom";


export default function SavedDesigns() {
  const [designs, setDesigns] = useState([]);
  const [modelUrl, setModelUrl]= useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) return;

    fetch(`http://localhost:5000/api/designs/saved-designs/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDesigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const generate3D = async (imageUrl) => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/generate-3d",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          imageUrl,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.code === 0) {

      const taskId = data.data.task_id;

      console.log(taskId);

      setTimeout(() => {

        checkStatus(taskId);

      }, 10000);

    } else {

      console.log(data.message);
    }

  } catch (error) {

    console.log(error);
  }
};

const checkStatus = async (taskId) => {

  try {

    const response = await fetch(
      `http://localhost:5000/api/check-3d/${taskId}`
    );

    const data = await response.json();

    console.log("STATUS:", data);

    const status = data.data.status;

    // still generating
    if (status === "running") {

      setTimeout(() => {

        checkStatus(taskId);

      }, 5000);
    }

    // completed
    if (status === "success") {

  const model =
    data.data.output.pbr_model;

  console.log(model);

  const proxiedUrl =
    `http://localhost:5000/api/proxy-model?url=${encodeURIComponent(model)}`;

  console.log(proxiedUrl);

  navigate(
    "/3d-view",
    {
      state: {
        modelUrl: proxiedUrl,
      },
    }
  );
    }

    // failed
    if (status === "failed") {

      console.log("Generation failed");
    }

  } catch (error) {

    console.log(error);
  }
};

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome ✨</h1>
          <p>Start designing something beautiful</p>
        </div>
      </div>

      {/* Section Title */}
      <h2 className="section-title">Your Designs</h2>

      {/* Loading */}
      {loading && (
        <p className="empty-text">Loading designs...</p>
      )}

      {/* Empty State */}
      {!loading && designs.length === 0 && (
        <p className="empty-text">No designs yet</p>
      )}

      {/* Grid */}
      <div className="designs-grid">
        {designs.map((design) => (
          <div className="design-card" key={design._id}>

            {/* Image */}
            {design.imageUrl && (
              <motion.img
  src={design.imageUrl}
  alt="design"
  className="design-image"

  animate={{
    y: [0, -8, 0],
    rotate: [-1, 1, -1],
  }}

  transition={{
    repeat: Infinity,
    duration: 4,
    ease: "easeInOut",
  }}

  whileHover={{
    scale: 1.05,
  }}
/>
            )}

            {/* Info */}
            <div className="design-info">

              <h3>
                {design.material || "Custom Design"}
              </h3>

              <p>
                {design.description}
              </p>

              <div className="design-meta">
                <span>{design.color}</span>
                <span>{design.occasion}</span>
              </div>

              {/* Status */}
              <div className={`status ${design.status?.toLowerCase()}`}>
                {design.status}
              </div>

<button
  onClick={() => generate3D(design.imageUrl)}
  className="generate-btn"
>
  Generate 3D
</button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}