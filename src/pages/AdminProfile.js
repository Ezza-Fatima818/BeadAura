import { useEffect, useState } from "react";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "Administrator",
    phone: "",
    image: "",
  });

  // 🔥 LOAD SAVED PROFILE
  useEffect(() => {
    const savedProfile = localStorage.getItem("adminProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // DEFAULT PROFILE
      setProfile({
        name: "Admin",
        email: "admin@gmail.com",
        role: "Administrator",
        phone: "",
        image:
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      });
    }
  }, []);

  // 🔥 HANDLE INPUT CHANGES
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 HANDLE IMAGE UPLOAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfile({
          ...profile,
          image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  // 🔥 SAVE PROFILE
  const saveProfile = () => {
    // VALIDATION
    if (!profile.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!profile.email.trim()) {
      alert("Email is required");
      return;
    }

    localStorage.setItem(
      "adminProfile",
      JSON.stringify(profile)
    );

    alert("Profile updated successfully!");

    // 🔥 REFRESH PAGE
    window.location.reload();
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "35px",
        borderRadius: "16px",
        maxWidth: "750px",
        margin: "20px auto",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* 🔥 TITLE */}
      <h2
        style={{
          marginBottom: "30px",
          color: "#111827",
          fontSize: "28px",
        }}
      >
        Admin Profile
      </h2>

      {/* 🔥 PROFILE SECTION */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          marginBottom: "35px",
        }}
      >
        {/* PROFILE IMAGE */}
        <img
          src={
            profile.image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #111827",
          }}
        />

        {/* IMAGE INPUT */}
        <div>
          <p
            style={{
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Upload Profile Picture
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* 🔥 FORM */}
      <div
        style={{
          display: "grid",
          gap: "22px",
        }}
      >
        {/* NAME */}
        <div>
          <label style={labelStyle}>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={inputStyle}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label style={labelStyle}>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={inputStyle}
          />
        </div>

        {/* ROLE */}
        <div>
          <label style={labelStyle}>
            Role
          </label>

          <input
            type="text"
            value={profile.role}
            disabled
            style={{
              ...inputStyle,
              background: "#f3f4f6",
              cursor: "not-allowed",
            }}
          />
        </div>

        {/* PHONE */}
        <div>
          <label style={labelStyle}>
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            style={inputStyle}
          />
        </div>

        {/* SAVE BUTTON */}
        {/* SAVE BUTTON */}
<button
  onClick={saveProfile}
  style={{
    background: "#111827",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
  }}
>
  Save Changes
</button>

{/* LOGOUT BUTTON */}
<button
  onClick={() => {
    localStorage.removeItem("adminToken");

    alert("Logged out successfully!");

    window.location.href = "/login";
  }}
  style={{
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  }}
>
  Logout
</button>
      </div>
    </div>
  );
}

// 🔥 INPUT STYLE
const inputStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "8px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
  boxSizing: "border-box",
};

// 🔥 LABEL STYLE
const labelStyle = {
  fontWeight: "600",
  color: "#111827",
  fontSize: "15px",
};