$(document).ready(function () {
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
		},
	});
});

///////animations
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.saveStyles(".myText, .barrels");

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
