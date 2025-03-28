import { Container, Sprite } from "pixi.js";
import { Base } from "./base";

type Card = {
	sprite: Sprite,
	toBeRemoved: boolean,
	zIndex: number
}

export class AceOfShadows extends Base {
	
	private cardAmount: number;
	private cardObjects: Card[] = [];
	private movingCards: Card[] = [];
	private time: number;
	private cardCounter: number;
	private nextZIndex: number;
	private delay: number;

	constructor(stage: Container, pos: {x: number, y: number}, amount: number, delay: number) {
		super(stage, pos);

		this.name = "AceOfShadows";
		
		this.delay = delay;
		this.cardAmount = amount;
		this.container.sortableChildren = true;

		this.createCards();

		this.time = 0;
		this.nextZIndex = this.cardAmount - 1;
		this.cardCounter = this.cardAmount - 1;
	}

	private createCards() {
		for(let i = 0; i < this.cardAmount; i++) {
			let sprite = Sprite.from('joker');
			sprite.y -= i;
			sprite.zIndex = i;
			this.container.addChild(sprite);

			let y = sprite.y - this.cardAmount;
			this.cardObjects.push({
				sprite,
				toBeRemoved: false,
				zIndex: i
			})
		}
	}

	public start() {
		super.start();

		this.movingCards.push(this.cardObjects[this.cardCounter]);
	}

	public update(dt: number) {
		if(!this.isStarted) {
			return;
		}

		dt /= 60;
		this.movingCards.forEach(card => {
			card.sprite.x += dt / 2 * 400;
			if(card.sprite.x >= 400)
			{
				card.sprite.x = 400;
				card.toBeRemoved = true;
			}
		})

		this.time += dt;

		if(this.time > this.delay)
		{
			this.time = 0;
			this.cardCounter--;
			if(this.cardCounter >= 0) {
				this.nextZIndex++;
				this.cardObjects[this.cardCounter].sprite.zIndex = this.nextZIndex;
				this.movingCards.push(this.cardObjects[this.cardCounter]);
			}
		}

		this.movingCards = this.movingCards.filter(card => !card.toBeRemoved);

		if(!this.movingCards.length) {
			this.isStarted = false;
		}
	}

	public reset() {
		super.reset();

		this.time = 0;
		this.cardCounter = this.cardAmount - 1;
		this.movingCards = [];
		this.cardObjects.forEach(card => {
			card.sprite.x = 0;
			card.toBeRemoved = false;
			let old = card.sprite.zIndex;
			if(card.sprite.zIndex != card.zIndex) {
				card.sprite.zIndex = card.zIndex;
			}
		});

		this.container.sortChildren();
	}
}

// export function cards(): any
// {
// 	const container = new Container();
// 	container.position.set(100, 200)
// 	container.sortableChildren = true;

// 	const amount = 50;
// 	const cardObjects: Card[] = [];

// 	for(let i = 0; i < amount; i++)
// 	{
// 		let sprite = Sprite.from('joker');
// 		sprite.y -= i;
// 		cardObjects.push({
// 			sprite,
// 			toBeRemoved:false,
// 			endY: sprite.y + amount
// 		})
// 		container.addChild(sprite);
// 	}

// 	let delay = 1;
// 	let animationDuration = 20;
// 	let cardIndex = amount - 1;
// 	let next = true;
// 	let time = 0;
// 	let movingCards: Card[] = [cardObjects[cardIndex]]
// 	let c = 15
// 	cardObjects[cardIndex].sprite.zIndex = c;
// 	movingCards.push();


// 	function update(dt: any)
// 	{
// 		if(!movingCards.length) return;

// 		dt /= 60;
// 		movingCards.forEach(card => {
// 			card.sprite.x += dt * 400;
// 			if(card.sprite.y !== card.endY)
// 			{
// 				card.sprite.y = card.endY;
// 			}
// 			if(card.sprite.x >= 400)
// 			{
// 				card.sprite.x = 400;
// 				card.toBeRemoved = true;
// 			}
// 		})

// 		time+=dt;
// 		if(time > delay)
// 		{
// 			time = 0;
// 			cardIndex--;
// 			if(cardIndex >= 0)
// 			{
// 				c++;
// 				cardObjects[cardIndex].sprite.zIndex = c;
// 				movingCards.push(cardObjects[cardIndex]);
// 			}
// 		}

// 		movingCards = movingCards.filter(card => !card.toBeRemoved);
// 	}	

// 	return { container, update };
// }