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
import "./thumbnailpreview.js";


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
    this.data = [];
    this.loadFromStorage();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      index: { type: Number },
      likes: { type: Object },
      userVotes: { type: Object },
      data : {type: Array}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        width: 90%;
        max-width: 325px;
        height: auto;
        background-color: light-dark(var(--ddd-theme-default-slateMaxLight), black);        
        border-radius: var(--ddd-border-md);
        font-family: var(--ddd-font-primary);
        margin: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-1);
        box-shadow: var(--ddd-shadow-md); 
      }
      .wrapper {
        position: relative;
      }
      .loading {
      width: 100%;
      aspect-ratio: 1 / 2;
      background-color: light-dark(var(--ddd-theme-default-slateMaxLight), black);
      }
      .interaction button {
        margin-top: var(--ddd-spacing-3);
        width: 50px;
        height: 30px;
        background-color: light-dark(var(--ddd-theme-default-slateMaxLight), black);
        border: none;
      }
      .interaction button:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    `];
  }

  // Lit render the HTML
  render() {
    const item = this.data[this.index];
    if (!item) return html`<div class="loading"></div>`

   const count = (this.likes[item.ID] || 0);
   const isLiked =  (this.userVotes[item.ID] === 'like');

   const prevIndex = (this.index - 1 + this.data.length) % this.data.length;
   const nextIndex = (this.index + 1) % this.data.length;

    return html`
<div class="wrapper" @arrow-click="${this._arrowClickHandler}" @dot-click="${this._dotClickHandler}">
  <play-list-slide 
        top-heading="${item.name}"
        second-heading="${item.author}"
        image-src="${item.image}"
        auth-img-src="${item.authImg}"
        .id="${item.ID}">
    </play-list-slide>
  <play-list-indicator count="${this.data.length}" index="${this.index}"></play-list-indicator>
    <thumbnail-preview
        prev-image="${this.data[prevIndex].image}"
        current-image="${item.image}"
        next-image="${this.data[nextIndex].image}"
        @thumbnail-click="${this._thumbnailClickHandler}">
  </thumbnail-preview>
  <arrow-button class="arrow-button"></arrow-button>
</div>
<div class="interaction"> 
      <button class="like-button" @click="${() => this._vote(item.ID)}">${isLiked ? '❤️' : '♡'} ${count}</button>
      <button class="share-btn" @click="${() => this._copyShareLink(item.ID)}">Share</button>
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
      this.index = (this.index - 1 + this.data.length) % this.data.length;
    } else {
      this.index = (this.index + 1) % this.data.length;
    }
    this._updateSlides();
  }

_thumbnailClickHandler(e){
    this.index = e.detail.direction === "left"
    ? (this.index - 1 + this.data.length) % this.data.length
    : (this.index + 1) % this.data.length;
    this._updateSlides();
}
  firstUpdated() {
      const page = new URLSearchParams(window.location.search).get('page');
      this.index = page ? parseInt(page, 10) : 0;
      fetch("/api/data.js") //     /api/data.js for vercel , ./data.json for npm
      .then(r => r.json())
      .then(data => {
        this.data = data;
        this._updateSlides();
      })
  }

  _updateSlides() {
      const currentURL = new URL(window.location.href);
      currentURL.searchParams.set('page', this.index);
      window.history.pushState(null, '', currentURL.toString());
      this.requestUpdate();
  }
   _copyShareLink(id) {
    const url = `${window.location.origin}${window.location.pathname}?page=${id}`;
    try {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  }
}
  /**
   * haxProperties integration via file reference
   */


globalThis.customElements.define(InstaClone.tag, InstaClone);