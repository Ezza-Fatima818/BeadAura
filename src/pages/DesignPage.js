/* =================================
   IMPORTS
================================= */

import { useDrop } from "react-dnd";

import {
  useRef,
  useState,
  useEffect
} from "react";

import "./DesignPage.css";

import FlowerBracelet
from "../components/templates/FlowerBracelet";

import CustomBracelet
from "../components/templates/CustomBracelet";

import { useNavigate }
from "react-router-dom";

import TopBar
from "../components/TopBar";

import Palette
from "../components/Palette";

import PropertiesPanel
from "../components/PropertiesPanel";

import DesignStudioCanvas
from "../components/DesignStudioCanvas";

/* 🔥 HOOKS */

import useDuplicateElement
from "../hooks/useDuplicateElement";

import useDeleteElement
from "../hooks/useDeleteElement";

import useResizeElement
from "../hooks/useResizeElement";

import useRotateElement
from "../hooks/useRotateElement";

import html2canvas from "html2canvas";
import axios from "axios";

/* =================================
   MAIN COMPONENT
================================= */

export default function DesignPage({

  beads,
  setBeads,

}) {

  const ref = useRef(null);

  const navigate =
    useNavigate();

  /* =================================
     STATES
  ================================= */

  const [positions,
    setPositions] =
    useState([]);

  const [selectedCategory,
    setSelectedCategory] =
    useState(null);

  const [selectedString,
    setSelectedString] =
    useState(null);

  const [mode,
    setMode] =
    useState("bracelet");

  const [tool,
    setTool] =
    useState("select");

  const [color,
    setColor] =
    useState("#000000");

  const [size,
    setSize] =
    useState(5);

  const [shapes,
    setShapes] =
    useState([]);

  const [history,
    setHistory] =
    useState([]);

  const [redoStack,
    setRedoStack] =
    useState([]);

  const [selectedIds,
    setSelectedIds] =
    useState([]);

  const [placedImages,
    setPlacedImages] =
    useState([]);

  /* 🔥 PLACEHOLDERS */

  const [
    placeholders,
    setPlaceholders
  ] = useState([]);

  const [
    selectedPlaceholder,
    setSelectedPlaceholder
  ] = useState(null);

  /* =================================
     HOOKS
  ================================= */

  const { duplicateElement } =
    useDuplicateElement(
      placeholders,
      setPlaceholders
    );

  const { deleteElement } =
    useDeleteElement(
      placeholders,
      setPlaceholders
    );

  const { resizeElement } =
    useResizeElement(
      placeholders,
      setPlaceholders
    );

  const { rotateElement } =
    useRotateElement(
      placeholders,
      setPlaceholders
    );

  /* =================================
     IMAGE TRANSPARENCY
  ================================= */

  const checkTransparency =
    (file) => {

      return new Promise(
        (resolve) => {

          const img =
            new Image();

          const canvas =
            document.createElement(
              "canvas"
            );

          const ctx =
            canvas.getContext(
              "2d"
            );

          img.onload = () => {

            canvas.width =
              img.width;

            canvas.height =
              img.height;

            ctx.drawImage(
              img,
              0,
              0
            );

            const imageData =
              ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              );

            const pixels =
              imageData.data;

            let hasTransparency =
              false;

            for (
              let i = 3;
              i < pixels.length;
              i += 4
            ) {

              if (
                pixels[i] < 255
              ) {

                hasTransparency =
                  true;

                break;
              }
            }

            resolve(
              hasTransparency
            );
          };

          img.src =
            URL.createObjectURL(
              file
            );
        }
      );
    };

  /* =================================
     IMAGE UPLOAD
  ================================= */

  const handleDirectImageUpload =
    async (e) => {

      const files =
        Array.from(
          e.target.files
        );

      for (const file of files) {

        const hasTransparency =
          await checkTransparency(
            file
          );

        if (
          !hasTransparency
        ) {

          alert(
            "Please upload image with removed background."
          );

          continue;
        }

        const imageUrl =
          URL.createObjectURL(
            file
          );

        setPlacedImages(
          (prev) => [
            ...prev,
            {
              id:
                Date.now() +
                Math.random(),

              src:
                imageUrl,

              x: 300,
              y: 300,
            },
          ]
        );
      }
    };

  /* =================================
     SHAPES
  ================================= */

  const updateShapes =
    (newShapes) => {

      setHistory(
        (prev) => [
          ...prev,
          shapes
        ]
      );

      setShapes(newShapes);

      setRedoStack([]);
    };

  const deleteSelectedShape =
    () => {

      if (
        selectedIds.length === 0
      )
        return;

      updateShapes(
        shapes.filter(
          (s) =>
            !selectedIds.includes(
              s.id
            )
        )
      );

      setSelectedIds([]);
    };

  const undo = () => {

    if (
      history.length === 0
    )
      return;

    const previous =
      history[
        history.length - 1
      ];

    setRedoStack(
      (prev) => [
        shapes,
        ...prev,
      ]
    );

    setShapes(previous);

    setHistory((prev) =>
      prev.slice(0, -1)
    );
  };

  const redo = () => {

    if (
      redoStack.length === 0
    )
      return;

    const next =
      redoStack[0];

    setHistory((prev) => [
      ...prev,
      shapes,
    ]);

    setShapes(next);

    setRedoStack((prev) =>
      prev.slice(1)
    );
  };

  const addShape = (
    type
  ) => {

    const newShape = {
      id: Date.now(),

      type,

      x: 250,
      y: 250,

      size: 50,

      color: "#cccccc",

      beadImage: null
    };

    updateShapes([
      ...shapes,
      newShape
    ]);

    setTool("select");
  };

  /* =================================
     DROP
  ================================= */

  const [{ isOver }, drop] =
    useDrop(() => ({
      accept: "BEAD",

      collect: (
        monitor
      ) => ({
        isOver:
          !!monitor.isOver(),
      }),
    }));

  /* =================================
     SHORTCUTS
  ================================= */

  const undoRef =
    useRef(undo);

  const redoRef =
    useRef(redo);

  const deleteRef =
    useRef(deleteSelectedShape);

  useEffect(() => {

    const handleKeyDown =
      (e) => {

        const key =
          e.key.toLowerCase();

        if (
          e.ctrlKey &&
          key === "z" &&
          !e.shiftKey
        ) {

          e.preventDefault();

          undoRef.current();
        }

        if (
          (
            e.ctrlKey &&
            key === "y"
          ) ||

          (
            e.ctrlKey &&
            e.shiftKey &&
            key === "z"
          )
        ) {

          e.preventDefault();

          redoRef.current();
        }

        if (
          key === "delete"
        ) {

          e.preventDefault();

          deleteRef.current();
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

  }, []);

  useEffect(() => {

    undoRef.current =
      undo;

    redoRef.current =
      redo;

    deleteRef.current =
      deleteSelectedShape;

  }, [
    undo,
    redo,
    deleteSelectedShape
  ]);

  /* =================================
     BEAD SELECTION
  ================================= */

  const [
    selectedBeadIndex,
    setSelectedBeadIndex
  ] = useState(null);

  const selectedBead =
    selectedBeadIndex !==
    null
      ? beads[
          selectedBeadIndex
        ]
      : null;

  /* =================================
     UI
  ================================= */
const saveDesign = async () => {
  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user?._id) {
      alert("Please login first");
      return;
    }

    // capture ONLY design area
    const canvas = await html2canvas(
      ref.current,
      {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      }
    );

    canvas.toBlob(async (blob) => {

      const formData = new FormData();

      // image
      formData.append(
        "designImage",
        blob,
        "design.png"
      );

      // required fields
      formData.append(
        "userId",
        user._id
      );

      formData.append(
        "material",
        "Custom"
      );

      formData.append(
        "ageGroup",
        "18"
      );

      formData.append(
        "color",
        "Custom"
      );

      formData.append(
        "occasion",
        "Custom"
      );

      formData.append(
        "description",
        "Jewelry Design"
      );

      // optional future support
      formData.append(
        "designType",
        mode
      );

      const response =
        await axios.post(
          "http://localhost:5000/api/designs/save-design",
          formData
        );

      console.log(response.data);

      alert(
        "Design saved successfully!"
      );

    }, "image/png");

  } catch (error) {

    console.error(error);

    alert(
      "Failed to save design"
    );
  }
};
  return (

    
    <div className="canvas-area">

      {/* TOPBAR */}

      <TopBar
        setMode={setMode}

        setSelectedCategory={
          setSelectedCategory
        }

        navigate={
          navigate
        }
      />

      {/* MAIN */}

      <div className="main-layout">

        {/* LEFT */}

        {(selectedCategory ||
          mode ===
            "studio") && (

          <Palette
            mode={mode}

            selectedCategory={
              selectedCategory
            }

            setSelectedString={
              setSelectedString
            }

            selectedString={
              selectedString
            }

            setTool={
              setTool
            }

            setColor={
              setColor
            }

            setSize={
              setSize
            }

            addShape={
              addShape
            }

            handleDirectImageUpload={
              handleDirectImageUpload
            }
          />
        )}

        {/* CENTER */}

        <div
          ref={(node) => {

            ref.current =
              node;

            drop(node);
          }}

          className="bracelet-area"
        >

          {!selectedString &&
            mode !==
              "studio" && (

            <>
              <div className="canvas-text">
                <h1>
                  Design your own jewelry
                </h1>
              </div>

              <img
                src="/preview/bracelet-preview.png"

                className="bracelet-preview"

                alt="preview"
              />
            </>
          )}

          <div className="canvas-content">

            {mode ===
            "studio" ? (

              <DesignStudioCanvas
                tool={tool}

                color={color}

                size={size}

                shapes={shapes}

                setShapes={
                  setShapes
                }

                deleteSelectedShape={
                  deleteSelectedShape
                }

                selectedIds={
                  selectedIds
                }

                setSelectedIds={
                  setSelectedIds
                }

                placedImages={
                  placedImages
                }

                setPlacedImages={
                  setPlacedImages
                }
              />

            ) : (

              <>
                {selectedString?.name ===
                  "Flower Bracelet" && (

                  <FlowerBracelet
                    beads={beads}

                    setBeads={
                      setBeads
                    }

                    selectedBeadIndex={
                      selectedBeadIndex
                    }

                    setSelectedBeadIndex={
                      setSelectedBeadIndex
                    }

                    selectedPlaceholder={
                      selectedPlaceholder
                    }

                    setSelectedPlaceholder={
                      setSelectedPlaceholder
                    }

                    placeholders={
                      placeholders
                    }

                    setPlaceholders={
                      setPlaceholders
                    }
                  />
                )}

                {selectedString?.name ===
                  "Custom Design" && (

                  <CustomBracelet
                    beads={beads}

                    setBeads={
                      setBeads
                    }

                    positions={
                      positions
                    }

                    setPositions={
                      setPositions
                    }

                    selectedBeadIndex={
                      selectedBeadIndex
                    }

                    setSelectedBeadIndex={
                      setSelectedBeadIndex
                    }
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}

        <PropertiesPanel

          selectedBeadIndex={
            selectedBeadIndex
          }

          selectedBead={
            selectedBead
          }

          setBeads={
            setBeads
          }

          beads={beads}

          selectedIds={
            selectedIds
          }

          deleteSelectedShape={
            deleteSelectedShape
          }

          selectedPlaceholder={
            selectedPlaceholder
          }

          duplicateElement={
            duplicateElement
          }

          deleteElement={
            deleteElement
          }

          resizeElement={
            resizeElement
          }

          rotateElement={
            rotateElement
          }
        />

      </div>

      {/* SAVE */}

     {(
  mode === "studio" ||

  Object.keys(beads).length > 0 ||

  shapes.length > 0 ||

  placedImages.length > 0
) && (

        <div className="button-group">
          <button
            onClick={saveDesign}
          >
            Save Design
          </button>
        </div>
      )}

    </div>
  );
}