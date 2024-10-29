// Constants
const MODAL = document.getElementById("Modal");
const CLOSE_BTN = document.querySelector(".CloseBtn");

// Function to open the modal
// export function openModal() {
//   MODAL.style.display = "block";
// }

export function openModal(ytKey) {
  if(ytKey) {
  MODAL.style.display = "block";
  document.querySelector('.ModalContent').innerHTML = `<iframe width="650" height="400"
                                                        src="https://www.youtube.com/embed/${ytKey}">
                                                       </iframe>`;    
  } else {
    MODAL.style.display = "block";
  }
}

// Close the modal when the user clicks the close button
CLOSE_BTN.onclick = function () {
  MODAL.style.display = "none";
};

// Close the modal when the user clicks outside of it
MODAL.addEventListener('click', (event) => {
  if (event.target === MODAL) MODAL.style.display = "none";
});
