import vhtml from 'vhtml';
import { REVISION } from 'three';

/** @jsx vhtml */

export function ProgressContainer() {
    return (
    <div id="progress-container" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:60%; z-index:10; background-color: #191919;">
        <p>Loading Model...</p>
        <div class="progress">
            <div id="progress-bar" class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar" style="width: 0%" aria-valuenow="0"
                aria-valuemin="0" aria-valuemax="100">
                0%
            </div>
        </div>
    </div>
    );
}
