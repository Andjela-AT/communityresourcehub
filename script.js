// =====================
// Dynamic parallax grid
// =====================
const grid = document.querySelector('.grid-lines');
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
});

function animateGrid() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;
  grid.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(animateGrid);
}
animateGrid();

// =====================
// Resource search filter
// =====================
function filterResources() {
  let query = document.getElementById("search")?.value.toLowerCase();
  if (!query) return;
  document.querySelectorAll(".resource-card").forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(query) ? "block" : "none";
  });
}

// =====================
// Volunteer filter
// =====================
function filterVolunteers() {
  const cat = document.getElementById("categoryFilter")?.value;
  if (!cat) return;
  document.querySelectorAll(".volunteer-card").forEach(card => {
    card.style.display = (cat === "all" || card.dataset.category === cat) ? "block" : "none";
  });
}

// =====================
// Countdown timer (Events)
// =====================
function updateCountdown() {
  const cards = document.querySelectorAll(".event-card");
  cards.forEach(card => {
    const eventDate = new Date(card.getAttribute("data-date"));
    const now = new Date();
    const diff = eventDate - now;
    const countdown = card.querySelector(".countdown");
    if (!countdown) return;

    if (diff > 0) {
      const days = Math.floor(diff/1000/60/60/24);
      const hours = Math.floor((diff/1000/60/60) % 24);
      const mins = Math.floor((diff/1000/60) % 60);
      const secs = Math.floor((diff/1000) % 60);
      countdown.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
    } else {
      countdown.textContent = "Event started!";
    }
  });
}
setInterval(updateCountdown, 1000);
updateCountdown();
