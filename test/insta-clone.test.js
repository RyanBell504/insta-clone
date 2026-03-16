import { html, fixture, expect } from '@open-wc/testing';
import "../insta-clone.js";

describe("InstaClone test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <insta-clone
        title="title"
      ></insta-clone>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
