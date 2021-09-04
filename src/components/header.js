import React, { useEffect, useState } from "react";

export default function Header() {
  const [small, setSmall] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 200)
      );
    }
  }, []);

  return (
    <header
      className={`header ${small ? "small" : ""}`}
      style={{
        fontFamily: "sans-serif-condensed",
        fontSize: 50,
        alignContent: "center",
        padding: 20,
        backgroundColor: "#ae1c35",
        color: "#999",
      }}
    >
      FIND ALL THE CREWMATES
    </header>
  );
}
