export class FrameComponent extends HTMLElement {
	readonly template = document.createElement('template');
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'closed' });
		this.template.innerHTML = `
		<div style="position:relative">
		<slot name="lyrics"></slot>
		</div>`;

		shadow.appendChild(this.template.content.cloneNode(true));
	}

	connectedCallback() {
		console.log("connected");
	}
}
