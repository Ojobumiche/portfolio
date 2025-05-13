document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("recommend_btn").addEventListener("click", addRecommendation);

  // Scroll event for animating skills
  document.addEventListener("scroll", () => {
    const skills = document.querySelectorAll(".skill");
    skills.forEach(skill => {
      if (isElementInViewport(skill)) {
        skill.classList.add("animated");
      }
    });
  });
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
  popup.style.display = show ? "block" : "none";
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

document.getElementById("cta-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("client_email").value.trim();

  if (email) {
    document.getElementById("cta-message").textContent =
      "Thanks! We’ll be in touch soon.";
    document.getElementById("client_email").value = "";

    // Here you could also add logic to send the email to your backend or a service like Formspree
  } else {
    document.getElementById("cta-message").textContent =
      "Please enter a valid email address.";
  }
});
