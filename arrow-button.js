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
                    inset: var(--ddd-spacing-0);
                    pointer-events: none;
                }
                button {
                    pointer-events: auto;
                    top: 50%;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background-color: var(--ddd-theme-default-white);
                    border: var(--ddd-border-l) solid var(--ddd-theme-default-link);
                    outline: 2px var(--ddd-theme-default-link) solid;
                    font-size: var(--ddd-font-size-3xs);
                    color: var(--ddd-theme-default-link);
                    cursor: pointer;
                }
                button:hover {
                    background-color: var(--ddd-theme-default-limestoneGray);
                }
                `];
            }
            
    render() {
        return html`
        <button left @click="${this._onClick}"><</button>
        <button right @click="${this._onClick}">></button>`;
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