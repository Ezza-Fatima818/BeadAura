import React, { useEffect, useState } from "react";

import { jewelryComponents }
from "./JewelryComponents/ComponentData";

import ComponentItem
from "./JewelryComponents/ComponentItem";

import "./Palette.css";

import Bead from "./Bead";
import { chains }  from "./chains/Data/ChainData";
import ChainItem from "./chains/Data/ChainItem";
import GoldChain from "./chains/Data/GoldChain";

export default function Palette({
  mode,
  tool,
  setTool,
  setColor,
  setSize,
  setSelectedString,
  selectedString,
  selectedCategory,
  addShape,
  handleDirectImageUpload,
  clearCanvas,
  undo,
  redo,
  undoCanvas,
  setSelectedBuilderBead
}) {

  const [beads, setBeads] =
    useState([]);

  const [showAllBeads,
    setShowAllBeads] =
    useState(false);

  const [beadCategory,
    setBeadCategory] =
    useState("All");

  const [selectedColor,
    setSelectedColor] =
    useState("white");

  const [selectedSize,
    setSelectedSize] =
    useState("medium");

  const [searchTerm,
  setSearchTerm] =
  useState("");

  const [activeTab,
  setActiveTab] =
  useState("beads");
  /* =================================
     SHAPES
  ================================= */

  const beadShapes = [
    { type: "circle", name: "Round" },
    { type: "oval", name: "Oval" },
    { type: "cube", name: "Cube" },
    { type: "teardrop", name: "Teardrop" },
    { type: "donut", name: "Rondelle" },
    { type: "coin", name: "Coin" },
    { type: "cylinder", name: "Cylinder" },
    { type: "octagon", name: "Octagon" },
    { type: "bicone", name: "Bicone" },
  ];

  /* =================================
     FETCH BEADS
  ================================= */

  useEffect(() => {

    fetch("http://localhost:5000/api/beads")
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setBeads(data);
        }

        else if (
          Array.isArray(data.beads)
        ) {
          setBeads(data.beads);
        }

        else {
          setBeads([]);
        }
      })

      .catch((err) =>
        console.log(err)
      );

  }, []);

  if (

  !selectedCategory &&

  mode !== "studio"

) return null;

  /* =================================
     TEMPLATES
  ================================= */

  const braceletTemplates = [
    {
      name: "Flower Bracelet",
      pattern: "flower",
    },

    {
      name: "Custom Design",
      pattern: "custom",
    },
  ];

  const necklaceTemplates = [
    {
      name: "Choker",
    },

    {
      name: "Pendant",
    },

    {
      name: "Layered",
    },
  ];

  const earringTemplates = [
    {
      name: "Hoop Earrings",
    },

    {
      name: "Drop Earrings",
    },

    {
      name: "Pearl Earrings",
    },
  ];

  /* =================================
     CATEGORIES
  ================================= */

  const categories = [
    "All",
    "Pearl",
    "Luxury",
    "Charms",
    "Jumprings",
    "Letter Beads",
  ];

  const alphabetBeads =

  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")

    .map((letter, index) => ({

      _id: `letter-${index}`,

      type: "letterBead",

      letter,

      name: letter,

      category: "Letter Beads",

      beadColor: "#f4f4f4",

      textColor: "#222"
    }));

  const allBeads = [
  ...beads,
  ...alphabetBeads
];

