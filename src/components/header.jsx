import vhtml from 'vhtml';
import { REVISION } from 'three';

/** @jsx vhtml */

export function Header() {
    return (
        <header>
            <img src="/images/CAVEMAN_Logo_Gray_Transparent.png" alt="CAVEMAN Logo" />
            <h1><a href="/">CAVeViewer</a></h1>
        </header>
    );
}
