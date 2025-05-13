function addRecommendation() {
  const newRecommendation = document.getElementById("new_recommendation").value;
  const recommendationsContainer = document.getElementById("all_recommendations");

  const newRecDiv = document.createElement("div");
  newRecDiv.classList.add("recommendation");
  newRecDiv.innerHTML = `<span>&#8220;</span>${newRecommendation}<span>&#8221;</span>`;

  recommendationsContainer.appendChild(newRecDiv);

  // Clear the textarea
  document.getElementById("new_recommendation").value = "";

  // Show popup
  showPopup(true);
}

function showPopup(show) {
  const popup = document.getElementById("popup");
  popup.style.display = show ? "block" : "none";
}

// Add event listener for scrolling to animate skill images
document.addEventListener("scroll", function () {
  const skills = document.querySelectorAll(".skill");
  skills.forEach((skill) => {
    if (isElementInViewport(skill)) {
      skill.classList.add("animated");
    }
  });
});

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
