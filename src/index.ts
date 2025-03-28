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
app.renderer.resize(gameWidth, gameHeight);

window.onload = async (): Promise<void> => {
	let fpsMeter = document.createElement("div");
	fpsMeter.classList.add("fps-meter")
    await loadGameAssets();
	
    document.body.appendChild(app.view);
	document.body.appendChild(fpsMeter);

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

	scaleX = window.innerWidth / gameWidth;
	scaleY = window.innerHeight / gameHeight;
	scale = Math.min(scaleX, scaleY);
	if(scale < 1) {
		scale = 1;
	}
	canvas.style.transformOrigin = "0 0";
	canvas.style.transform = "scale(" + scale + ") translate(0, 0)";

	if(canvas.offsetWidth > canvas.offsetHeight) {
		center = canvas.offsetWidth * scale < window.innerWidth ? "horizontally" : "vertically";
	} else {
		center = canvas.offsetHeight * scale < window.innerHeight ? "vertically" : "horizontally";
	};

	let margin;
	if (center === "horizontally") {
		margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
		canvas.style.margin = `0px ${margin}px`;
	};
	if (center === "vertically") {
		margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
		canvas.style.margin = `${margin}px 0px`;
	};
}

window.addEventListener("resize", resizeCanvas);
