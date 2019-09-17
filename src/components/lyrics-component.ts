export class LyricsComponent extends HTMLElement {
	readonly template = document.createElement('template');
	private _play: boolean = false;
	private shadow: ShadowRoot;

	public canvas: HTMLCanvasElement;
	public context: CanvasRenderingContext2D;
	public x: number;
	public y: number;
	public txt = 'キミと見上げたあの夢に今日は';
	public w = 0;
	public clearH = 200;
	public clearY = 5;
	public clearX = 8;

	_videoSlot: HTMLElement;

	constructor() {
		super();
		this.template.innerHTML = `
		<div style="position:relative">
			<div>
				<slot name="video">
			</div>
			<div style="position:absolute;top:0;" >
				<canvas width="700" height="335" id="lyrics-canvas"/>
			</div>
		</div>`;

		this.shadow = this.attachShadow({ mode: 'closed' });
		this.shadow.appendChild(this.template.content.cloneNode(true));
		this._onSlotChange = this._onSlotChange.bind(this);

		this._videoSlot = this.shadow.querySelector('slot[name=video]');
	}

	connectedCallback() {
		this._videoSlot.addEventListener('slotchange', this._onSlotChange);
		this.initValues()
	}

	_onSlotChange(e: any) {
		const vid = document.getElementById("player");
		vid.onpause = () => this.play = false;
		vid.onplay = () => this.play = true;
	}

	get play() {
		return this._play;
	}

	set play(value: boolean) {
		this._play = value;
	}

	private runText() {
		if (this._play) {
			if (this.w > 500) {
				console.log("clear")
				this.context.clearRect(this.clearX, this.clearY, this.w, this.clearH);
				this.w = 0;
			}
			if (this.w === 0) {
				this.context.fillStyle = 'lightblue';
				this.context.strokeText(this.txt, this.x, this.y);
				this.context.fillText(this.txt, this.x, this.y);
				this.context.fillStyle = 'red';
			}

			this.context.save();
			this.context.beginPath();
			this.context.clearRect(this.clearX, this.clearY, this.w, this.clearH);
			this.context.rect(this.clearX, this.clearY, this.w, this.clearH);
			this.context.clip();
			this.context.strokeStyle = 'white';
			this.context.strokeText(this.txt, this.x, this.y);
			this.context.fillText(this.txt, this.x, this.y);
			this.context.restore();

			this.w++;
		} else { }
		window.requestAnimationFrame(this.runText.bind(this));
	}

	private initValues() {
		this.canvas = this.shadow.getElementById('lyrics-canvas') as HTMLCanvasElement;
		this.context = this.canvas.getContext('2d');
		this.x = this.canvas.width / 4;
		this.y = this.canvas.height / 2;

		this.initKaraoke();
	}

	private initKaraoke() {

		window.requestAnimationFrame = (function () {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				(<any>window).mozRequestAnimationFrame ||
				function (callback: any) {
					window.setTimeout(callback, 1000 / 60);
				};
		})();

		this.context.font = 'bold 20px sans-serif';
		// textAlign aligns text horizontally relative to placement
		this.context.textAlign = 'left';
		// textBaseline aligns text vertically relative to font style
		this.context.textBaseline = 'middle';
		this.context.lineWidth = 4;
		this.context.strokeStyle = 'black';

		//debug
		this.context.moveTo(0, 0);

		this.runText();
	}
}
