import { Container, Graphics, Text } from "pixi.js";
import { PhoenixFlame } from "./flame";
import { AceOfShadows } from "./aceOfShadows";
import { MagicWords } from './magicWords';
import { Base } from "./base"

type Point = {
	x: number,
	y: number
}

export class Scene {

	private stage: Container;
	private magicWordButton: Container;
	private aceButton: Container;
	private flameButton: Container;
	private states: { [key: string]: Base};
	private state: Base | null =  null;

	constructor(stage: Container, size: {width: number, height: number}) {
		this.stage = stage;

		const buttons = new Container();
		buttons.position.set(size.width / 2, 50);

		this.magicWordButton = this.createButton(0x8dd7bf, "Magic Of Words", {x: -300, y: 0}, buttons);
		this.aceButton = this.createButton(0xff60ab, "Ace Of Shadows", {x: 0, y: 0}, buttons);
		this.flameButton = this.createButton(0xfc6238, "Phoenix Flame", {x: 300, y: 0}, buttons);

		this.states = {
			MagicWord: new MagicWords(this.stage, {x: size.width / 2 + 50, y: 80}),
			AceShadows: new AceOfShadows(this.stage, {x: 650, y: 350}, 144, 1),
			PhoenixFlame: new PhoenixFlame(this.stage, {x: size.width / 2 , y: 500})
		};

		this.setState(this.states.MagicWord);
		let minScale = 0.88;
		this.magicWordButton.scale.set(minScale);

		this.magicWordButton.on("pointerup", () => {
			if(this.state?.getName() != "MagicWords") {
				this.resetButtons();
				this.magicWordButton.scale.set(minScale);
				this.setState(this.states.MagicWord);
			}
		});
		this.aceButton.on("pointerup", () => {
			if(this.state?.getName() != "AceOfShadows") {
				this.resetButtons();
				this.aceButton.scale.set(minScale);
				this.setState(this.states.AceShadows);
			}
		});
		this.flameButton.on("pointerup", () => {
			if(this.state?.getName() != "PhoenixFlame") {
				this.resetButtons();
				this.flameButton.scale.set(minScale);
				this.setState(this.states.PhoenixFlame);
			}
		});

		this.stage.addChild(buttons);
	}

	public update(dt: number) {
		if(this.state) {
			this.state.update(dt);
		}
	}

	private resetButtons(): void {
		this.magicWordButton.scale.set(1);
		this.flameButton.scale.set(1);
		this.aceButton.scale.set(1);
	}

	private setState(state: Base) {
		if(this.state) {
			this.state.reset();
		}
		this.state = state;
		this.state.start();
	}

	private createButton(color: number, label: string, pos: Point, container: Container): Container {
		const c = new Container();
		
		let size = { width: 250, height: 70 };
		const btn = new Graphics()
		btn.beginFill(color);
		btn.drawRoundedRect(0, 0, size.width, size.height, 5);
		btn.pivot.x = size.width / 2;
		btn.pivot.y = size.height / 2;
		c.addChild(btn);
		
		const t = new Text(label, {
			"fill": "#ffffff",
			"stroke": "#f0eaea",
			"strokeThickness": 2
		});
		t.anchor.set(0.5);
		c.addChild(t);

		c.interactive = true;
	
		c.position.set(pos.x, pos.y);
		container.addChild(c);
	
		return c;
	}
}