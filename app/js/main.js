////animations
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

//////hide/show Nav animation
let showAnim = gsap
	.from(".nav-head", {
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
