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
    this.getFox();
  }

  static get properties() {
    return {
      topHeading : { type: String, attribute: "top-heading" },
      secondHeading : { type    : String, attribute: "second-heading" },
      imageSrc : { type: String, attribute: "image-src" },
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
        text-transform: uppercase;
        color: var(--ddd-theme-default-link);
        font-weight: var(--play-list-slide-top-heading-font-weight, var(--ddd-font-weight-bold));
        }
      .slide img{
        width: 300px;
        height: 400px;
        aspect-ratio: 1 / 2;
        object-fit: cover;
        padding: var(--ddd-spacing-3);
      }
      .line {
        width: 325px;
        height: 2px;
        background-color: var(--ddd-theme-default-skyBlue);
        margin: 16px 0 24px 0;  
      }
    `];
  }

  render() {
    return html`
      <h2>${this.topHeading}</h2>
      <div class=line></div>
      <div class="slide">
        <img src="${this.imageSrc}" alt="Slide Image" loading="lazy"/>
      </div>
      `;
  }

    getFox() {
    fetch("https://randomfox.ca/floof/").then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
  }).then((data) => {
    this.imageSrc = data.image;
    this.topHeading = data.image;
  });
  }
}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);