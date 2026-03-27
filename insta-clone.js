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
    this.index = 0;
    this.likes = {};
    this.userVotes = {};
    this.slides = Array.from(this.querySelectorAll("play-list-slide"));
    this.loadFromStorage();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      index: { type: Number },
      likes: { type: Object },
      userVotes: { type: Object },
      slides : {type: Array}
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

  // Lit render the HTML
  render() {
   const activeSlide = this.slides[this.index];
   const slideId = activeSlide ? activeSlide.id : null;

   const count = (slideId !== null) ? (this.likes[slideId] || 0) : 0;
   const isLiked = (slideId !== null) ? (this.userVotes[slideId] === 'like') : false;

    return html`
<div class="wrapper" @arrow-click="${this._arrowClickHandler}" @dot-click="${this._dotClickHandler}" @data-loaded="${() => this.requestUpdate()}">
  <slot></slot>
  <play-list-indicator count="${this.slides.length}" index="${this.index}"></play-list-indicator>
  <div></div>
  <arrow-button class="arrow-button"></arrow-button>
  <button class="like-button" @click="${() => this._vote(slideId)}">${isLiked ? '❤️' : '♡'} ${count}</button>
</div>`;}


_vote(id) {
    if (this.userVotes[id] === "like") {
      this.likes[id] = Math.max(0, (this.likes[id] || 1) - 1);
      delete this.userVotes[id];
    } else {
      this.likes[id] = (this.likes[id] || 0) + 1;
      this.userVotes[id] = "like";
    }
 
    this.saveToStorage();
    this.requestUpdate();
  }
  saveToStorage() {
    localStorage.setItem("insta-likes", JSON.stringify(this.likes));
    localStorage.setItem("insta-votes", JSON.stringify(this.userVotes));
  }

  loadFromStorage() {
    const savedLikes = localStorage.getItem("insta-likes");
    const savedVotes = localStorage.getItem("insta-votes");

    if(savedLikes) this.likes = JSON.parse(savedLikes);
    if(savedVotes) this.userVotes = JSON.parse(savedVotes);
  }
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
      const page = new URLSearchParams(window.location.search).get('page');
      this.index = page ? parseInt(page, 10) : 0;
      this._updateSlides();
  }

  _updateSlides() {
   this.slides.forEach((slide, index) => {
      slide.style.display = index === this.index ? "block" : "none";
      slide.index = index;
      slide.getData();
    });
      const currentURL = new URL(window.location.href);
      currentURL.searchParams.set('page', this.index);
      window.history.pushState(null, '', currentURL.toString());
      this.requestUpdate();
  }
}
  /**
   * haxProperties integration via file reference
   */


globalThis.customElements.define(InstaClone.tag, InstaClone);