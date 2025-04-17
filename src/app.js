import { Vector3 } from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { Viewer } from './viewer.js';
import { ProgressContainer } from './components/progress-container.jsx';
import { Header } from './components/header.jsx';
import { Main } from './components/main.jsx';
import { PlayBar } from './components/play-bar.jsx';
import { Footer } from './components/footer';
import queryString from 'query-string';

window.VIEWER = {};


if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
	console.error('The File APIs are not fully supported in this browser.');
} else if (!WebGL.isWebGLAvailable()) {
	console.error('WebGL is not supported in this browser.');
}

class App {
	/**
	 * @param  {Element} el
	 * @param  {Location} location
	 * @param  {String} filepath
	 * @param  {Vector3} startPos
	 * @param  {Vector3} endPos
	 * @param  {Vector3} lookAtVec
	 */
	constructor(el, location, filepath, startPos, endPos, lookAtVec) {
		const hash = location.hash ? queryString.parse(location.hash) : {};
		this.options = {
			kiosk: Boolean(hash.kiosk),
			model: hash.model || '',
			preset: hash.preset || '',
			cameraPosition: hash.cameraPosition ? hash.cameraPosition.split(',').map(Number) : null,
		};

		this.viewer = null;
		this.viewerEl = null;
		this.dropEl = el.querySelector('.dropzone');

		this.filepath = filepath;
		this.startPos = startPos;
		this.endPos = endPos;
		this.lookAtVec = lookAtVec;

		const options = this.options;

		if (options.kiosk) {
			const headerEl = document.querySelector('header');
			headerEl.style.display = 'none';
		}

		if (options.model) {
			this.view(options.model, '', new Map());
		}

		// Test loading .glb file
		fetch(new URL(this.filepath, import.meta.url))
			.then(response => {
				response.arrayBuffer().then(buffer => {
					let filemap = new Map();
					filemap.set(this.filepath, new File([buffer], this.filepath));
					this.load(filemap);

					const loadingDiv = document.getElementById("progress-container");
					loadingDiv.setAttribute('hidden', '');
				})
			})
			.catch(error => {
				console.error('Error loading file:', error);
			});
	}

	/**
	 * Sets up the view manager.
	 * @return {Viewer}
	 */
	createViewer() {
		this.viewerEl = document.createElement('div');
		this.viewerEl.classList.add('viewer');
		this.dropEl.innerHTML = '';
		this.dropEl.appendChild(this.viewerEl);
		this.viewer = new Viewer(this.viewerEl, this.options, this.startPos, this.endPos, this.lookAtVec);
		return this.viewer;
	}

	/**
	 * Loads a fileset provided by user action.
	 * @param  {Map<string, File>} fileMap
	 */
	load(fileMap) {
		let rootFile;
		let rootPath;
		Array.from(fileMap).forEach(([path, file]) => {
			if (file.name.match(/\.(gltf|glb)$/)) {
				rootFile = file;
				rootPath = path.replace(file.name, '');
			}
		});

		if (!rootFile) {
			this.onError('No .gltf or .glb asset found.');
		}

		this.view(rootFile, rootPath, fileMap);
	}

	/**
	 * Passes a model to the viewer, given file and resources.
	 * @param  {File|string} rootFile
	 * @param  {string} rootPath
	 * @param  {Map<string, File>} fileMap
	 */
	view(rootFile, rootPath, fileMap) {
		if (this.viewer) this.viewer.clear();

		const viewer = this.viewer || this.createViewer();

		const fileURL = typeof rootFile === 'string' ? rootFile : URL.createObjectURL(rootFile);

		const cleanup = () => {
			if (typeof rootFile === 'object') URL.revokeObjectURL(fileURL);
		};

		viewer
			.load(fileURL, rootPath, fileMap)
			.catch((e) => this.onError(e))
			.then((gltf) => {
				cleanup();
			});
	}

	/**
	 * @param  {Error} error
	 */
	onError(error) {
		let message = (error || {}).message || error.toString();
		if (message.match(/ProgressEvent/)) {
			message = 'Unable to retrieve this file. Check JS console and browser network tab.';
		} else if (message.match(/Unexpected token/)) {
			message = `Unable to parse file content. Verify that this file is valid. Error: "${message}"`;
		} else if (error && error.target && error.target instanceof Image) {
			message = 'Missing texture: ' + error.target.src.split('/').pop();
		}
		window.alert(message);
		console.error(error);
	}
}

document.body.innerHTML += ProgressContainer();
document.body.innerHTML += Header();
document.body.innerHTML += Main();
document.body.innerHTML += PlayBar();
document.body.innerHTML += Footer();

document.addEventListener('DOMContentLoaded', () => {
	const app = new App(document.body, location, "/3d-assets/texturedMesh.glb", new Vector3(.5, .41666, 1.93), new Vector3(-.404, -.3164, -1.54), new Vector3(-.5137, -.392, -1.96));

	window.VIEWER.app = app;

	console.info('[glTF Viewer] Debugging data exported as `window.VIEWER`.');

	console.log(document)
});
