    import { LitElement, html, css } from "lit";
    import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
    import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

    export class ThumbnailPreview extends DDDSuper(I18NMixin(LitElement)) {
        
    static get tag() {
        return "thumbnail-preview";
        }

        constructor() {
        super();
        this.prevImage = "";
        this.currentImage = "";
        this.nextImage = "";
        }

        static get properties() {
            return {
                ...super.properties,
                prevImage: {type: String, attribute: "prev-image"},
                currentImage: {type: String, attribute: "current-image"},
                nextImage: {type: String, attribute: "next-image"}
            };
            }

            static get styles() {
                return [super.styles,
                css`
                :host {
                    display: flex;
                    justify-content: center;
                    gap: var(--ddd-spacing-2);
                    margin-top: var(--ddd-spacing-4);
                    align-items: center;
    
                }
                img {
                   width: 60px;
                   height: 80px;
                   object-fit: cover;
                   opacity: 0.5;
                   border: var(--ddd-border-md);
                   border-radius: var(--ddd-radius-lg);
                }
                .current{
                    opacity: 0.8;
                }
                img:hover {
                    opacity: 1;
                }
                `];
            }
            
    render() {        
    return html`
    <img src="${this.prevImage}" @click="${() => this._onClick('left')}"/>
    <img  class="current" src="${this.currentImage}" class="current"/>
    <img src="${this.nextImage}" @click="${() => this._onClick('right')}"/>
    `;
}


    _onClick(direction) {
        this.dispatchEvent(new CustomEvent("thumbnail-click", {
            detail: { direction },
            bubbles: true,
            composed: true
        }));
    }

    }

globalThis.customElements.define(ThumbnailPreview.tag, ThumbnailPreview);