const filteredBeads =

  (

    beadCategory === "All" ||

    selectedCategory ===
      "bracelets"

      ? allBeads

      : allBeads.filter(
          (bead) =>

            bead.category ===
            beadCategory
        )

  ).filter((bead) =>

    bead.name
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );
  /* =================================
     STUDIO MODE
  ================================= */

  

  /* =================================
     BRACELET MODE
  ================================= */

 /* =================================
   STUDIO MODE
================================= */
if (

  mode === "studio" ||

  selectedCategory ===
    "bracelets"  ||
  selectedCategory ===
    "necklace" ||
  selectedCategory ===
    "earrings"

) {

  return (
    <div className="palette">

      <h2 className="palette-title">
        Design Studio
      </h2>

      {/* TOOLS */}

      <div className="section">

        <h4>Tools</h4>

        <div className="category-buttons">

          <button
            className={`category-btn ${
              tool === "pen"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setTool("pen")
            }
          >
            🖊 Pen
          </button>

          <button
            className={`category-btn ${
              tool === "eraser"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setTool("eraser")
            }
          >
            🧽 Eraser
          </button>

          <button
            className="category-btn"
            onClick={undoCanvas}
          >
            ↩ Undo
          </button>

          <button
            className="category-btn clear-btn"
            onClick={clearCanvas}
          >
            ✕ Clear
          </button>

        </div>

      </div>

      {/* SHAPES */}

      <div className="section">

        <h4>Shapes</h4>

        <div className="shape-grid">

          {beadShapes.map((shape) => (

            <div
              key={shape.type}
              className="shape-icon-card"
              onClick={() =>
                addShape(shape.type)
              }
            >

              <div
                className={`shape-icon ${shape.type}`}
              ></div>

              <span className="shape-tooltip">
                {shape.name}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* CATEGORIES */}

      <div className="section">

        <h4>Categories</h4>

        <div className="category-buttons">

          {categories.map((cat) => (

            <button
              key={cat}
              onClick={() =>
                setBeadCategory(cat)
              }
              className="category-btn"
            >
              {cat}
            </button>

          ))}

        </div>

      </div>

      {/* BEADS */}

      <div className="section">

        <h4>Select Beads</h4>

        <div className="palette-search">

          <input
            type="text"
            placeholder="Search beads..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

        </div>

        <div className="beadGrid">

          {(showAllBeads
            ? filteredBeads
            : filteredBeads.slice(0, 6)
          ).map((bead) => (

            <div
              className="beadItem"
              key={bead._id}
            >

              <div

  onClick={() => {

    if (
      selectedCategory ===
      "bracelets"
    ) {

      setSelectedBuilderBead(
        bead
      );
    }
  }}
>

  <Bead

    src={bead.image}

    type={bead.type}

    letter={bead.letter}

    beadColor={bead.beadColor}

    textColor={bead.textColor}

    selectedColor={
      selectedColor
    }

    selectedSize={
      selectedSize
    }
  />

</div>
              <span className="beadName">
                {bead.name}
              </span>

            </div>

          ))}

        </div>

        {filteredBeads.length > 6 && (

          <button
            className="view-more-btn"
            onClick={() =>
              setShowAllBeads(
                !showAllBeads
              )
            }
          >
            {showAllBeads
              ? "Show Less"
              : "+ View More"}
          </button>

        )}

      </div>

      {/* CHAINS */}

<div className="section">

  <h4>Chains</h4>

  <div className="beadGrid">

    {chains.map((item) => (

      <div
        className="beadItem"
        key={item.id}
      >

        <ChainItem item={item} />

      </div>

    ))}

  </div>

</div>

      {/* COMPONENTS */}

     

<div className="section">

  <h4>
    Components ({jewelryComponents.length})
  </h4>

  <div className="beadGrid">

    {jewelryComponents.map((item) => (

      <div
        className="beadItem"
        key={item.id}
      >

        <ComponentItem
          item={item}
        />

      </div>

    ))}

  </div>

</div>

      {/* UPLOAD */}

      <div className="section">

        <h4>Upload Charm</h4>

        <label
          style={{
            display: "block",
            background:
              "#EC5E95",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
            textAlign: "center",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >

          Upload Image

          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={
              handleDirectImageUpload
            }
          />

        </label>

        <p
          style={{
            fontSize: "12px",
            color: "gray",
            marginTop: "8px",
          }}
        >
          Upload image with removed background
        </p>

      </div>

    </div>
  );
}
  

  /* =================================
     NECKLACE MODE
  ================================= */

  if (selectedCategory === "necklace") {

    return (
      <div className="palette">

        <h2 className="palette-title">
          Necklace Builder
        </h2>

        <div className="section">

          <h4>Select Template</h4>

          <div className="category-buttons">

            {necklaceTemplates.map(
              (template) => (

                <button
                  key={template.name}

                  className="category-btn"

                  onClick={() =>
                    setSelectedString(
                      template
                    )
                  }
                >
                  {template.name}
                </button>

              )
            )}

          </div>

        </div>

      </div>
    );
  }

  /* =================================
     EARRING MODE
  ================================= */

  
  

  return null;
}