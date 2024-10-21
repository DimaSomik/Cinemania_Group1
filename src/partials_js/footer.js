document.addEventListener("DOMContentLoaded", function () {
    // Pobranie wskaźnika okna modalnego
    const modal = document.getElementById("modalTeam");
  
    // Pobranie wskaźnika przycisku, który otwiera okno modalne
    const btn = document.querySelector(".footer-click");
  
    // Pobranie wskaźnika elementu <span>, który zamyka okno modalne
    const span = document.querySelector(".close-modal-click");
  
    // Obsługa kliknięcia na przycisk otwierający okno modalne 'goit-team'
    btn.onclick = function() {
      modal.style.display = "block";
    }
  
    // Obsługa kliknięcia na przycisk zamykający okno modalne
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    // Obsługa kliknięcia poza okno modalne zamykającego to okno
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  
    // Obsługa zdarzenia naciśnięcia klawisza Esc zamykającego okno modalne
    document.onkeydown = function(event) {
      if (event.key === "Escape") {
        modal.style.display = "none";
      }
    }
  });