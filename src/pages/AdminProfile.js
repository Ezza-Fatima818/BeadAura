import { useEffect, useState } from "react";
import "./AdminProfile.css";

export default function AdminProfile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "Administrator",
    phone: "",
    image: "",
  });

  // LOAD PROFILE
  useEffect(() => {

    const savedProfile =
      localStorage.getItem("adminProfile");

    if (savedProfile) {

      setProfile(JSON.parse(savedProfile));

    } else {

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

  // INPUT CHANGE
  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

  };

  // IMAGE CHANGE
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

  // SAVE
  const saveProfile = () => {

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

    window.location.reload();
  };

  return (

    <div className="profile-container">

      {/* TITLE */}
      <div className="profile-header">

        <h2>
          Admin Profile
        </h2>

        <p>
          Manage your BeadAura admin account
        </p>

      </div>

      {/* PROFILE TOP */}
      <div className="profile-top">

        {/* IMAGE */}
        <div className="profile-image-section">

          <img
            src={
              profile.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="profile-image"
          />

          <label className="upload-btn">

            Upload Photo

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

          </label>

        </div>

      </div>

      {/* FORM */}
      <div className="profile-form">

        {/* NAME */}
        <div className="profile-group">

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

        </div>

        {/* EMAIL */}
        <div className="profile-group">

          <label>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

        </div>

        {/* ROLE */}
        <div className="profile-group">

          <label>
            Role
          </label>

          <input
            type="text"
            value={profile.role}
            disabled
            className="disabled-input"
          />

        </div>

        {/* PHONE */}
        <div className="profile-group">

          <label>
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />

        </div>

        {/* BUTTONS */}
        <div className="profile-buttons">

          <button
            onClick={saveProfile}
            className="save-profile-btn"
          >

            Save Changes

          </button>

          <button
            onClick={() => {

              localStorage.removeItem(
                "adminToken"
              );

              alert(
                "Logged out successfully!"
              );

              window.location.href =
                "/login";

            }}
            className="logout-btn"
          >

            Logout

          </button>

        </div>

      </div>

    </div>
  );
}