/**
 * Copyright 2026 RyanBell504
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./slide-indicator.js";
import "./arrow-button.js";
import "./play-list-slide.js";



/**
 * `play-list-project`
 * 
 * @demo index.html
 * @element play-list-project
 */
export class InstaClone extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-clone";
  }

  constructor() {
    super();
    this.slides = Array.from(this.querySelectorAll("play-list-slide"));
    this.index = 0;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      index: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        max-width: 325px;
        max-height: 1000px;
        color: var(--ddd-theme-default-potentialMidnight);
        background-color: var(--ddd-theme-default-slateMaxLight);
        border-radius: var(--ddd-border-md);
        font-family: var(--ddd-font-primary);
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        box-shadow: var(--ddd-shadow-md); 
      }
      .wrapper {
        position: relative;
      }
      .arrow-button {
        padding: var(--ddd-spacing-30);
      }
    `];
  }
get activeHeading() {
  const activeSlide = this.slides[this.index];
  return activeSlide ? activeSlide.topHeading : "Loading...";
}
  // Lit render the HTML
  render() {
    return html`
<div class="wrapper" @arrow-click="${this._arrowClickHandler}" @dot-click="${this._dotClickHandler}">
  <slot></slot>
  <play-list-indicator count="${this.slides.length}" index="${this.index}"></play-list-indicator>
  <div></div>
  <arrow-button class="arrow-button"></arrow-button>
</div>`;}



  _dotClickHandler(e) {
    this.index = e.detail.index;
    this._updateSlides();
  }
  _arrowClickHandler(e) {
    if (e.detail.direction === "left") {
      this.index = (this.index - 1 + this.slides.length) % this.slides.length;
    } else {
      this.index = (this.index + 1) % this.slides.length;
    }
    this._updateSlides();
  }


  firstUpdated() {
    this._updateSlides();
  }

  _updateSlides() {
   this.slides.forEach((slide, index) => {
      slide.style.display = index === this.index ? "block" : "none";
    });

  }

  /**
   * haxProperties integration via file reference
   */
}

globalThis.customElements.define(InstaClone.tag, InstaClone);