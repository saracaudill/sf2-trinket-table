// ----------------------------
// 1. define focusable elements
// ----------------------------
// i.e., element types user can tab to inside modal

const focusableSelectors = [
  "a[href]",
  "button",
  "input",
  "textarea",
  "select",
  '[tabindex]:not([tabindex="-1"])',
];

// contain focusable elements inside modal container

const getFocusableElements = (element) =>
  Array.from(element.querySelectorAll(focusableSelectors.join(","))).filter(
    (el) => !el.disabled && el.getAttribute("aria-hidden") !== "true"
  );

// retain focus state before modal opened

let lastFocusedElement = null;

// --------------------------
// 2. trap focus inside modal
// --------------------------
// prevent keyboard users from inadvertently tabbing out of modal

const trapFocus = (modal, e) => {
  if (e.key !== "Tab") return;

  const focusableEls = getFocusableElements(modal);
  if (focusableEls.length === 0) return;

  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  // shift+tab to move backwards

  if (e.shiftKey) {
    if (document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    }
  }

  // tab to move forwards
  else {
    if (document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  }
};

// -------------
// 3. open modal
// -------------

const openModal = (modal) => {
  // save what was focused prior to opening modal

  lastFocusedElement = document.activeElement;

  // make modal visible for screen readers

  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");

  // move focus to modal close button

  const closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) closeBtn.focus();

  // add keydown listener for focus trapping

  const focusHandler = (e) => trapFocus(modal, e);
  modal.dataset.focusHandler = focusHandler; // save reference
  document.addEventListener("keydown", focusHandler);
};

// ----------------------------
// 4. close modal
// ----------------------------

// i.e., element types user can tab to inside modal

const closeModal = (modal) => {
  //hide modal and mark as hidden

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  // remove focus trap listener

  const focusHandler = modal.dataset.focusHandler;
  if (focusHandler) {
    document.removeEventListener("keydown", focusHandler);
    delete modal.dataset.focusHandler;
  }

  // restore focus to element that opened modal

  if (lastFocusedElement) lastFocusedElement.focus();
};

// ---------------------------
// 5. establish modal triggers
// ---------------------------
// find all elements with "data-modal-target" (i.e., cup link)

document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
  const targetId = trigger.getAttribute("data-modal-target");
  const modal = document.getElementById(targetId);

  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close");

  // open modal when user clicks cup link

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(modal);
  });

  // close modal when user clicks 'x' button

  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeModal(modal));
  }

  // close modal when user clicks outside of modal

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });

  // close modal when user presses escape

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal(modal);
    }
  });
});
