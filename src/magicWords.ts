import { Container, Sprite, Text } from "pixi.js";
import { Base } from "./base";

type User = {
	name: string,
	avatar: string,
	position: "left" | "right"
};

type Remark = {
	user: User,
	text: string
};

type Node = {
	value: Text | Sprite,
	width: number,
	height: number
};

export class MagicWords extends Base {

	private dialogue: Remark[];
	private users: { [name: string]: User };

	constructor(stage: Container, pos: {x: number, y: number}) {
		super(stage, pos);

		this.name = "MagicWords";

		this.users = {
			sheldon: {
				name: "Sheldon",
				avatar: "sheldon",
				position: "left"
			},
			penny: {
				name: "Penny",
				avatar: "penny",
				position: "left"
			},
			leonard: {
				name: "Leonard",
				avatar: "leonard",
				position: "right"
			}
		};

		this.dialogue = [
			{user: this.users.sheldon, "text": "I admit {satisfied} the design of Cookie Crush is quite elegant in its simplicity."},
			{user: this.users.leonard, "text": "That’s practically a compliment, Sheldon. {intrigued} Are you feeling okay?"},
			{user: this.users.penny, "text": "Don’t worry, Leonard. He’s probably just trying to justify playing it himself."},
			{user: this.users.sheldon, "text": "Incorrect. {neutral} I’m studying its mechanics. The progression system is oddly satisfying."},
			{user: this.users.penny, "text": "It’s called fun, Sheldon. You should try it more often."},
			{user: this.users.leonard, "text": "She’s got a point. Sometimes, a simple game can be relaxing."},
			{user: this.users.sheldon, "text": "Relaxing? I suppose there’s merit in low-stakes gameplay to reduce cortisol levels."},
			{user: this.users.penny, "text": "Translation: Sheldon likes crushing cookies but won’t admit it. {laughing}"},
			{user: this.users.sheldon, "text": "Fine. I find the color-matching oddly soothing. Happy?"},
			{user: this.users.leonard, "text": "Very. Now we can finally play as a team in Wordscapes."},
			{user: this.users.penny, "text": "Wait, Sheldon’s doing team games now? What’s next, co-op decorating?"},
			{user: this.users.sheldon, "text": "Unlikely. But if the design involves symmetry and efficiency, I may consider it."},
			{user: this.users.penny, "text": "See? Casual gaming brings people together!"},
			{user: this.users.leonard, "text": "Even Sheldon. That’s a win for everyone. {satisfied}"},
			{user: this.users.sheldon, "text": "Agreed. {neutral} Though I still maintain chess simulators are superior."},
			{user: this.users.penny, "text": "Sure, Sheldon. {intrigued} You can play chess *after* we beat this next level."}
		];

		this.renderRemarks();
		this.container.pivot.x = this.container.width / 2;
		this.container.scale.set(0.6);
		this.container.cacheAsBitmap = true;
	}

	private createRemark(remark: Remark): Container
	{
		const parsed = this.parseRemarkText(remark.text);
		const container = this.renderRemark(parsed, remark.user.avatar);

		return container;
	}

	private parseRemarkText(text: string): Node[] {
		const nodes: Node[] = [];
		let isEmojiFound = false;
		let str = "";

		for(let i = 0; i < text.length; i++) {
			const char = text[i];

			if(char === "{") {
				isEmojiFound = true;

				if(str) {
					let {text, width, height} = this.createText(str);
					nodes.push({
						value: text,
						width,
						height
					});
					str = "";
				}

				continue;
			}

			if(char === "}") {
				isEmojiFound = false;
				let { sprite, width, height } = this.createEmodjiSprite(str);
				nodes.push({
					value: sprite,
					width,
					height
				});
				str = "";

				continue;
			}

			str += char;
		}

		if(str) {
			let {text, width, height} = this.createText(str);
			nodes.push({
				value: text,
				width,
				height
			});
			str = "";
		}

		return nodes;
	}

	private createText(text: string): {text: Text, width: number, height: number} {
		let t = new Text(text);
		t.anchor.y = 0.5;

		return { 
			text: t, 
			width: t.width,
			height: t.height
		};
	}

	private createEmodjiSprite(image: string): {sprite: Sprite, width: number, height: number} {
		let sprite = Sprite.from(image);
		sprite.scale.set(0.5);
		sprite.anchor.y = 0.5;

		let { width, height } = sprite;

		return {
			sprite,
			width,
			height
		};
	}

	private renderRemark(nodes: Node[], avatar: string): Container {
		const sp = Sprite.from(avatar);
		const container = new Container();
		sp.anchor.y = 0.5;
		container.addChild(sp);

		let prevNode: Node = {
			value: sp,
			width:sp.width,
			height:sp.height
		};

		nodes.forEach(node => {
			if(prevNode) {
				node.value.x = prevNode.value.x + prevNode.width
			} else {
				node.value.x = 0;
			}
			prevNode = node;
			container.addChild(node.value);
		});

		return container;
	}

	private renderRemarks() {
		const height = 100;
		const xShift = 200;

		this.dialogue.forEach((remark, i) => {
			const position = remark.user.position;
			let container = this.createRemark(remark);
			container.y = height * (i + 1);
			if(position === "right") {
				container.x = xShift;
			}
			this.container.addChild(container);
		});
	}

}
