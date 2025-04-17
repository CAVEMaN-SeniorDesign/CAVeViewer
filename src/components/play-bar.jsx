import vhtml from 'vhtml';
import { REVISION } from 'three';

/** @jsx vhtml */

export function PlayBar() {
    return (
        <section>
            <div class="playControlBar" id="playControlBar">
                <button id="playBtn">
                    <img src="/images/playbtn.png" class="playpausebtn" />
                </button>
                <input type="range" min="0" max="1001" value="0" id="playSlider" />
            </div>
        </section>
    );
}
