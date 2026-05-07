import React, { useEffect, useState } from "react";
import { jewelryComponents } from "./JewelryComponents/ComponentData";
import ComponentItem from "./JewelryComponents/ComponentItem";
import "./Palette.css";
import Bead from "./Bead";

export default function Palette({
  mode,
  setTool,
  setColor,
  setSize,
  setSelectedString,
  selectedString,
  selectedCategory,
  addShape,
}) {
  console.log("setTool:", setTool);

  const [beads, setBeads] = useState([]);
  const [showAllBeads, setShowAllBeads] =
    useState(false);

  const [beadCategory, setBeadCategory] =
    useState("All");

  const [selectedColor, setSelectedColor] =
    useState("white");

  const [selectedSize, setSelectedSize] =
    useState("medium");

  const beadShapes = [
    { type: "circle", name: "Round" },
    { type: "oval", name: "Oval" },
    { type: "cube", name: "Cube" },
    {
      type: "teardrop",
      name: "Teardrop",
    },
    { type: "donut", name: "Rondelle" },
    { type: "coin", name: "Coin" },
    {
      type: "cylinder",
      name: "Cylinder",
    },
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
      console.log("BEADS API RESPONSE:", data);

      if (Array.isArray(data)) {
        setBeads(data);
      } else if (Array.isArray(data.beads)) {
        setBeads(data.beads);
      } else {
        setBeads([]);
      }
    })
    .catch((err) => console.log(err));
}, []);

  if (!selectedCategory && mode !== "studio")
    return null;

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
      radius: 180,
      slots: 18,
    },
    {
      name: "Pendant",
      radius: 220,
      slots: 22,
    },
    {
      name: "Layered",
      radius: 250,
      slots: 26,
    },
  ];

  const earringTemplates = [
    {
      name: "Hoop Earrings",
      radius: 80,
      slots: 8,
    },
    {
      name: "Drop Earrings",
      radius: 100,
      slots: 6,
    },
    {
      name: "Pearl Earrings",
      radius: 70,
      slots: 6,
    },
  ];

  const categories = [
    "All",
    "Pearl",
    "Luxury",
    "Charms",
    "Jumprings",
  ];

  const filteredBeads =
    beadCategory === "All"
      ? beads
      : beads.filter(
          (bead) =>
            bead.category === beadCategory
        );

  let templates = [];

  if (selectedCategory === "bracelet") {
    templates = braceletTemplates;
  } else if (
    selectedCategory === "necklace"
  ) {
    templates = necklaceTemplates;
  } else if (
    selectedCategory === "earrings"
  ) {
    templates = earringTemplates;
  }

  /* =================================
     STUDIO MODE
  ================================= */

  if (mode === "studio") {
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
              className="category-btn"
              onClick={() => {
                console.log(
                  "Pen selected"
                );
                setTool("pen");
              }}
            >
              🖊 Pen
            </button>

            <button
              className="category-btn"
              onClick={() => {
                console.log(
                  "Eraser selected"
                );
                setTool("eraser");
              }}
            >
              🧽 Eraser
            </button>

            <button
              className="category-btn"
              onClick={() =>
                console.log(
                  "Undo clicked"
                )
              }
            >
              ↩ Undo
            </button>

            <button
              className="category-btn"
              onClick={() =>
                console.log(
                  "Clear clicked"
                )
              }
            >
              🗑 Clear
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

          <div className="beadGrid">
            {(showAllBeads
              ? filteredBeads
              : filteredBeads.slice(0, 6)
            ).map((bead) => (
              <div
                className="beadItem"
                key={bead._id}
              >
                <Bead
                  src={bead.image}
                  selectedColor={
                    selectedColor
                  }
                  selectedSize={
                    selectedSize
                  }
                />

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

      
         
      </div>
    );
  }

  /* =================================
     NORMAL MODE
  ================================= */

  return (
    <div className="palette">
      <h2 className="palette-title">
        {selectedCategory
          ? selectedCategory
              .charAt(0)
              .toUpperCase() +
            selectedCategory.slice(1)
          : "Customization"}
      </h2>

      {/* TEMPLATES */}
      <div className="section">
        <h4>Select Template</h4>

        <div className="category-buttons">
          {templates.map((template) => (
            <button
              key={template.name}
              className={`category-btn ${
                selectedString?.name ===
                template.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedString(template)
              }
            >
              {template.name}
            </button>
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

        <div className="beadGrid">
          {(showAllBeads
            ? filteredBeads
            : filteredBeads.slice(0, 6)
          ).map((bead) => (
            <div
              className="beadItem"
              key={bead._id}
            >
              <Bead
                src={bead.image}
                selectedColor={
                  selectedColor
                }
                selectedSize={
                  selectedSize
                }
              />

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

      {/* COMPONENTS */}
      <div className="section">
        <h4>Components</h4>

        <div className="beadGrid">
          {jewelryComponents.map((item) => (
            <div
              className="beadItem"
              key={item.id}
            >
              <ComponentItem item={item} />

              <span className="beadName">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}