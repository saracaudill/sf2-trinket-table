// table.js
// handles table responsiveness

export function buildTable(texts) {
  const tableBody = document.getElementById("tableBody");

  for (let row = 0; row < 20; row++) {
    const tr = document.createElement("tr");

    for (let group = 0; group < 5; group++) {
      const index = group * 20 + row;
      if (index < texts.length) {
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

export function highlightCell(number) {
  // clear previous highlights

  document.querySelectorAll("td").forEach((td) => {
    td.classList.remove("highlight");
  });

  const index = number - 1;
  const row = index % 20;
  const group = Math.floor(index / 20);
  const table = document.getElementById("trinket-table");
  const tr = table.rows[row + 1];

  if (tr) {
    const numberCellIndex = group * 2;
    const textCellIndex = numberCellIndex + 1;

    [tr.cells[numberCellIndex], tr.cells[textCellIndex]].forEach((cell) => {
      if (cell) {
        // restart flash animation

        cell.classList.remove("highlight");
        void cell.offsetWidth;

        // force reflow, so animation can restart

        cell.classList.add("highlight");
      }
    });
  }
}
