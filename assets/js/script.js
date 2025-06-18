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

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = form.querySelector("input[type='email']");
  const messageContainer = document.getElementById("cta-message");

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        messageContainer.textContent = "Thanks! We'll be in touch soon.";
        form.reset();
      } else {
        messageContainer.textContent = "Oops! Something went wrong. Please try again.";
      }
    })
    .catch(() => {
      messageContainer.textContent = "Network error. Please try again later.";
    });
}
