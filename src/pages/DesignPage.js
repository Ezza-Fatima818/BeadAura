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

import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

import BraceletBuilder
from "../components/BraceletBuilder";
import EarringBuilder
from "../components/EarringBuilder";
import BraceletTemplates
from "../components/templates/BraceletTemplates";
import PatternBuilder
from "../components/PatternBuilder";

import EarringTemplates
from "../components/templates/EarringTemplates";

import NecklaceTemplates
from "../components/templates/NecklaceTemplates";

import NecklaceBuilder
from "../components/NecklaceBuilder";



/* =================================
   MAIN COMPONENT
================================= */

export default function DesignPage({

  beads,
  setBeads,

}) {

  const ref = useRef(null);
  const canvasUndoRef =
  useRef(null);

  const navigate =useNavigate();
  const location = useLocation();

  /* =================================
     STATES
  ================================= */

  const [positions,
    setPositions] =
    useState([]);

  const [
  selectedCategory,
  setSelectedCategory
] = useState(
  location.state?.category ||
  null
);

  const [selectedString,
    setSelectedString] =
    useState(null);
  
  const [mode, setMode] =useState(
    location.state?.mode ||
    "template"
  );

  

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

    const [selectedBuilderBead,
  setSelectedBuilderBead] =
  useState(null);

    const [

  braceletSlots,

  setBraceletSlots

] = useState(
  Array(25).fill(null)
);

const [

  selectedBraceletIndex,

  setSelectedBraceletIndex

] = useState(null);

//earring states
const [

  earringSlots,

  setEarringSlots

] = useState(
  Array(5).fill(null)
);

const [

  selectedEarringIndex,

  setSelectedEarringIndex

] = useState(null);

const [

  selectedTemplate,

  setSelectedTemplate

] = useState(null);

const selectedEarringBead =

  selectedEarringIndex !==
  null

    ? earringSlots[
        selectedEarringIndex
      ]

    : null;


  
const updateColorRef =
  useRef(null);


//selectedbracelet bead
const selectedBraceletBead =

  selectedBraceletIndex !==
  null

    ? braceletSlots[
        selectedBraceletIndex
      ] || {}

    : null;

const changeBuilderBeadColor =
(
  color
) => {

  /* STUDIO BEADS */

  if (
  selectedBeadIndex !==
  null
) {

  updateColorRef.current?.(
    color
  );

  return;
}

  /* BRACELET */

  if (

    selectedCategory ===
    "bracelets" &&

    selectedBraceletIndex !==
    null

  ) {

    const updated = [
      ...braceletSlots
    ];

    updated[
      selectedBraceletIndex
    ] = {

      ...updated[
        selectedBraceletIndex
      ],

      color,
    };

    setBraceletSlots(
      updated
    );

    return;
  }

  /* EARRINGS */

  if (

    selectedCategory ===
    "earrings" &&

    selectedEarringIndex !==
    null

  ) {

    const updated = [
      ...earringSlots
    ];

    updated[
      selectedEarringIndex
    ] = {

      ...updated[
        selectedEarringIndex
      ],

      color,
    };

    setEarringSlots(
      updated
    );
  }

};

//delete bracelet

const deleteBraceletBead =
() => {

  if (
    selectedBraceletIndex ===
    null
  ) return;

  const updated =
    [...braceletSlots];

  updated[
    selectedBraceletIndex
  ] = null;

  setBraceletSlots(updated);
};



const fillBracelet = () => {

  if (
    !selectedBuilderBead
  ) return;

  const updated =

    braceletSlots.map(
      () => ({

        ...selectedBuilderBead,

        size: 36
      })
    );

  setBraceletSlots(updated);
};

const resizeBraceletBead =
(size) => {

  if (
    selectedBraceletIndex ===
    null
  ) return;

  const updated =
    [...braceletSlots];

  updated[
    selectedBraceletIndex
  ] = {

    ...updated[
      selectedBraceletIndex
    ],

    size:
      Number(size)
  };

  setBraceletSlots(updated);
};
    
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

  setMode("studio");

  const files =
    Array.from(e.target.files);

  for (const file of files) {

    // transparency check
    const hasTransparency =
      await checkTransparency(file);

    if (!hasTransparency) {

      alert(
        "Please upload a transparent PNG image."
      );

      continue;
    }

    const imageUrl =
      URL.createObjectURL(file);

    const newImage = {

      id:
        Date.now() + Math.random(),

      src: imageUrl,

      x: 200,
      y: 200,

      width: 120,
      height: 120,

      rotation: 0,
    };

    setPlacedImages((prev) => [
      ...prev,
      newImage,
    ]);
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

      color: "#7a34a3",

      beadImage: null
    };

    updateShapes([
      ...shapes,
      newShape
    ]);

    setTool("select");
  };
  //add shapecolor

const changeShapeColor = (
  color
) => {

  setShapes((prev) =>
    prev.map((shape) =>

      selectedIds.includes(
        shape.id
      )

        ? {
            ...shape,
            color,
          }

        : shape
    )
  );
};
   

 //load template
