document.addEventListener("DOMContentLoaded", () => {
  // Add recommendation event
  document.getElementById("recommend_btn").addEventListener("click", addRecommendation);

  // Animate skills on scroll
  document.addEventListener("scroll", () => {
    const skills = document.querySelectorAll(".skill");
    skills.forEach((skill) => {
      if (isElementInViewport(skill)) {
        skill.classList.add("animated");
      }
    });
  });

  // Call To Action email form handler
  const ctaForm = document.getElementById("cta-form");
  if (ctaForm) {
    ctaForm.addEventListener("submit", handleFormSubmit);
  }
});

function addRecommendation() {
  const newRecommendation = document.getElementById("new_recommendation").value.trim();
  if (!newRecommendation) return;

  const recommendationsContainer = document.getElementById("all_recommendations");

  const newRecDiv = document.createElement("div");
  newRecDiv.classList.add("recommendation");
  newRecDiv.innerHTML = `<span>&#8220;</span>${newRecommendation}<span>&#8221;</span>`;

  recommendationsContainer.appendChild(newRecDiv);
  document.getElementById("new_recommendation").value = "";

  showPopup(true);
}

function showPopup(show) {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = show ? "block" : "none";
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ✅ Updated to use EmailJS
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const messageContainer = document.getElementById("cta-message");

  const SERVICE_ID = "m1rh1jm"; // Replace with your EmailJS Service ID
  const TEMPLATE_ID = "template_zipsupq";

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
    .then(() => {
      messageContainer.textContent = "✅ Thanks! We'll be in touch soon.";
      messageContainer.classList.remove("text-danger");
      messageContainer.classList.add("text-success");
      form.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      messageContainer.textContent = "❌ Oops! Something went wrong. Please try again.";
      messageContainer.classList.remove("text-success");
      messageContainer.classList.add("text-danger");
    });
}

// Dark Mode Toggle
const toggleButton = document.getElementById("darkModeToggle");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference in local storage
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light Mode";
  }
});
