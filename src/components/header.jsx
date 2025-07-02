import vhtml from 'vhtml';
import { REVISION } from 'three';

/** @jsx vhtml */

export function Header(page_title="CAVeViewer") {
    return (
        <header>
            <a href="/"><img src="/images/CAVEMAN_Logo_Gray_Transparent.png" alt="CAVEMAN Logo" /></a>
            <h1>{page_title}</h1>
        </header>
    );
}
