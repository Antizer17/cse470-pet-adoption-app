// client/src/pages/PetListingPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ⭐ REQUIRED FOR FEATURE 9

const API_URL = "http://localhost:5000/api/pets";

export default function PetListingPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();   // ⭐ NOW YOU CAN NAVIGATE TO DETAILS

  // Fetch pets from backend
  const fetchPets = async () => {
    try {
      setLoading(true);

      let url = API_URL;
      const params = [];

      if (search.trim() !== "") params.push(`search=${search}`);
      if (category !== "all") params.push(`category=${category}`);

      if (params.length > 0) url += `?${params.join("&")}`;

      const res = await fetch(url);
      const data = await res.json();

      setPets(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, [search, category]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFF7F0",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        🐾 Browse Available Pets
      </h1>

      {/* Search + Filter */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          margin: "0 auto 30px",
          maxWidth: "600px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name or breed..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "25px",
            border: "1px solid #ddd",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "25px",
            border: "1px solid #ddd",
          }}
        >
          <option value="all">All</option>
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
          <option value="Bird">Birds</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Pets Grid */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading pets...</p>
      ) : pets.length === 0 ? (
        <p style={{ textAlign: "center" }}>No pets found 😿</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {pets.map((pet) => (
            <div
              key={pet._id}
              onClick={() => navigate(`/pets/${pet._id}`)}   // ⭐ CLICK → DETAILS PAGE
              style={{
                background: "#FFE9F3",
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 3px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              {/* Image */}
              {pet.image && (
                <img
                  src={pet.image}
                  alt={pet.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    marginBottom: "10px",
                  }}
                />
              )}

              <h3 style={{ margin: "10px 0", color: "#333" }}>{pet.name}</h3>

              <p style={{ margin: "5px 0", color: "#444" }}>
                <strong>Breed:</strong> {pet.breed}
              </p>

              <p style={{ margin: "5px 0", color: "#444" }}>
                <strong>Age:</strong> {pet.age}
              </p>

              <p style={{ margin: "5px 0", color: "#444" }}>
                <strong>Category:</strong> {pet.category}
              </p>

              <p style={{ margin: "5px 0", color: "#444" }}>
                <strong>Description:</strong> {pet.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
