import { useDrop } from "react-dnd";
import { useRef, useState ,useEffect} from "react";
import "./DesignPage.css";
import FlowerBracelet from "../components/templates/FlowerBracelet";
import CustomBracelet from "../components/templates/CustomBracelet";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Palette from "../components/Palette";
import PropertiesPanel from "../components/PropertiesPanel";
import DesignStudioCanvas from "../components/DesignStudioCanvas";

export default function DesignPage({
  
  
  beads,
  setBeads,
  
  
  
}) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedString, setSelectedString] = useState(null);
  const [mode, setMode] = useState("bracelet");
  const [tool, setTool] = useState("select");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);

  
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  

const updateShapes = (newShapes) => {
  setHistory((prev) => [...prev, shapes]); // save old state
  setShapes(newShapes);
  setRedoStack([]); // clear redo
};

const deleteSelectedShape = () => {
  if (selectedIds.length === 0) return;

  updateShapes((prev) =>
    prev.filter((s) => !selectedIds.includes(s.id))
  );

  setSelectedIds([]);
};

const undo = () => {
  if (history.length === 0) return;

  const previous = history[history.length - 1];

  setRedoStack((prev) => [shapes, ...prev]);
  setShapes(previous);
  setHistory((prev) => prev.slice(0, -1));
};

const redo = () => {
  if (redoStack.length === 0) return;

  const next = redoStack[0];

  setHistory((prev) => [...prev, shapes]);
  setShapes(next);
  setRedoStack((prev) => prev.slice(1));
};

const addShape = (type) => {
  const newShape = {
    id: Date.now(),
    type,
    x: 250,
    y: 250,
    size: 50,
    color: "#cccccc",
    beadImage: null
  };

  updateShapes([...shapes, newShape]); 
  setTool("select"); // ✅ FIX
};
   console.log("TOOL STATE:", tool);
  console.log(" MODE:", mode);

  

 

  // Drag and Drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BEAD",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // 🔥 CANVAS DRAW FUNCTION (UNCHANGED)
  const drawDesignToCanvas = async (beads) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = 600;
    const height = 400;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => resolve(img);
      });

    for (const bead of Object.values(beads)) {
  if (!bead || bead.x === undefined || bead.y === undefined) continue;

  const img = await loadImage(bead.src);

  const size =
    bead.size === "large" ? 90 :
    bead.size === "small" ? 45 : 65;

  // 🔥 ADD YOUR CODE HERE
  if (bead.type === "component" || bead.material) {
    ctx.filter = "none";
  } else {
    ctx.filter = `
      brightness(${bead.brightness || 1})
      sepia(1)
      saturate(5)
      hue-rotate(${bead.hue || 0}deg)
    `;
  }

  ctx.drawImage(
    img,
    bead.x - size / 2,
    bead.y - size / 2,
    size,
    size
  );

  ctx.filter = "none"; // reset
}


    

    return canvas.toDataURL("image/jpeg", 0.9);
  };

  // 🔥 SAVE DESIGN (UNCHANGED)
  const saveDesign = async () => {
    try {
      const designData = [];

      Object.values(beads).forEach((bead) => {
        if (bead && bead.x !== undefined && bead.y !== undefined) {
          designData.push({
            x: bead.x,
            y: bead.y,
            src: bead.src,
            size: bead.size,
            type: bead.type,
            hue: bead.hue,
            brightness: bead.brightness,
            material: bead.material || null 
          });
        }
      });

      if (designData.length === 0) {
        alert("No beads to save!");
        return;
      }

      const imageData = await drawDesignToCanvas(beads);

      const userId = localStorage.getItem("userId");

      await fetch("http://localhost:5000/api/save-design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageData,
          userId,
          material: "Custom",
          ageGroup: "18",
          color: "Custom",
          occasion: "None",
          description: "Canvas Design",
          status: "Pending"
        }),
      });

      alert("Design saved successfully!");

    } catch (error) {
      console.log(error);
    }
  };

