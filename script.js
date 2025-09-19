document.addEventListener("DOMContentLoaded", function () {
	initializeTheme();
	initializeNavigation();
	initializeGreeting();
	initializeAnimations();
	initializeFormValidation();
	initializeColorChanger();
});

function initializeTheme() {
	const themeToggleBtn = document.getElementById("theme-toggle");
	const bodyEl = document.body;
	const savedTheme = localStorage.getItem("theme") || "dark";

	bodyEl.setAttribute("data-theme", savedTheme);
	updateThemeIcon(savedTheme);

	themeToggleBtn.addEventListener("click", function () {
		const currentTheme = bodyEl.getAttribute("data-theme");
		const newTheme = currentTheme === "dark" ? "light" : "dark";
		bodyEl.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
		updateThemeIcon(newTheme);
		bodyEl.style.transition = "all 0.3s ease";
		setTimeout(() => {
			bodyEl.style.transition = "";
		}, 300);
	});
}

function updateThemeIcon(theme) {
	const themeToggleBtn = document.getElementById("theme-toggle");
	themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}
 
function initializeNavigation() {
	const navToggleBtn = document.getElementById("nav-toggle");
	const navMenu = document.getElementById("nav-menu");

	navToggleBtn.addEventListener("click", function () {
		navMenu.classList.toggle("active");
		navToggleBtn.classList.toggle("active");
	});

	document.querySelectorAll(".nav-link").forEach((link) => {
		link.addEventListener("click", function () {
			navMenu.classList.remove("active");
			navToggleBtn.classList.remove("active");
		});
	});

	document.addEventListener("click", function (event) {
		if (!navToggleBtn.contains(event.target) && !navMenu.contains(event.target)) {
			navMenu.classList.remove("active");
			navToggleBtn.classList.remove("active");
		}
	});
}

function initializeGreeting() {
	const greetingEl = document.getElementById("greeting");
	const now = new Date();
	const hour = now.getHours();
	let greetingText, greetingEmoji;

	if (hour >= 5 && hour < 12) {
		greetingText = "Good Morning";
		greetingEmoji = "🌅";
	} else if (hour >= 12 && hour < 17) {
		greetingText = "Good Afternoon";
		greetingEmoji = "☀️";
	} else if (hour >= 17 && hour < 21) {
		greetingText = "Good Evening";
		greetingEmoji = "🌆";
	} else {
		greetingText = "Good Night";
		greetingEmoji = "🌙";
	}

	if (greetingEl) greetingEl.innerHTML = `${greetingEmoji} ${greetingText}!`;
}

function getGreetingParts() {
	const now = new Date();
	const hour = now.getHours();
	let greetingText, greetingEmoji;

	if (hour >= 5 && hour < 12) {
		greetingText = "Good Morning";
		greetingEmoji = "🌅";
	} else if (hour >= 12 && hour < 17) {
		greetingText = "Good Afternoon";
		greetingEmoji = "☀️";
	} else if (hour >= 17 && hour < 21) {
		greetingText = "Good Evening";
		greetingEmoji = "🌆";
	} else {
		greetingText = "Good Night";
		greetingEmoji = "🌙";
	}

	return { greeting: greetingText, emoji: greetingEmoji };
}

function openWelcomeModal() {
	const modalEl = document.getElementById("welcome-modal");
	const titleEl = document.getElementById("welcome-title");
	const bodyEl = document.getElementById("welcome-body");
	const { greeting, emoji } = getGreetingParts();

	if (titleEl) titleEl.textContent = `${emoji} ${greeting}!`;
	if (bodyEl)
		bodyEl.textContent =
			"Welcome to my portfolio. I'm Earl Romeo Ordovez, a passionate web and game developer. Thanks for visiting! 🚀";

	if (modalEl) {
		modalEl.classList.add("active");
		modalEl.setAttribute("aria-hidden", "false");
		const okBtn = document.getElementById("modal-ok");
		if (okBtn) okBtn.focus();
	}
}

function closeWelcomeModal() {
	const modalEl = document.getElementById("welcome-modal");
	if (modalEl) {
		modalEl.classList.remove("active");
		modalEl.setAttribute("aria-hidden", "true");
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const modalEl = document.getElementById("welcome-modal");
	const modalCloseBtn = document.getElementById("modal-close");
	const modalOkBtn = document.getElementById("modal-ok");

	if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeWelcomeModal);
	if (modalOkBtn) modalOkBtn.addEventListener("click", closeWelcomeModal);

	if (modalEl) {
		modalEl.addEventListener("click", function (event) {
			if (event.target === modalEl) closeWelcomeModal();
		});
	}

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") closeWelcomeModal();
	});
});

function initializeColorChanger() {
	const colorBtn = document.getElementById("color-change-btn");
	const heroTitle = document.querySelector(".hero h1");
	const palette = ["#ea580c", "#dc2626", "#7c3aed", "#059669", "#0ea5e9", "#f59e0b"];
	let currentIndex = 0;

	if (!colorBtn || !heroTitle) return;

	colorBtn.addEventListener("click", function () {
		currentIndex = (currentIndex + 1) % palette.length;
		const nextColor = palette[currentIndex];
		document.documentElement.style.setProperty("--primary-color", nextColor);

		heroTitle.style.transform = "scale(1.05)";
		heroTitle.style.transition = "transform 0.3s ease";
		setTimeout(() => {
			heroTitle.style.transform = "scale(1)";
		}, 300);

		colorBtn.textContent = "Color Changed!";
		setTimeout(() => {
			colorBtn.textContent = "Change Text Color";
		}, 1500);
	});
}

