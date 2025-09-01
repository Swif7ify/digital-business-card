const businessCard = document.getElementById("businessCard");

businessCard.addEventListener("click", function (e) {
	if (e.target.closest(".social-icon, a, button, .bio-toggle, input, textarea, select, label")) {
		return;
	}

	this.classList.toggle("flipped");
});

businessCard.addEventListener("mouseenter", function () {
	this.classList.add("hover");
});

businessCard.addEventListener("mouseleave", function () {
	this.classList.remove("hover");
});

businessCard.addEventListener("keydown", function (e) {
	if (document.activeElement !== this) return;
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		this.classList.toggle("flipped");
	}
});

businessCard.setAttribute("tabindex", "0");

const bioToggle = document.getElementById("bioToggle");
const aboutText = document.getElementById("aboutText");
let showingAlt = false;

if (bioToggle && aboutText) {
	bioToggle.addEventListener("click", function () {
		if (!showingAlt) {
			aboutText.textContent =
				"Earl Romeo Ordovez is a passionate web and game developer with expertise in both frontend and backend development, specializing in creating immersive digital experiences.";
			bioToggle.textContent = "Close";
		} else {
			aboutText.textContent =
				"Passionate full-stack developer with 5+ years of experience creating innovative web solutions. Specialized in React, Node.js, and cloud technologies. Always eager to tackle new challenges and build amazing digital experiences.";
			bioToggle.textContent = "Bio";
		}
		showingAlt = !showingAlt;
	});
}