const loadTemplate =
(
  template
) => {

  console.log(template);

 setMode("builder");

setTimeout(() => {

  setSelectedTemplate(
    template
  );

}, 0);
};

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

      JSON.stringify({
    beads,
  })


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

const clearCanvas = () => {

  

  setShapes([]);

  setPlacedImages([]);

  setBeads({});

  setPositions([]);

  setPlaceholders([]);

  setSelectedIds([]);

  setSelectedPlaceholder(null);

  setSelectedBeadIndex(null);

  setSelectedString(null);

  // FORCE REMOUNT
  setCanvasKey(
    prev => prev + 1
  );



};
const [canvasKey,
  setCanvasKey] =
  useState(0);
 return (

  <div className="studio-page">

    {/* SIDEBAR */}

    <Sidebar 
    active="designer" 
    
    setMode={setMode}
    setSelectedCategory={setSelectedCategory}/>

    {/* RIGHT SIDE */}

    <div className="canvas-area">

      

      

      {/* MAIN */}

      <div className="main-layout">

        {/* LEFT PANEL */}

        {(selectedCategory ||
          mode === "studio") && (

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
            tool={tool}

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
              handleDirectImageUpload}
            undo={undo}
            redo={redo}
            clearCanvas={clearCanvas}

            undoCanvas={() =>
  canvasUndoRef.current?.()
}

   setSelectedBuilderBead={
  setSelectedBuilderBead
}
          />
        )}

        {/* CENTER CANVAS */}

       <div
  ref={ref}
  className="bracelet-area"
>

          {!selectedString &&
  mode !== "studio" &&
  selectedCategory !== "bracelets" && (

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
{/* =================================
   TEMPLATE PAGES
================================= */}

{mode === "template" &&

selectedCategory ===
"bracelets" && (

  <BraceletTemplates

    loadTemplate={
      loadTemplate
    }

  />
)}

{mode === "template" &&

selectedCategory ===
"earrings" && (

  <EarringTemplates

    loadTemplate={
      loadTemplate
    }

  />
)}

{mode === "template" &&

selectedCategory ===
"necklace" && (

  <NecklaceTemplates

    loadTemplate={
      loadTemplate
    }

  />
)}

{/* =================================
   BUILDERS
================================= */}

{mode === "template" &&

selectedCategory ===
"bracelets" ? (

  selectedTemplate?.id ===
  "ladder-pattern" ? (

    <PatternBuilder

      template={
        selectedTemplate.pattern
      }

      slots={
        braceletSlots
      }

      setSlots={
        setBraceletSlots
      }

      selectedIndex={
        selectedBraceletIndex
      }

      setSelectedIndex={
        setSelectedBraceletIndex
      }

      selectedBuilderBead={
        selectedBuilderBead
      }

    />

  ) : (

    <BraceletBuilder

      template={






        selectedTemplate
      }

      slots={
        braceletSlots
      }

      setSlots={
        setBraceletSlots
      }

      selectedIndex={
        selectedBraceletIndex
      }

      setSelectedIndex={
        setSelectedBraceletIndex
      }

      selectedBuilderBead={
        selectedBuilderBead
      }

    />

  )

) : mode === "template" &&

selectedCategory ===
"earrings" ? (

  <EarringBuilder

    template={
      selectedTemplate
    }

    slots={
      earringSlots
    }

    setSlots={
      setEarringSlots
    }

    selectedIndex={
      selectedEarringIndex
    }

    setSelectedIndex={
      setSelectedEarringIndex
    }

    selectedBuilderBead={
      selectedBuilderBead
    }

  />

) : mode === "template" &&

selectedCategory ===
"necklace" ? (

  <NecklaceBuilder />

) : mode === "studio" ? (

  <DesignStudioCanvas
  updateColorRef={
  updateColorRef
}

    tool={tool}

    color={color}

    size={size}

    shapes={shapes}

    setShapes={setShapes}

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

    key={canvasKey}

    updateShapes={
      updateShapes
    }

    canvasUndoRef={
      canvasUndoRef
    }
    selectedBeadIndex={
  selectedBeadIndex
}

setSelectedBeadIndex={
  setSelectedBeadIndex
}

  />

) : null}
</div>

          

        </div>

        {/* RIGHT PANEL */}

        <PropertiesPanel



  

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

  selectedBraceletBead={
    selectedBraceletBead
  }

  resizeBraceletBead={
    resizeBraceletBead
  }

  deleteBraceletBead={
    deleteBraceletBead
  }

  fillBracelet={
    fillBracelet
  }
changeShapeColor={
  changeShapeColor
}
selectedBuilderBead={

  selectedCategory ===
  "bracelets"

    ? selectedBraceletBead

    : selectedCategory ===
      "earrings"

    ? selectedEarringBead

    : selectedBeadIndex
}

changeBuilderBeadColor={
  changeBuilderBeadColor
}
/>

      </div>

      {/* SAVE BUTTON */}

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

  </div>
);

}