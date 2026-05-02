import { useEffect, useState } from "react";



export default function SavedDesigns() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    console.log("UserId:", userId);
    console.log("User object:", user);


    fetch(`http://localhost:5000/api/saved-designs/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched designs:", data);
        setDesigns(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const BASE_URL = "http://192.168.100.183:5000";

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Designs</h2>

      {designs.length === 0 && <p>No designs yet</p>}

      {designs.map((design, i) => (
        <div
          key={i}
          style={{
            width: "600px",
            height: "400px",
            background: "#f5f5f5",
            marginBottom: "20px",
            borderRadius: "12px",
            border: "1px solid #ddd"
          }}
        >
          {design.imageUrl && (
           

<img src={`${BASE_URL}${design.imageUrl}`} 
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