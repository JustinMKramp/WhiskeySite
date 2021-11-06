///////////////Age Checker Modal
$(document).ready(function () {
	if (sessionStorage.getItem("advertOnce") !== "true") {
		jQuery.validator.addMethod(
			"twentyone",
			function (value, element) {
				var today = new Date(),
					dd = today.getDate(),
					mm = today.getMonth() + 1,
					yyyy = today.getFullYear();

				if ($("#age-select-year").val() == yyyy - 21) {
					if ($("#age-select-month").val() == mm) {
						if ($("#age-select-day").val() > dd) {
							return false;
						} else {
							return true;
						}
					} else if ($("#age-select-month").val() > mm) {
						return false;
					} else {
						return true;
					}
				} else if ($("#age-select-year").val() > yyyy - 21) {
					return false;
				} else {
					return true;
				}
			},
			"You must be 21 years old."
		);

		$("form").validate({
			rules: {
				month: "required",
				day: "required",
				year: {
					required: true,
					twentyone: true,
				},
			},
			submitHandler: function (form) {
				$("#age-gate").css("display", "none");
				$("body").removeClass("noscroll");
				$("#btnBurger").css("pointer-events", "auto");
				$(".hLink").css("pointer-events", "auto");
				sessionStorage.setItem("advertOnce", "true");
			},
		});
	} else {
		$("#age-gate").css("display", "none");
		$("body").removeClass("noscroll");
		$("#btnBurger").css("pointer-events", "auto");
		$(".hLink").css("pointer-events", "auto");
	}
});

////////slideshow
window.onload = function () {
	var slides = document.getElementsByClassName("card"),
		addActive = function (slide) {
			slide.classList.add("active");
		},
		removeActive = function (slide) {
			slide.classList.remove("active");
		};
	addActive(slides[0]);

	setInterval(function () {
		for (var i = 0; i < slides.length; i++) {
			if (i + 1 == slides.length) {
				addActive(slides[0]);
				slides[0].style.zIndex = 1000;
				setTimeout(removeActive, 350, slides[i]);
				break;
			}
			if (slides[i].classList.contains("active")) {
				slides[i].removeAttribute("style");
				setTimeout(removeActive, 350, slides[i]);
				addActive(slides[i + 1]);
				break;
			}
		}
	}, 3000);
};

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.saveStyles(".myText,.blackLabel, .barrels");

////////Black Label Animations
let fadeAnim = gsap
	.from(".blackLabel", {
		autoAlpha: 1,
		scrub: 1,
		duration: 2,
	})
	.progress(1);

ScrollTrigger.create({
	start: "top center",
	trigger: ".finally",
	end: "+=100000",
	onUpdate: (self) => {
		self.direction === -1 ? fadeAnim.play() : fadeAnim.reverse();
	},
});

///////paragraph animations
ScrollTrigger.matchMedia({
	// desktop
	"(min-width: 800px)": function () {
		// ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".myText",
				scrub: 5,
				end: "+=500",
				// pin: true,
			},
		});
		tl.to(".myText", { x: "-15vw" });
	},
});

///////hide/show Nav animation
let showAnim = gsap
	.from("header", {
		yPercent: -100,
		paused: true,
		duration: 0.2,
	})
	.progress(1);

ScrollTrigger.create({
	start: "top top",
	end: "+=100000",
	onUpdate: (self) => {
		self.direction === -1 ? showAnim.play() : showAnim.reverse();
	},
});

//hamburger controls
const btnBurger = document.querySelector("#btnBurger");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const fadeElems = document.querySelectorAll(".has-fade");

btnBurger.addEventListener("click", function () {
	if (header.classList.contains("open")) {
		body.classList.remove("noscroll");
		header.classList.remove("open");
		fadeElems.forEach(function (element) {
			element.classList.remove("fade-in");
			element.classList.add("fade-out");
		});
	} else {
		header.classList.add("open");
		fadeElems.forEach(function (element) {
			body.classList.add("noscroll");
			element.classList.add("fade-in");
			element.classList.remove("fade-out");
			element.classList.remove("has-fade");
		});
	}
});
