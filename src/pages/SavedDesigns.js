import { useEffect, useState } from "react";
import "./SavedDesigns.css";

export default function SavedDesigns() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    fetch(`http://localhost:5000/api/saved-designs/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDesigns(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const BASE_URL = "http://192.168.100.183:5000";

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

  {/* Empty State */}
  {designs.length === 0 && (
    <p className="empty-text">No designs yet</p>
  )}

  {/* Grid */}
  <div className="designs-grid">
    {designs.map((design, i) => (
      <div className="design-card" key={i}>
        
        {design.imageUrl && (
          <img
            src={`${BASE_URL}${design.imageUrl}`}
            alt="design"
          />
        )}

        

      </div>
    ))}
  </div>

</div>
  );
}