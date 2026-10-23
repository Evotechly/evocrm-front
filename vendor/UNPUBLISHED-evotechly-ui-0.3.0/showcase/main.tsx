import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Showcase } from "./Showcase";
import "../src/styles.css";

const params = new URLSearchParams(window.location.search);
const product = params.get("product") || "crm";
const theme = params.get("theme") === "dark" ? "dark" : "light";
document.documentElement.setAttribute("data-product", product);
document.documentElement.setAttribute("data-theme", theme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Showcase product={product} theme={theme} />
  </StrictMode>,
);
