// main.js
// handles button and active state (i.e., event wiring)

import { buildTable } from "./table.js";
import { rollDice } from "./dice.js";

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load data.json");
      return response.json();
    })
    .then((texts) => {
      buildTable(texts);

      const rollButton = document.getElementById("rollButton");

      // 🎲 click to roll dice
      rollButton.addEventListener("click", rollDice);

      // 🖱️ mouse active state
      rollButton.addEventListener("mousedown", () =>
        rollButton.classList.add("is-active")
      );
      rollButton.addEventListener("mouseup", () =>
        rollButton.classList.remove("is-active")
      );
      rollButton.addEventListener("mouseleave", () =>
        rollButton.classList.remove("is-active")
      );

      // 🖐 touch / trackpad tap active state
      rollButton.addEventListener("touchstart", () =>
        rollButton.classList.add("is-active")
      );
      rollButton.addEventListener("touchend", () =>
        rollButton.classList.remove("is-active")
      );
    })
    .catch((err) => {
      console.error("Error loading data:", err);
      alert("Failed to load table data.");
    });
});
