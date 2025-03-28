import * as particles from '@pixi/particle-emitter'
import { Container, Texture, ParticleContainer } from "pixi.js";
import { Base } from './base';

const oldConfig = {
	"alpha": {
		"start": 0.66,
		"end": 0.1
	},
	"scale": {
		"start": 0.25,
		"end": 1.15,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#fff191",
		"end": "#ff622c"
	},
	"speed": {
		"start": 100,
		"end": 10,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 270,
		"max": 275
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 1
	},
	"lifetime": {
		"min": 0.1,
		"max": 2
	},
	"blendMode": "add",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 100,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "circle",
	"spawnCircle": {
		"x": 0,
		"y": 200,
		"r": 70
	}
};

export class PhoenixFlame extends Base {

	private emitter: particles.Emitter;

	constructor(stage: Container, pos: {x: number, y: number}) {
		super(stage, pos);

		this.name = "PhoenixFlame";

		this.container = new ParticleContainer();
		this.stage.addChild(this.container);
		this.emitter = new particles.Emitter(this.container, particles.upgradeConfig(oldConfig, [Texture.from("fire")]));
		this.emitter.updateOwnerPos(this.pos.x, this.pos.y);

		this.container = new ParticleContainer(100, {
			scale: true,
			position: true,
			rotation: true,
			alpha: true
		});
		this.stage.addChild(this.container);

	}

	public start(): void {
		super.start();
	}

	public reset(): void {
		super.reset();
		this.emitter.cleanup();
	}

	public update(dt: number) {
		if(this.isStarted && this.emitter) {
			this.emitter.update(dt *  0.01)
		}
	}
}