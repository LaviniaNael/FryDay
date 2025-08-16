document.addEventListener("DOMContentLoaded", function () {
  // Header Scroll & Mobile Menu Logic
  const header = document.getElementById("header");
  const logoDay = document.getElementById("logo-day");
  const menuButton = document.getElementById("hamburger-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  const bar = document.getElementById("bar");
  mobileMenu.classList.add("bg-secondary");
  // Sticky header color change
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      bar.classList.remove("text-white");
      bar.classList.add("text-primary");
      header.classList.add("header-scrolled");
      logoDay.classList.remove("text-white");
      logoDay.classList.add("text-primary");
      menuButton.classList.remove("text-white");
      menuButton.classList.add("text-primary");
    } else {
      bar.classList.add("text-white");
      bar.classList.remove("text-primary");
      header.classList.remove("header-scrolled");
      logoDay.classList.add("text-white");
      logoDay.classList.remove("text-primary");
      menuButton.classList.add("text-white");
      menuButton.classList.remove("text-primary");
    }
  });

  // Mobile menu toggle
  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    mobileMenu.classList.toggle("translate-x-full");
    header.classList.toggle("bg-secondary");
  });
  document.addEventListener("click", (event) => {
    const isMenuOpen = !mobileMenu.classList.contains("translate-x-full");

    // Check if the menu is open and the click was not on the menu itself
    if (isMenuOpen && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.add("translate-x-full");
      header.classList.remove("bg-secondary");
    }
  });
  // Menu Filtering Logic
  // const menuItems = document.querySelectorAll(".menu-item");

  // filterButtons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     filterButtons.forEach((btn) =>
  //       btn.classList.remove("filter-menu-active", "bg-primary", "text-white")
  //     );
  //     button.classList.add("filter-menu-active", "bg-primary", "text-white");

  //     filterButtons.forEach((btn) => {
  //       btn.addEventListener("click", () => {
  //         const filter = btn.getAttribute("data-filter");

  //         if (filter !== "all") {
  //           viewMoreButton.style.display = "none";
  //         } else {
  //           viewMoreButton.style.display = "block";
  //         }

  //         // your filtering logic for items goes here...
  //         menuItems.forEach((item) => {
  //           const itemCategory = item.dataset.category;
  //           const shouldShow = filter === "all" || itemCategory === filter;

  //           const isHidden = item.style.display === "none";

  //           if (shouldShow) {
  //             if (isHidden) {
  //               item.style.display = "block";
  //               item.classList.add("is-appearing");

  //               setTimeout(() => {
  //                 item.classList.remove("is-appearing");
  //               }, 10);
  //             }
  //           } else {
  //             item.style.display = "none";
  //           }
  //         });
  //       });
  //     });
  //   });
  // });

  // Countdown Timer Logic
  const countdownDate = new Date();
  countdownDate.setDate(
    countdownDate.getDate() + ((6 - countdownDate.getDay() + 1) % 7) + 1
  );
  countdownDate.setHours(23, 59, 59, 999);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML =
        "<h3 class='text-2xl font-bold text-accent'>Offer Expired!</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days < 10 ? "0" + days : days;
    hoursEl.innerText = hours < 10 ? "0" + hours : hours;
    minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
  };

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  // Testimonial Slider Logic
  const sliderTrack = document.getElementById("slider-track");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");
  let currentIndex = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) {
      index = totalSlides - 1;
    } else if (index >= totalSlides) {
      index = 0;
    }
    currentIndex = index;
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevButton.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
    resetInterval();
  });
  nextButton.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
    resetInterval();
  });

  // Auto-play functionality
  let autoPlayInterval = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 5000);

  function resetInterval() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  }

  // Fade-in on Scroll Logic
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("is-visible");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
  updateMenu();
});

const viewMoreButton = document.getElementById("view-more-btn");
const allMenuItems = document.querySelectorAll("#menu-grid .menu-item");
const filterButtons = document.querySelectorAll(".menu-filter-btn");
const initialVisibleItems = 8;

function initializeMenu() {
  allMenuItems.forEach((item, index) => {
    if (index < initialVisibleItems) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Hide the button if there are 8 or fewer items total
if (allMenuItems.length > initialVisibleItems) {
  viewMoreButton.style.display = "block";
} else {
  viewMoreButton.style.display = "none";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active styles
    filterButtons.forEach((btn) =>
      btn.classList.remove("filter-menu-active", "bg-primary", "text-white")
    );
    button.classList.add("filter-menu-active", "bg-primary", "text-white");

    const filter = button.getAttribute("data-filter");

    // Show/hide the 'View More' button based on the filter
    if (filter === "all" && allMenuItems.length > initialVisibleItems) {
      viewMoreButton.style.display = "block";
    } else {
      viewMoreButton.style.display = "none";
    }

    // Always reset the button text when a filter changes
    viewMoreButton.innerText = "View More";

    // Show/hide menu items
    allMenuItems.forEach((item, index) => {
      const itemCategory = item.dataset.category;
      const categoryMatch = filter === "all" || itemCategory === filter;

      if (categoryMatch) {
        // If 'all' is selected, only show the first 8 items
        if (filter === "all" && index >= initialVisibleItems) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      } else {
        item.style.display = "none";
      }
    });
  });
});

viewMoreButton.addEventListener("click", () => {
  const isCollapsed = viewMoreButton.innerText.toUpperCase() === "VIEW MORE";

  if (isCollapsed) {
    allMenuItems.forEach((item) => (item.style.display = "block"));
    viewMoreButton.innerText = "View Less";
  } else {
    initializeMenu();
    viewMoreButton.innerText = "View More";
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  }
});

initializeMenu();

function rotateItem(cardElement) {
  const front = cardElement.querySelector(".front");
  const back = cardElement.querySelector(".back");

  front.classList.toggle("is-hidden");
  back.classList.toggle("is-hidden");
}
//Reservation Form Submission
const form = document.getElementById("reservation-form");
const notification = document.getElementById("reservation-success");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
    form.reset();
  }, 3000);
});
