// dice.js
import { highlightCell } from './table.js';

export function rollDice() {
  const tensDisplay = document.getElementById("tensDie");
  const onesDisplay = document.getElementById("onesDie");

  let rollCount = 0;

  const rollInterval = setInterval(() => {
    const tempTens = Math.floor(Math.random() * 10) * 10;
    const tempOnes = Math.floor(Math.random() * 10);
    tensDisplay.textContent = tempTens === 0 ? "00" : tempTens;
    onesDisplay.textContent = tempOnes;

    rollCount++;
    if (rollCount > 10) {
      clearInterval(rollInterval);
      const finalTens = Math.floor(Math.random() * 10) * 10;
      const finalOnes = Math.floor(Math.random() * 10);

      tensDisplay.textContent = finalTens === 0 ? "00" : finalTens;
      onesDisplay.textContent = finalOnes;

      let total = finalTens + finalOnes;
      if (finalTens === 0 && finalOnes === 0) {
        total = 100;
      }

      highlightCell(total);
    }
  }, 100);
}
