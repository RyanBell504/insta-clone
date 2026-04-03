import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./slide-indicator.js";
import "./arrow-button.js";

export class PlayListSlide extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-slide";
  }

  constructor() {
    super();
    this.topHeading = "";
    this.imageSrc = "";
    this.secondHeading = "";
    this.authImgSrc = "";
    this.id = null;
    this.index = 0;
  }

  static get properties() {
    return {
      topHeading : { type: String, attribute: "top-heading" },
      secondHeading : { type    : String, attribute: "second-heading" },
      imageSrc : { type: String, attribute: "image-src" },
      authImgSrc : { type: String, attribute: "auth-img-src" },
      index: { type: Number },
      id: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      h2 {
        font-size: var(--ddd-font-size-4xs);
        letter-spacing: var(--ddd-ls-72-sm);
        color: var(--ddd-theme-default-link);
        font-weight: var(--play-list-slide-top-heading-font-weight, var(--ddd-font-weight-bold));
        margin-left: var(--ddd-spacing-3);
        }
      .slide{
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
      }
      .slide img{
        width: 100%;
        max-height: 400px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        padding: var(--ddd-spacing-3);
        box-sizing: border-box;
      }
      .author {
        display: flex;
        align-items: center;
        margin-left: var(--ddd-spacing-3);
      }
      .author img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: var(--ddd-spacing-2);
      }
      .line {
        width: 100%;
        height: 2px;
        background-color: var(--ddd-theme-default-skyBlue);
        margin: 16px 0 24px 0;  
      }
    `];
  }

  render() {
    return html`
      <div class="author">
        <img src="${this.authImgSrc}" alt="Author Profile Image" loading="lazy"/>
        <p>${this.secondHeading}</p>
      </div>
      <div class="slide">
        <img src="${this.imageSrc}" alt="Slide Image" loading="lazy"/>
      </div>
       <div class=line></div>
      <h2>${this.topHeading}</h2>
      `;
  }

}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);