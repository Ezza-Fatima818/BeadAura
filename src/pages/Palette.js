import "./Palette.css";
import Bead from "../components/Bead";
import { useEffect, useState } from "react";

export default function Palette({ setSelectedString, setJewelryType }) {
  const [beads, setBeads] = useState([]);
  const [showAllBeads, setShowAllBeads] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedJewelry, setSelectedJewelryLocal] = useState("Bracelet");
  const [selectedColor, setSelectedColor] =
  useState("white");

const [selectedSize, setSelectedSize] =
  useState("medium");

  // Bracelet templates
  const braceletTemplates = [
    { name: "Flower Bracelet", pattern: "flower" },
    { name: "Custom Design", pattern: "custom" }
  ];

  // Necklace templates
  const necklaceTemplates = [
    { name: "Choker", radius: 180, slots: 18 },
    { name: "Pendant", radius: 220, slots: 22 },
    { name: "Layered", radius: 250, slots: 26 }
  ];

  // Earring templates
  const earringTemplates = [
    { name: "Hoop Earrings", radius: 80, slots: 8 },
    { name: "Drop Earrings", radius: 100, slots: 6 },
    { name: "Pearl Earrings", radius: 70, slots: 6 }
  ];

  const categories = ["All", "Pearl", "Luxury", "Charms"];

  const jewelryTypes = [
    "Bracelet",
    "Necklace",
    "Earrings"
  ];
 

  // Fetch beads
  useEffect(() => {
    fetch("http://localhost:5000/api/beads")
      .then((res) => res.json())
      .then((data) => setBeads(data))
      .catch((err) => console.log(err));
  }, []);

  // Filter beads
  const filteredBeads =
    selectedCategory === "All"
      ? beads
      : beads.filter(
          (bead) => bead.category === selectedCategory
        );

  // Dynamic templates
  let templates = [];

  if (selectedJewelry === "Bracelet") {
    templates = braceletTemplates;
  } 
  else if (selectedJewelry === "Necklace") {
    templates = necklaceTemplates;
  } 
  else if (selectedJewelry === "Earrings") {
    templates = earringTemplates;
  }

  return (
    <div className="palette">
      <h2 className="palette-title">Customize Jewelry</h2>

      {/* Jewelry Type */}
      <div className="section">
        <h4>Select Jewelry Type</h4>

        <div className="category-buttons">
          {jewelryTypes.map((type) => (
            <button
              key={type}
              className="category-btn"
              onClick={() => {
                setJewelryType(type);
                setSelectedJewelryLocal(type);
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Templates */}
      <div className="section">
        <h4>Select Template</h4>

        <div className="category-buttons">
          {templates.map((template) => (
            <button
              key={template.name}
              className="category-btn"
              onClick={() => setSelectedString(template)}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bead Categories */}
      <div className="section">
        <h4>Categories</h4>

        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="category-btn"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

{/* Beads */}
{/* Beads */}
<div className="section">
  <h4>Select Beads</h4>

  <div className="beadRow">
    {(showAllBeads
      ? filteredBeads
      : filteredBeads.slice(0, 4)
    ).map((bead) => (
      <Bead
        key={bead._id}
        src={bead.image}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    ))}
  </div>

  {filteredBeads.length > 4 && (
    <button
      className="view-more-btn"
      onClick={() =>
        setShowAllBeads(!showAllBeads)
      }
    >
      {showAllBeads
        ? "Show Less"
        : "+ View More"}
    </button>
  )}
</div>
{/* Color Selection */}
<div className="section">
  <h4>Select Color</h4>

  <div className="category-buttons">
    {["white", "pink", "blue", "green"].map(
      (color) => (
        <button
          key={color}
          className="category-btn"
          onClick={() =>
            setSelectedColor(color)
          }
        >
          {color}
        </button>
      )
    )}
  </div>
</div>
{/* Size Selection */}
<div className="section">
  <h4>Select Size</h4>

  <div className="category-buttons">
    {["small", "medium", "large"].map(
      (size) => (
        <button
          key={size}
          className="category-btn"
          onClick={() =>
            setSelectedSize(size)
          }
        >
          {size}
        </button>
      )
    )}
  </div>
</div>
</div>

);
}