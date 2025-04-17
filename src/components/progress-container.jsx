import vhtml from 'vhtml';
import { REVISION } from 'three';

/** @jsx vhtml */

export function ProgressContainer() {
    return (
        <div id="progress-container">
            <div id="progress-bar">
                <p>Loading Model...</p>
            </div>
        </div>
    );
}
