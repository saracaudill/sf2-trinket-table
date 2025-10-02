// main.js

// load table data, build table, and wire up roll button interactions

import { buildTable } from "./table.js";
import { rollDice } from "./dice.js";

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // 1. load trinket data from json
  // ------------------------------

  fetch("data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load data.json");
      return response.json();
    })
    .then((texts) => {
      // -------------------------------
      // 2. build data with fetched data
      // -------------------------------

      buildTable(texts);

      // -------------------------
      // 3. get 'roll dice' button
      // -------------------------

      const rollButton = document.getElementById("rollButton");

      // ---------------------------------------------
      // 4. handle dice rolling when button is clicked
      // ---------------------------------------------

      rollButton.addEventListener("click", rollDice);

      // -------------------------------------------------------
      // 5. handle mouse interactions for pressed/active styling
      // -------------------------------------------------------

      rollButton.addEventListener("mousedown", () =>
        rollButton.classList.add("is-active")
      );
      rollButton.addEventListener("mouseup", () =>
        rollButton.classList.remove("is-active")
      );
      rollButton.addEventListener("mouseleave", () =>
        rollButton.classList.remove("is-active")
      );

      // ----------------------------------------------------------------
      // 6. handle touch/trackpad interactions for pressed/active styling
      // ----------------------------------------------------------------

      rollButton.addEventListener("touchstart", () =>
        rollButton.classList.add("is-active")
      );
      rollButton.addEventListener("touchend", () =>
        rollButton.classList.remove("is-active")
      );
    })
    .catch((err) => {
      // -----------------------------------------------
      // 7. handle errors (missing or broken data.json)
      // ----------------------------------------------

      console.error("Error loading data:", err);
      alert("Failed to load table data.");
    });
});
