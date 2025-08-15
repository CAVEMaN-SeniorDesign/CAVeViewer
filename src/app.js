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
	constructor(el, location, filepath, startPos, endPos, lookAtVec, showControls, autoRotateModel, playBarEnable) {
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
		this.showControls = showControls;
        this.autoRotateModel = autoRotateModel;
		this.playBarEnable = playBarEnable;
		console.log(this.playBarEnable);

		const options = this.options;

		if (options.kiosk) {
			const headerEl = document.querySelector('header');
			if (headerEl) {
				headerEl.style.display = 'none';
			}
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
					if (loadingDiv) {
						loadingDiv.setAttribute('hidden', '');
						clearInterval(intervalId);
					}
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
		this.viewer = new Viewer(this.viewerEl, this.options, this.startPos, this.endPos, this.lookAtVec, this.showControls, this.autoRotateModel, this.playBarEnable);
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

// Get the app content container
const appContentEl = document.getElementById('app-content');

// Add components to the app content container
appContentEl.innerHTML += ProgressContainer();
periodic_progress_update = true;
appContentEl.innerHTML += Main();

if (playBarEnable) {
	appContentEl.innerHTML += PlayBar();
}

appContentEl.innerHTML += Footer();

document.addEventListener('DOMContentLoaded', () => {
	const app = new App(appContentEl, location, glb_filepath, new Vector3(...start_pos), new Vector3(...end_pos), new Vector3(...look_at_vec), showControls, autoRotateModel, playBarEnable);

	window.VIEWER.app = app;

	console.info('[glTF Viewer] Debugging data exported as `window.VIEWER`.');
});