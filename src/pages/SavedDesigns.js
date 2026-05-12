
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./SavedDesigns.css";
import { useNavigate }
from "react-router-dom";
import Sidebar from "../components/Sidebar";


export default function SavedDesigns() {
  const [designs, setDesigns] = useState([]);
  const [modelUrl, setModelUrl]= useState("");
  const [loading, setLoading] = useState(true);
  const [previewImage,setPreviewImage] =useState(null);
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

  <div className="dashboard">

    {/* SIDEBAR */}

    <Sidebar active="saved" />

    {/* MAIN */}

    <div className="dashboard-content">

      {/* TOP */}

      <div className="top-section">

        <div>

          <h1>
            Saved Designs 
          </h1>

          <p>
            Your custom jewelry collection
          </p>

        </div>

      </div>

      {/* LOADING */}

      {loading && (

        <p className="empty-text">
          Loading designs...
        </p>

      )}

      {/* EMPTY */}

      {!loading &&
        designs.length === 0 && (

        <div className="empty-state">

          <h3>
            No saved designs yet
          </h3>

          <p>
            Start designing your first
            jewelry piece.
          </p>

          <button
            onClick={() =>
              navigate("/designer")
            }
          >
            Start Designing
          </button>

        </div>

      )}

      {/* GRID */}

      <div className="designs-grid">

        {designs.map((design) => (

          <motion.div
            className="design-card"

            key={design._id}

            whileHover={{
              y: -8,
            }}
          >

            {/* IMAGE */}

            {design.imageUrl && (

              <motion.img

                src={design.imageUrl}

                alt="design"

                className="design-image"

                animate={{
                  y: [0, -5, 0],
                }}

                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />

            )}

            {/* INFO */}

            <div className="design-info">

              <div className="design-top">

                <h3>
                  {design.material ||
                    "Custom Design"}
                </h3>

                <div
                  className={`status ${
                    design.status?.toLowerCase()
                  }`}
                >
                  {design.status}
                </div>

              </div>

              <p className="design-description">
                {design.description}
              </p>

              <div className="design-meta">

                <span>
                  {design.color}
                </span>

                <span>
                  {design.occasion}
                </span>

              </div>

              {/* ACTIONS */}

              <div className="design-actions">

  <button
    className="preview-btn"

    onClick={() =>
      setPreviewImage(
        design.imageUrl
      )
    }
  >
    Preview
  </button>

  <button
    className="generate-btn"

    onClick={() =>
      generate3D(
        design.imageUrl
      )
    }
  >
    Generate 3D
  </button>

</div>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

    {/* PREVIEW MODAL */}

{previewImage && (

  <div
    className="preview-modal"

    onClick={() =>
      setPreviewImage(null)
    }
  >

    <div
      className="preview-content"

      onClick={(e) =>
        e.stopPropagation()
      }
    >

      <img
        src={previewImage}

        alt="preview"
      />

      <button
        className="close-preview"

        onClick={() =>
          setPreviewImage(null)
        }
      >
        ✕
      </button>

    </div>

  </div>

)}

  </div>

);
}