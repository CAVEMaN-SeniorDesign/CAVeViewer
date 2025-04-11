import vhtml from 'vhtml';
import { REVISION } from 'three';

/** @jsx vhtml */

export function Footer() {
	return (
		<footer>
			Based on Don McCurdy's&nbsp;
			<a class="item" target="_blank" href="https://github.com/donmccurdy/three-gltf-viewer">
				three-gltf-viewer
			</a>
		</footer>
	);
}
