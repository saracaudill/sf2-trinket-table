// main.js
import { buildTable } from './table.js';
import { rollDice } from './dice.js';

document.addEventListener("DOMContentLoaded", () => {
  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load data.json');
      return response.json();
    })
    .then(texts => {
      buildTable(texts);
      document.querySelector("button").addEventListener("click", rollDice);
    })
    .catch(err => {
      console.error('Error loading data:', err);
      alert("Failed to load table data.");
    });
});
