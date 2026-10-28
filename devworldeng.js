// devworldeng.js - Standalone Dev World Engine v1.1
class DevWorldEngine {
    constructor(config = {}) {
        this.version = "0.2.0";
        this.appName = config.appName || "Dev World";
    }

    init() {
        console.log(`running ${this.appName} v${this.version}, devworldeng.js 0.1.0`);
        this._injectDefaultStyles();
    }

    createpopup(config) {
        // Remove any existing modal
        const existing = document.getElementById('dev-engine-modal');
        if (existing) existing.remove();

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'dev-engine-modal';
        overlay.className = 'modal-overlay';

        // Modal Box
        const box = document.createElement('div');
        box.className = 'modal-content';

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-modal';
        closeBtn.innerText = 'X';
        closeBtn.onclick = () => this.closePopup(overlay);
        box.appendChild(closeBtn);

        // Title
        if (config.title) {
            const titleEl = document.createElement('h3');
            titleEl.innerText = config.title;
            titleEl.style.cssText = 'margin-top: 0; margin-bottom: 12px; font-size: 18px;';
            box.appendChild(titleEl);
        }

        // Message
        if (config.message) {
            const msgEl = document.createElement('p');
            msgEl.innerText = config.message;
            msgEl.style.cssText = 'font-size: 14px; margin-bottom: 12px; color: #333;';
            box.appendChild(msgEl);
        }

        // Input Fields Generator from JSON configuration
        if (config.inputs) {
            for (const [id, inputData] of Object.entries(config.inputs)) {
                const input = document.createElement('input');
                input.type = inputData.type || 'text';
                input.id = id;
                input.placeholder = inputData.placeholder || '';
                input.className = 'input-field';
                box.appendChild(input);
            }
        }

        // Buttons Generator from JSON configuration
        if (config.buttons) {
            const btnContainer = document.createElement('div');
            btnContainer.style.cssText = 'display: flex; flex-direction: column; gap: 4px; margin-top: 4px;';

            for (const [key, btnData] of Object.entries(config.buttons)) {
                const btn = document.createElement('button');
                btn.className = 'btn-custom';
                btn.innerHTML = btnData.html || btnData.text || key;

                if (btnData.color) {
                    btn.style.background = btnData.color;
                    btn.style.color = btnData.textColor || '#000';
                }
                if (btnData.className) {
                    btn.classList.add(btnData.className);
                }

                if (typeof btnData.onClick === 'function') {
                    btn.onclick = () => btnData.onClick(this);
                }

                btnContainer.appendChild(btn);
            }
            box.appendChild(btnContainer);
        }

        // Extra Custom HTML / Links / Dividers (e.g., "OR", Forgot Password)
        if (config.footerHtml) {
            const footerEl = document.createElement('div');
            footerEl.innerHTML = config.footerHtml;
            box.appendChild(footerEl);
        }

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        // Trigger active state for smooth transition
        setTimeout(() => overlay.classList.add('active'), 10);

        overlay.onclick = (e) => {
            if (e.target === overlay) this.closePopup(overlay);
        };
    }

    closeAll() {
        const existing = document.getElementById('dev-engine-modal');
        if (existing) this.closePopup(existing);
    }

    closePopup(overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 200);
    }

    _injectDefaultStyles() {
        if (document.getElementById('dev-engine-styles')) return;
        const style = document.createElement('style');
        style.id = 'dev-engine-styles';
        style.innerHTML = `
            .modal-overlay {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.6); display: flex;
                align-items: center; justify-content: center; z-index: 10;
                opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
            }
            .modal-overlay.active { opacity: 1; pointer-events: auto; }
            .modal-content {
                background: #ffffff; border: 4px solid #000000; border-radius: 16px;
                box-shadow: 0 6px 0px #000000; width: 90%; max-width: 340px;
                padding: 22px 20px; position: relative; text-align: center;
                transform: scale(0.9); transition: transform 0.2s ease;
                font-family: 'Cherry Bomb One', cursive, sans-serif;
            }
            .modal-overlay.active .modal-content { transform: scale(1); }
            .close-modal {
                position: absolute; top: 10px; right: 12px; background: #ff5964;
                color: #fff; border: 2px solid #000; border-radius: 50%;
                width: 26px; height: 26px; font-family: 'Cherry Bomb One', cursive, sans-serif;
                font-size: 14px; cursor: pointer; box-shadow: 2px 2px 0px #000;
                display: flex; align-items: center; justify-content: center;
            }
            .input-field {
                width: 100%; padding: 9px 12px; border: 2px solid #000;
                border-radius: 6px; background: #f8f9fa; margin-bottom: 8px;
                font-family: 'Cherry Bomb One', cursive, sans-serif;
                font-size: 14px; outline: none;
            }
            .btn-custom {
                width: 100%; padding: 10px; border: 2px solid #000;
                border-radius: 8px; font-family: 'Cherry Bomb One', cursive, sans-serif;
                font-size: 16px; cursor: pointer; box-shadow: 3px 3px 0px #000;
                transition: transform 0.1s ease; text-decoration: none;
                display: inline-block; margin-bottom: 8px;
            }
            .btn-custom:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0px #000; }
        `;
        document.head.appendChild(style);
    }
}

window.dev = new DevWorldEngine();
window.dev.init();