console.log("selectedCategory:", selectedCategory);
console.log("mode === studio:", mode === "studio");
console.log("should show palette:", selectedCategory || mode === "studio");

const undoRef = useRef(undo);
const redoRef = useRef(redo);
const deleteRef = useRef(deleteSelectedShape);

//delete and undo buttons
useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();

    if (e.ctrlKey && key === "z" && !e.shiftKey) {
      e.preventDefault();
      undoRef.current();
    }

    if ((e.ctrlKey && key === "y") || (e.ctrlKey && e.shiftKey && key === "z")) {
      e.preventDefault();
      redoRef.current();
    }

    if (key === "delete") {
      e.preventDefault();
      deleteRef.current();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => window.removeEventListener("keydown", handleKeyDown);
}, []); // ✅ KEEP EMPTY
  
useEffect(() => {
  undoRef.current = undo;
  redoRef.current = redo;
  deleteRef.current = deleteSelectedShape;
}, [undo, redo, deleteSelectedShape]);

const [selectedBeadIndex, setSelectedBeadIndex] = useState(null);

const selectedBead =
  selectedBeadIndex !== null ? beads[selectedBeadIndex] : null;


console.log("SELECTED IDS:", selectedIds);
return (
  <div className="canvas-area">

    {/* TopBar */}
    <TopBar setMode={setMode} navigate={navigate} />

    {/* 🔥 MAIN LAYOUT */}
    <div className="main-layout">

      {/* LEFT: Palette */}
      {(selectedCategory || mode === "studio") && (
        <>
          {console.log("✅ Palette is rendering")}
          <Palette
            mode={mode}
            selectedCategory={selectedCategory}
            setSelectedString={setSelectedString}
            selectedString={selectedString}
            setTool={setTool}
            setColor={setColor}
            setSize={setSize}
            addShape={addShape}
          />
        </>
      )}

      {/* RIGHT: Canvas */}
      <div
        ref={(node) => {
          ref.current = node;
          drop(node);
        }}
        className="bracelet-area"
      >

        {/* Default empty */}
        {!selectedString && mode !== "studio" && (
          <>
            <div className="canvas-text">
              <h1>Design your own jewelry</h1>
            </div>

            <img
              src="/preview/bracelet-preview.png"
              className="bracelet-preview"
              alt="preview"
            />
          </>
        )}

        {/* 🔥 CANVAS CONTENT */}
        <div className="canvas-content">

          {mode === "studio" ? (
            <DesignStudioCanvas
              tool={tool}
              color={color}
              size={size}
              shapes={shapes}
              setShapes={setShapes}
              deleteSelectedShape={deleteSelectedShape}
              selectedIds={selectedIds}       // ✅
              setSelectedIds={setSelectedIds}  

            />
          ) : (
            <>
              {selectedString?.name === "Flower Bracelet" && (
                <FlowerBracelet
                  beads={beads}
                  setBeads={setBeads}
                  selectedBeadIndex={selectedBeadIndex}
                  setSelectedBeadIndex={setSelectedBeadIndex}
                />
              )}

              {selectedString?.name === "Custom Design" && (
                <CustomBracelet
                  beads={beads}
                  setBeads={setBeads}
                  positions={positions}
                  setPositions={setPositions}
                  selectedBeadIndex={selectedBeadIndex}
                  setSelectedBeadIndex={setSelectedBeadIndex}
                />
              )}
            </>
          )}

        </div>

      </div> {/* ✅ FIX: CLOSE bracelet-area */}

      {/* Properties Panel */}
      
        <PropertiesPanel
          selectedBeadIndex={selectedBeadIndex}
          selectedBead={beads[selectedBeadIndex]}
          setBeads={setBeads}
          beads={beads}
          selectedIds={selectedIds}
          deleteSelectedShape={deleteSelectedShape}
        />
      

    </div> {/* ✅ CLOSE main-layout */}

    {/* 🔥 ACTION BUTTON */}
    {Object.keys(beads).length > 0 && (
      <div className="button-group">
        <button onClick={saveDesign}>Save Design</button>
      </div>
    )}

  </div>
);
}