function initializeAnimations() {
	const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	}, observerOptions);

	const animatedElements = document.querySelectorAll(".section-title, .social-card, .about-text");

	animatedElements.forEach((el) => {
		el.classList.add("fade-in");
		observer.observe(el);
	});
}

function initializeFormValidation() {
	const formEl = document.getElementById("contact-form");
	const nameInput = document.getElementById("name");
	const emailInput = document.getElementById("email");
	const messageInput = document.getElementById("message");

	if (!formEl) return;

	formEl.addEventListener("submit", function (event) {
		event.preventDefault();
		let isValid = true;
		clearErrors();

		if (!nameInput || nameInput.value.trim().length < 2) {
			showError("name-error", "Name must be at least 2 characters long");
			isValid = false;
		}

		if (!emailInput || !isValidEmail(emailInput.value.trim())) {
			showError("email-error", "Please enter a valid email address");
			isValid = false;
		}

		if (!messageInput || messageInput.value.trim().length < 10) {
			showError("message-error", "Message must be at least 10 characters long");
			isValid = false;
		}

		if (isValid) {
			showSuccessMessage();
			event.target.reset();
		}
	});

	if (nameInput) {
		nameInput.addEventListener("blur", function () {
			if (this.value.trim().length > 0 && this.value.trim().length < 2) {
				showError("name-error", "Name must be at least 2 characters long");
			} else clearError("name-error");
		});
	}

	if (emailInput) {
		emailInput.addEventListener("blur", function () {
			if (this.value.trim().length > 0 && !isValidEmail(this.value.trim())) {
				showError("email-error", "Please enter a valid email address");
			} else clearError("email-error");
		});
	}

	if (messageInput) {
		messageInput.addEventListener("blur", function () {
			if (this.value.trim().length > 0 && this.value.trim().length < 10) {
				showError("message-error", "Message must be at least 10 characters long");
			} else clearError("message-error");
		});
	}
}

function showError(elementId, message) {
	const el = document.getElementById(elementId);
	if (!el) return;
	el.textContent = message;
	el.style.display = "block";
}

function clearError(elementId) {
	const el = document.getElementById(elementId);
	if (!el) return;
	el.textContent = "";
	el.style.display = "none";
}

function clearErrors() {
	document.querySelectorAll(".error-message").forEach((el) => {
		el.textContent = "";
		el.style.display = "none";
	});
}

function isValidEmail(value) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(value);
}

function showSuccessMessage() {
	alert("Thank you for your message! I'll get back to you soon. 🚀");
}

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
	anchor.addEventListener("click", function (event) {
		event.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			const navbarHeight = document.querySelector(".navbar").offsetHeight;
			const scrollTo = target.offsetTop - navbarHeight - 20;
			window.scrollTo({ top: scrollTo, behavior: "smooth" });
		}
	});
});

window.addEventListener("scroll", function () {
	const nav = document.querySelector(".navbar");
	const theme = document.body.getAttribute("data-theme") || "dark";
	const scrolled = window.scrollY > 50;

	const darkBg = scrolled ? "rgba(17,17,17,0.98)" : "rgba(17,17,17,0.95)";
	const lightBg = scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)";
	const blurValue = scrolled ? "blur(15px)" : "blur(10px)";

	if (nav) {
		nav.style.background = theme === "light" ? lightBg : darkBg;
		nav.style.backdropFilter = blurValue;
	}
});

function typeWriter(targetEl, html, speed = 100) {
	if (!targetEl) return;
	targetEl.innerHTML = "";
	let index = 0;

	function step() {
		if (index >= html.length) return;

		if (html[index] === "<") {
			const end = html.indexOf(">", index);
			const tag = end === -1 ? html.slice(index) : html.slice(index, end + 1);
			targetEl.innerHTML += tag;
			index += tag.length;
			setTimeout(step, 0);
		} else {
			targetEl.innerHTML += html.charAt(index);
			index++;
			setTimeout(step, speed);
		}
	}

	step();
}

window.addEventListener("load", function () {
	const heroTitle = document.querySelector(".hero h1");
	if (heroTitle) {
		const originalHTML = heroTitle.innerHTML;
		setTimeout(() => {
			typeWriter(heroTitle, originalHTML, 50);
		}, 1000);
	}
});

let konamiBuffer = [];
const konamiSequence = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"KeyB",
	"KeyA",
];

document.addEventListener("keydown", function (event) {
	konamiBuffer.push(event.code);
	konamiBuffer = konamiBuffer.slice(-konamiSequence.length);
	if (konamiBuffer.join(",") === konamiSequence.join(",")) {
		triggerEasterEgg();
	}
});

function triggerEasterEgg() {
	alert("🎉 Konami Code activated! You found the easter egg! 🎮");
	document.body.style.animation = "rainbow 2s infinite";
	setTimeout(() => {
		document.body.style.animation = "";
	}, 5000);
}
