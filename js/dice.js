// dice.js

// handles dice rolling logic, animation, and highlighting results

import { highlightCell } from "./table.js";

// add pulse animation to dice result

function pulseDice(tensEl, onesEl) {
  [tensEl, onesEl].forEach((die) => {
    // reset anim if already rolling

    die.classList.remove("roll");

    // force reflow to restart anim

    void die.offsetWidth;

    // apply pulse anim

    die.classList.add("roll");
  });
}

export function rollDice() {
  // grab display elements

  const tensDisplay = document.getElementById("tens-die");
  const onesDisplay = document.getElementById("ones-die");
  const totalOutput = document.getElementById("dice-total");

  // number of steps in anim

  let rollCount = 0;

  // starting speed (i.e., ms between rolls)

  let delay = 20;

  function rollStep() {
    // random, temporary that pop up while dice are rolling

    const tempTens = Math.floor(Math.random() * 10) * 10;
    const tempOnes = Math.floor(Math.random() * 10);

    tensDisplay.textContent = tempTens === 0 ? "00" : tempTens;
    onesDisplay.textContent = tempOnes;

    rollCount++;

    // keep rolling; slow down slightly after each step

    if (rollCount < 5) {
      delay += 10;
      setTimeout(rollStep, delay);
    } else {
      // final result after anim ends

      const finalTens = Math.floor(Math.random() * 10) * 10;
      const finalOnes = Math.floor(Math.random() * 10);

      tensDisplay.textContent = finalTens === 0 ? "00" : finalTens;
      onesDisplay.textContent = finalOnes;

      // pulse final result
      pulseDice(tensDisplay, onesDisplay);

      // calculate total
      // note: 00 + 0 = 100

      let total = finalTens + finalOnes;
      if (finalTens === 0 && finalOnes === 0) {
        total = 100;
      }

      // update hidden output for screen readers

      totalOutput.textContent = total;

      // add tiny pause before highlighting matching table cell

      setTimeout(() => {
        highlightCell(total);
      }, 300);
    }
  }

  // start rolling anim

  rollStep();
}
