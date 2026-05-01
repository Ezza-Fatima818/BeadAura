import { useEffect, useState } from "react";

export default function SavedDesigns() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    // 🔥 TEMP: Dummy data (remove later when backend ready)
   

    // ✅ WHEN BACKEND READY → USE THIS
    
    fetch("http://localhost:5000/api/saved-designs")
      .then((res) => res.json())
      .then((data) => {
        setDesigns(data);
      })
      .catch((err) => console.log(err));
    
  }, []);

  return (
  <div style={{ padding: "20px" }}>
    <h2>Saved Designs</h2>

    {designs.length === 0 && <p>No designs yet</p>}

    {designs.map((design, i) => (
      <div
        key={i}
        style={{
          position: "relative",
          width: "600px",
          height: "400px",
          background: "#f5f5f5",
          marginBottom: "20px",
          borderRadius: "12px",
          border: "1px solid #ddd"
        }}
      >
       {design.image && (
  <img
    src={design.image}
    alt="saved design"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      borderRadius: "12px"
    }}
  />
)}
            
        
      </div>
    ))}
  </div>
);
}
