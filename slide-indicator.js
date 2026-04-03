import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


export class SlideIndicator extends DDDSuper(I18NMixin(LitElement)) {
        
  static get tag() {
    return "play-list-indicator";
  }
    constructor() {
    super();
    this.count = 0;
    this.index = 0;
        
    }

    static get properties() {
        return {
            ...super.properties,
            count: { type: Number },
            index: { type: Number },
        };
    }

    static get styles() {
        return [super.styles,
        css`
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
            padding: var(--ddd-spacing-4) 0;
            color: var(--ddd-theme-primary);
        }
        .dots {
            display: flex;
            justify-content: center;
            gap: var(--ddd-spacing-2);
            margin-top: var(--ddd-spacing-2);
            overflow-x: auto;
            scrollbar-width: none; 
        }
        button{
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--ddd-theme-default-limestoneGray);
            border: none;
            cursor: pointer;
        }
        button.active {
            background-color: var(--ddd-theme-default-skyBlue);
        }
        button:hover {
            background-color: var(--ddd-theme-default-skyBlue);
            opacity: 0.8;
        }
        `];
    }
    
    render() {
        return html`
        <div class="dots">
            ${Array.from({ length: this.count }).map((_, index) => html`
                <button class="${index === this.index ? "active" : ""}" @click="${() => this._onDotClick(index)}"></button>
            `)}
        </div>`;
    }
    
    _onDotClick(index) {
        this.index = index;
        this.dispatchEvent(new CustomEvent("dot-click", {
            detail: { index },
            bubbles: true,
            composed: true
        }));
    }

}

globalThis.customElements.define(SlideIndicator.tag, SlideIndicator);
    