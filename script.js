document.addEventListener("DOMContentLoaded", function () {
	const bioHeader = document.querySelector(".bio-header");
	const bioSpan = bioHeader?.nextElementSibling;
	let showingSkills = false;

	const skillsHTML = `
		<span>My Skills include  web, game & app development, 3D modelling, prototyping. My approach combines creativity with technical expertise, ensuring that every project is not only functional but also visually stunning.</span
        >
	`;
	const aboutMeHTML = `Hi, I'm Earl Romeo Ordovez, a passionate web and game developer with a knack for creating immersive digital experiences. With a strong background in both frontend and backend development.`;

	if (bioHeader && bioSpan) {
		bioHeader.addEventListener("click", function () {
			if (!showingSkills) {
				bioHeader.textContent = "My Skills ×";
				bioSpan.innerHTML = skillsHTML;
			} else {
				bioHeader.textContent = "About Me +";
				bioSpan.textContent = aboutMeHTML;
			}
			showingSkills = !showingSkills;
		});
	}
});
