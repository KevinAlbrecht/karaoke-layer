import { FrameComponent } from "./frame-component";
import { LyricsComponent } from "./lyrics-component";

export function initDefines() {
	customElements.define('app-frame', FrameComponent);
	customElements.define('app-lyrics', LyricsComponent);
}