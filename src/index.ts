import "./style.css";

import { Application, Assets } from "pixi.js";
import { Scene } from "./scene";

const gameWidth = 1920;
const gameHeight = 1080;

const app = new Application<HTMLCanvasElement>({
    backgroundColor: 0xf2d4cc,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
	let fpsMeter = document.createElement("div");
	fpsMeter.classList.add("fps-meter")
	document.body.appendChild(fpsMeter);

    await loadGameAssets();

    document.body.appendChild(app.view);

    resizeCanvas();

	const scene = new Scene(app.stage, {width: gameWidth, height: gameHeight});

	app.ticker.add((dt) => {
		scene.update(dt);
		fpsMeter.innerText = `FPS: ${app.ticker.FPS.toFixed(0)}`;
	})
};

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "init-assets",
                assets: [
					{
						alias: "fire",
						src: "./assets/Fire.png",
					},
					{
			            alias: "particle",
			            src: "./assets/particle.png",
			        },
					{
			            alias: "joker",
			            src: "./assets/card.png",
			        },
					{
			            alias: "sheldon",
			            src: "./assets/sheldon.png",
			        },
					{
			            alias: "penny",
			            src: "./assets/penny.png",
			        },
					{
			            alias: "leonard",
			            src: "./assets/leonard.png",
			        },
					{
			            alias: "satisfied",
			            src: "./assets/satisfied.png",
			        },
					{
			            alias: "sad",
			            src: "./assets/sad.png",
			        },
					{
			            alias: "neutral",
			            src: "./assets/neutral.png",
			        },
					{
			            alias: "laughing",
			            src: "./assets/laughing.png",
			        },
					{
			            alias: "intrigued",
			            src: "./assets/intrigued.png",
			        },
				],
            },
        ],
    };

    await Assets.init({ manifest });
    await Assets.loadBundle(["init-assets"]);
}

function resizeCanvas(): void {
	const canvas = app.view;
	let scaleX, scaleY, scale, center;
	scaleX = window.innerWidth / canvas.offsetWidth;
	scaleY = window.innerHeight / canvas.offsetHeight;
	scale = Math.min(scaleX, scaleY);
	canvas.style.transformOrigin = "0 0";
	canvas.style.transform = "scale(" + scale + ")";

	if(canvas.offsetWidth > canvas.offsetHeight) {
		center = canvas.offsetWidth * scale < window.innerWidth ? "horizontally" : "vertically";
	} else {
		center = canvas.offsetHeight * scale < window.innerHeight ? "vertically" : "horizontally";
	};

	let margin;
	if (center === "horizontally") {
		margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
		canvas.style .marginTop = 0 + "px";
		canvas.style .marginBottom = 0 + "px";
		canvas.style .marginLeft = margin + "px";
		canvas.style .marginRight = margin + "px";
	};
	if (center === "vertically") {
		margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
		canvas.style .marginTop  = margin + "px";
		canvas.style .marginBottom = margin + "px";
		canvas.style .marginLeft = 0 + "px";
		canvas.style .marginRight  = 0 + "px";
	};

	canvas.style.paddingLeft = 0 + "px";canvas.style.paddingRight  = 0 + "px";
	canvas.style.paddingTop  = 0 + "px";canvas.style.paddingBottom = 0 + "px";
	canvas.style.display = "-webkit-inline-box";
}

window.addEventListener("resize", resizeCanvas);
