    import { LitElement, html, css } from "lit";
    import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
    import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

    export class ArrowButton extends DDDSuper(I18NMixin(LitElement)) {
        
    static get tag() {
        return "arrow-button";
        }
        constructor() {
        super();
        }

        static get properties() {
            return {
                ...super.properties,
            };
            }

            static get styles() {
                return [super.styles,
                css`
                :host {
                    pointer-events: none;
                    justify-content: center;
                    align-items: center;
                }
                button {
                    position: absolute;
                    pointer-events: auto;
                    top: 40%;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background-color: light-dark(var(--ddd-theme-default-slateMaxLight), black);
                    border: var(--ddd-border-l) solid var(--ddd-theme-default-link);
                    outline: 2px var(--ddd-theme-default-link) solid;
                    font-size: var(--ddd-font-size-3xs);
                    color: var(--ddd-theme-default-link);
                    margin-top: var(--ddd-spacing-2);
                    cursor: pointer;
                }
                button:hover {
                    background-color: var(--ddd-theme-default-limestoneGray);
                }
                 button[left] {
                    left: -2px;
                }
                button[right] {
                    right: -2px;
                }
                `];
                
            }
            
    render() {
        return html`
        <button left @click="${this._onClick}" title="back arrow"><</button>
        <button right @click="${this._onClick}"  title="forward arrow">></button>`;
        }

        _onClick(e) {
            const direction = e.target.hasAttribute("left") ? "left" : "right";
            this.dispatchEvent(new CustomEvent("arrow-click", {
                detail: { direction },
                bubbles: true,
                composed: true
            }));
    }

    }

    globalThis.customElements.define(ArrowButton.tag, ArrowButton);