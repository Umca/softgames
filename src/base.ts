import { Container } from "pixi.js"

export class Base {

	protected container: Container;
	protected isStarted: boolean;
	protected stage: Container
	protected pos: {x: number, y: number};
	protected name: string = "";

    constructor(stage: Container, pos: {x: number, y: number}) {
		this.stage = stage;
		this.container = new Container();
		this.pos = pos;
		this.container.position.set(pos.x, pos.y);
		this.stage.addChild(this.container);
		this.isStarted = false;
		this.container.visible = false;
	}

	public getName(): string {
		return this.name;
	}

	public getContainer(): Container {
		return this.container;
	}

    public start() {
		this.container.visible = true;
		this.isStarted = true;
	}

	public update(dt: number) {}

    public reset() {
		this.isStarted = false;
		this.container.visible = false;
	}

}
