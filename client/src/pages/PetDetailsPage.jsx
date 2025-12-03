// client/src/pages/PetDetailsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/pets";

export default function PetDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false); // for animation

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Could not fetch pet details");
        const data = await res.json();
        setPet(data);
        setTimeout(() => setIsVisible(true), 40); // small delay to animate
      } catch (err) {
        console.error(err);
        setError("Failed to load pet details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFF7EF, #FFEAF6)",
          fontFamily: "Poppins, Arial, sans-serif",
        }}
      >
        <p style={{ fontSize: "16px" }}>Loading pet details…</p>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFF7EF, #FFEAF6)",
          fontFamily: "Poppins, Arial, sans-serif",
        }}
      >
        <p style={{ marginBottom: "16px" }}>{error || "Pet not found."}</p>
        <button
          onClick={() => navigate("/pets")}
          style={{
            padding: "8px 16px",
            borderRadius: "999px",
            border: "none",
            background: "#FFB6C8",
            color: "#4A2340",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ← Back to listings
        </button>
      </div>
    );
  }

  const { name, breed, age, category, description, image } = pet;

  const safeName = name || "Our friend";
  const safeBreed = breed || "Unknown breed";
  const safeCategory = category || "Companion";
  const safeAge =
    age !== undefined && age !== null && age !== "" ? `${age} year(s)` : "N/A";
  const safeDescription =
    description && description.trim().length > 0
      ? description
      : "We’re still updating this pet’s story. Contact the shelter to learn more about their personality and daily routine.";

  // A richer “story” style sentence
  const storyLine = `${safeName} is a ${
    safeAge !== "N/A" ? safeAge.toLowerCase() + " old " : ""
  }${safeBreed.toLowerCase()} in our ${safeCategory.toLowerCase()} category, looking for a gentle, loving home.`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF7EF, #FFEAF6)",
        fontFamily: "Poppins, Arial, sans-serif",
        padding: "24px 12px 40px",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate("/pets")}
        style={{
          marginBottom: "20px",
          padding: "6px 14px",
          borderRadius: "999px",
          border: "none",
          background: "#FFFFFF",
          boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        ← Back to listings
      </button>

      {/* Outer card */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: "26px",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
          padding: "22px 22px 26px",
          display: "flex",
          gap: "24px",
          alignItems: "stretch",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(18px)",
          transition: "all 0.4s ease",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT: Image panel */}
        <div
          style={{
            flex: "0 0 380px",
            minWidth: "280px",
            borderRadius: "20px",
            background:
              "radial-gradient(circle at top, #FFE4F1 0, #FDFDFD 45%, #E8F9FF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={safeName}
              style={{
                maxWidth: "100%",
                maxHeight: "440px",
                borderRadius: "18px",
                objectFit: "contain", // ensures full animal is visible
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "18px",
                background: "#FFF7EF",
                color: "#A18A7C",
                fontSize: "14px",
              }}
            >
              No image available yet 🐾
            </div>
          )}
        </div>

        {/* RIGHT: Details panel */}
        <div
          style={{
            flex: "1 1 320px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Name, chips, subtle line */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "4px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "#342B3A",
                }}
              >
                {safeName}
              </h2>
              <span
                style={{
                  padding: "4px 10px",
                  fontSize: "11px",
                  borderRadius: "999px",
                  background: "#FFF4D6",
                  border: "1px solid #F4D27A",
                  color: "#7A5A00",
                  fontWeight: 600,
                }}
              >
                {safeCategory}
              </span>
            </div>

            <p
              style={{
                margin: "0 0 10px",
                fontSize: "14px",
                color: "#5E5564",
              }}
            >
              {storyLine}
            </p>

            <div
              style={{
                height: "1px",
                width: "70px",
                background:
                  "linear-gradient(90deg, rgba(255,182,200,0.9), transparent)",
                marginBottom: "8px",
              }}
            />
          </div>

          {/* Highlighted facts row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "10px",
              marginBottom: "4px",
            }}
          >
            <FactChip label="Breed" value={safeBreed} />
            <FactChip label="Age" value={safeAge} />
            <FactChip label="Personality" value="Friendly & affectionate" />
            <FactChip label="Good for" value="Families & gentle owners" />
          </div>

          {/* Description / story block */}
          <div
            style={{
              marginTop: "6px",
              padding: "12px 14px",
              borderRadius: "16px",
              background: "#FFF7FB",
              border: "1px solid #F3CCE9",
            }}
          >
            <h3
              style={{
                margin: "0 0 6px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#3C2439",
              }}
            >
              Meet {safeName}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#4F3A4D",
              }}
            >
              {safeDescription}
            </p>
          </div>

          {/* Small “care tips” strip (static, just for richness) */}
          <div
            style={{
              marginTop: "8px",
              fontSize: "13px",
              color: "#5A4D60",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "8px",
            }}
          >
            <TipLine icon="🦴" text="Enjoys play sessions and gentle walks." />
            <TipLine
              icon="🛏️"
              text="Needs a cozy, calm corner to sleep and feel safe."
            />
            <TipLine
              icon="🤝"
              text="Will bond best with patient owners who give time and affection."
            />
          </div>

          {/* CTA section at bottom */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              paddingTop: "10px",
              borderTop: "1px dashed rgba(0,0,0,0.08)",
              fontSize: "13px",
              color: "#574659",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>Ready to adopt?</div>
              <div>
                Email{" "}
                <span style={{ fontWeight: 600 }}>admin@fursure.com</span> and
                mention{" "}
                <span style={{ fontWeight: 600 }}>{safeName}</span> in the
                subject line.
              </div>
            </div>

            <button
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(135deg, #FFB6C8, #FFA9A0, #FFD18D)",
                color: "#3A1F2E",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(255, 142, 142, 0.45)",
                transform: "translateY(0)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 26px rgba(255, 142, 142, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 18px rgba(255, 142, 142, 0.45)";
              }}
            >
              💌 Send adoption request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small helper components for cleaner JSX ---------- */

function FactChip({ label, value }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: "14px",
        background: "#F8F3FF",
        border: "1px solid #E0D4FF",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#7B6A9C",
          marginBottom: "2px",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "13px", color: "#3D3159", fontWeight: 600 }}>
        {value}
      </div>
    </div>
  );
}

function TipLine({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
