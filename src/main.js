document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const navbar = document.getElementById("navbar");
  const navList = document.querySelectorAll("nav li a");

  // Handle the hamburger menu toggle
  hamburger.addEventListener("click", function () {
    if (menu.classList.contains("max-h-0")) {
      menu.classList.remove("max-h-0");
      menu.classList.add("max-h-screen");
    } else {
      menu.classList.remove("max-h-screen");
      menu.classList.add("max-h-0");
    }
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
      // Adjust scroll value as needed
      navbar.classList.add("fixed-top");
      navList.forEach((link) => {
        link.classList.add("text-black");
        link.classList.remove("text-white");
      });
    } else {
      navbar.classList.remove("fixed-top");
      navList.forEach((link) => {
        link.classList.add("text-white");
        link.classList.remove("text-black");
      });
    }
  });
});

const items = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".pagination-dot");
let currentItem = 0;

const showItem = (index) => {
  items[currentItem].classList.remove("visible");
  items[currentItem].classList.add("hidden");
  dots[currentItem].classList.remove("opacity-100");
  dots[currentItem].classList.add("opacity-50");

  currentItem = index;

  items[currentItem].classList.remove("hidden");
  items[currentItem].classList.add("visible");
  dots[currentItem].classList.remove("opacity-50");
  dots[currentItem].classList.add("opacity-100");
};

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showItem(index);
  });
});

let touchstartX = 0;
let touchendX = 0;

const handleGesture = () => {
  if (touchendX < touchstartX) {
    showItem((currentItem + 1) % items.length);
  }
  if (touchendX > touchstartX) {
    showItem((currentItem - 1 + items.length) % items.length);
  }
};

document.getElementById("carousel").addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

document.getElementById("carousel").addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
});

// Automatic slide change every 5 seconds
setInterval(() => {
  showItem((currentItem + 1) % items.length);
}, 5000);
