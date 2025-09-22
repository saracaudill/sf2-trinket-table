// dice.js
import { highlightCell } from './table.js';

// 🔹 helper: add pulse animation to dice when result lands
function pulseDice(tensEl, onesEl) {
  [tensEl, onesEl].forEach(die => {
    die.classList.remove("roll"); // reset if already rolling
    void die.offsetWidth;         // force reflow so animation restarts
    die.classList.add("roll");
  });
}

export function rollDice() {
  const tensDisplay = document.getElementById("tensDie");
  const onesDisplay = document.getElementById("onesDie");

  let rollCount = 0;
  let delay = 20; // start ultra fast

  function rollStep() {
    // temporary values while rolling
    const tempTens = Math.floor(Math.random() * 10) * 10;
    const tempOnes = Math.floor(Math.random() * 10);

    tensDisplay.textContent = tempTens === 0 ? "00" : tempTens;
    onesDisplay.textContent = tempOnes;

    rollCount++;

    if (rollCount < 8) {
      // quick slowdown
      delay += 10;
      setTimeout(rollStep, delay);
    } else {
      // final result
      const finalTens = Math.floor(Math.random() * 10) * 10;
      const finalOnes = Math.floor(Math.random() * 10);

      tensDisplay.textContent = finalTens === 0 ? "00" : finalTens;
      onesDisplay.textContent = finalOnes;

      // 🔥 pulse the final result
      pulseDice(tensDisplay, onesDisplay);

      let total = finalTens + finalOnes;
      if (finalTens === 0 && finalOnes === 0) {
        total = 100; // special case for percentile "00"
      }

      // ⏱️ tiny pause before highlighting
      setTimeout(() => {
        highlightCell(total);
      }, 300);
    }
  }

  rollStep();
}
