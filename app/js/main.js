// ////////age verification
// $(document).ready(function () {
// 	var age = {};

// 	initAge();

// 	function initAge() {
// 		var month = 0;
// 		var day = 0;
// 		var year = 0;

// 		$(".submit").on("click", function () {
// 			age["month"] = $("#age-select-month").val();
// 			age["day"] = $("#age-select--day").val();
// 			age["year"] = $("#age-select-year").val();
// 			checkDate();
// 		});
// 	}

// 	// Check to see if user entered a valid date...
// 	function checkDate() {
// 		if (age.month == "none" || age.day == "none" || age.year == "none") {
// 			alert("please try again");

// 			// changes the background color of the select if invalid
// 			if (age.month == "none") {
// 				$("#age-select-month").css("background", "rgba(223,32,44,0.5)");
// 				// Look for change of value and change background color when valid
// 				$("#age-select-month").on("change", function () {
// 					if ($("#age-select-month").val() == "none") {
// 						$("#age-select-month").css("background", "rgba(223,32,44,0.5)");
// 					} else {
// 						$("#age-select-month").css("background", "white");
// 					}
// 				});
// 			}

// 			// changes the background color of the select if invalid
// 			if (age.day == "none") {
// 				$("#age-select-day").css("background", "rgba(223,32,44,0.5)");
// 				// Look for change of value and change background color when valid
// 				$("#age-select-day").on("change", function () {
// 					if ($("#age-select-day").val() == "none") {
// 						$("#age-select-day").css("background", "rgba(223,32,44,0.5)");
// 					} else {
// 						$("#age-select-day").css("background", "white");
// 					}
// 				});
// 			}

// 			// changes the background color of the select if invalid
// 			if (age.year == "none") {
// 				$("#age-select-year").css("background", "rgba(223,32,44,0.5)");
// 				// Look for change of value and change background color when valid
// 				$("#age-select-year").on("change", function () {
// 					if ($("#age-select-year").val() == "none") {
// 						$("#age-select-year").css("background", "rgba(223,32,44,0.5)");
// 					} else {
// 						$("#age-select-year").css("background", "white");
// 					}
// 				});
// 			}
// 		} else {
// 			oldEnough();
// 		}
// 	}

// 	// Compares age entered with todays date 21 years ago...
// 	function oldEnough() {
// 		var ageLimit = moment().subtract(21, "years").calendar();
// 		var birthDate = age.month + " " + age.day + " " + age.year;
// 		var oldEnough = moment(birthDate, "MM DD YYYY").isBefore(ageLimit, "day");
// 		////////////////////////////////////////////////////////////////
// 		if (oldEnough) {
// 			//cookie.set('validAge', 'true');
// 			$("#age-gate").css("display", "none");
// 			$("body").removeClass("noscroll");
// 		} else {
// 			//cookie.set('validAge', 'false');
// 			alert("it is false");
// 		}
// 	}
// });

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
		"You must verify that you are 21 years old."
	);

	$("form").validate({
		rules: {
			"age-select-month": "required",
			"age-select-day": "required",
			"age-select-year": {
				required: true,
				twentyone: true,
			},
		},
		submitHandler: function (form) {
			// form.submit();
			alert("Success! You are over 21.");
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
