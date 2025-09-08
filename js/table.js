// table.js

// Example data — replace this with your actual 100 items
export const texts = Array.from({ length: 100 }, (_, i) => `Text ${i + 1}`);

// Build the table dynamically
export function buildTable(texts) {
  const tableBody = document.getElementById("tableBody");

  for (let row = 0; row < 20; row++) {
    const tr = document.createElement("tr");

    for (let group = 0; group < 5; group++) {
      const index = group * 20 + row;
      if (index < 100) {
        const numberTd = document.createElement("td");
        numberTd.textContent = index + 1;
        numberTd.className = "number";

        const textTd = document.createElement("td");
        textTd.textContent = texts[index];
        textTd.className = "text";

        tr.appendChild(numberTd);
        tr.appendChild(textTd);
      }
    }

    tableBody.appendChild(tr);
  }
}

// Highlight the corresponding cell and its associated text
export function highlightCell(number) {
  // Clear previous highlights
  document.querySelectorAll("td").forEach(td => td.classList.remove("highlight"));

  const index = number - 1;
  const row = index % 20;
  const group = Math.floor(index / 20);
  const table = document.getElementById("myTable");
  const tr = table.rows[row + 2]; // +2 for header rows

  if (tr) {
    const numberCellIndex = group * 2;
    const textCellIndex = numberCellIndex + 1;

    tr.cells[numberCellIndex]?.classList.add("highlight");
    tr.cells[textCellIndex]?.classList.add("highlight");
  }
}
