// Constants
const MODAL = document.getElementById("Modal");
const CLOSE_BTN = document.querySelector(".CloseBtn");

// Function to open the modal
function openModal() {
  MODAL.style.display = "block";
}

// Close the modal when the user clicks the close button
CLOSE_BTN.onclick = function () {
  MODAL.style.display = "none";
};

// Close the modal when the user clicks outside of it
window.onclick = function (event) {
  if (event.target == MODAL) {
    MODAL.style.display = "none";
  }
};
