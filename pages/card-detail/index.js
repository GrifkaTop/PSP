import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class CardDetailPage {
    constructor(parent, onPageChange, cardId, cardsPage) {
        this.parent = parent;
        this.onPageChange = onPageChange;
        this.cardId = cardId;
        this.cardsPage = cardsPage;
        this.card = null;
        this.animFrameId = null;
        this.renderer = null;
        this._glbHandler = null;
        this._resizeHandler = null;
    }

    async getData() {
        const { data } = await ajax.get(stockUrls.getStockById(this.cardId));
        this.card = data;
        this.renderData();
    }

    renderData() {
        const placeholder = this.parent.querySelector('#card-detail-placeholder');
        if (placeholder) {
            placeholder.outerHTML = this.getHTML();
        }
        this._bindEvents();
        if (this.card) {
            const container = document.getElementById('detail-3d');
            const { scene, camera, controls } = this.initThree(container);
            const modelPath = this.card.model || `assets/models/${(this.cardId % 3) || 3}.glb`;
            this.loadModel(scene, camera, controls, modelPath);
            this._glbHandler = (e) => {
                this.loadModel(scene, camera, controls, e.detail, true);
            };
            window.addEventListener('glb-upload', this._glbHandler);
        }
    }

    dispose() {
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer = null;
        }
        if (this._glbHandler) {
            window.removeEventListener('glb-upload', this._glbHandler);
            this._glbHandler = null;
        }
        if (this._resizeHandler) {
            window.removeEventListener('resize', this._resizeHandler);
            this._resizeHandler = null;
        }
    }

    getHTML() {
        if (!this.card) {
            return `
                <main class="container">
                    <h1>Карточка не найдена</h1>
                    <button class="btn-back" id="btn-back">← Назад</button>
                </main>
            `;
        }

        return `
            <main class="container detail-page">
                <div class="detail-header">
                    <h2 class="section-title">${this.card.title}</h2>
                    <button class="btn-back" id="btn-back">← Назад</button>
                </div>

                <div class="detail-content">
                    <div class="detail-image">
                        <img src="${this.card.img}" alt="${this.card.title}" class="main-image">
                    </div>

                    <div class="detail-info">
                        <h3>Контрольные сроки</h3>
                        <table class="detail-table">
                            <tr>
                                <td>Прием статей до:</td>
                                <td><strong>${this.card.deadline}</strong></td>
                            </tr>
                            <tr>
                                <td>Размещение журнала:</td>
                                <td><strong>${this.card.releaseDate}</strong></td>
                            </tr>
                            <tr>
                                <td>Загрузка в eLibrary.ru:</td>
                                <td><strong>${this.card.elibraryDate}</strong></td>
                            </tr>
                            <tr>
                                <td>Почтовая рассылка:</td>
                                <td><strong>${this.card.mailDate}</strong></td>
                            </tr>
                            <tr>
                                <td>Рассылка трек-номеров:</td>
                                <td><strong>${this.card.trackDate}</strong></td>
                            </tr>
                        </table>

                        <button class="btn-delete-large" id="btn-delete-card">Удалить карточку</button>
                    </div>

                    <div class="detail-3d" id="detail-3d">
                        <div class="model-loading" id="model-loading">Загрузка 3D модели...</div>
                    </div>
                </div>
            </main>
        `;
    }

    initThree(container) {
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x2a2a2a);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 1, 3);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);
        this.renderer = renderer;

        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        this._resizeHandler = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', this._resizeHandler);

        const animate = () => {
            this.animFrameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return { scene, camera, controls };
    }

    loadModel(scene, camera, controls, source, isBuffer = false) {
        const loader = new GLTFLoader();
        const loadingEl = document.getElementById('model-loading');

        scene.children
            .filter(c => c.userData.isModel)
            .forEach(c => scene.remove(c));

        if (loadingEl) {
            loadingEl.style.display = 'block';
            loadingEl.textContent = 'Загрузка 3D модели...';
        }

        const onLoad = (gltf) => {
            if (loadingEl) loadingEl.style.display = 'none';

            const model = gltf.scene;
            model.userData.isModel = true;

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            model.scale.setScalar(scale);
            model.position.sub(center.multiplyScalar(scale));

            scene.add(model);
            camera.position.set(0, 1, 3);
            controls.target.set(0, 0, 0);
            controls.update();
        };

        const onError = () => {
            if (loadingEl) loadingEl.textContent = 'Модель не найдена';
        };

        if (isBuffer) {
            loader.parse(source, '', onLoad, onError);
        } else {
            loader.load(source, onLoad, undefined, onError);
        }
    }

    _bindEvents() {
        const btnBack = this.parent.querySelector('#btn-back');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                this.dispose();
                this.onPageChange('cards');
            });
        }

        const btnDelete = this.parent.querySelector('#btn-delete-card');
        if (btnDelete) {
            btnDelete.addEventListener('click', () => {
                this.dispose();
                this.cardsPage.deleteCard(this.cardId);
                this.onPageChange('cards');
            });
        }
    }

    render() {
        this.dispose();
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(this.onPageChange);

        this.parent.insertAdjacentHTML('beforeend', '<div id="card-detail-placeholder"></div>');

        const footer = new FooterComponent(this.parent);
        footer.render();

        this.getData();
    }
}
