import Element from "./Element.js";

export default class BodyContent extends Element {
  constructor(keyboard) {
    super();
    this.keyboard = keyboard;
    this.BODY = 'body';
    this.WRAPPER = 'wrapper';
    this.TITLE = 'title';
    this.KEYBOARD_TEXT = 'keyboard-text';
    this.DESCRIPTION = 'description';
    this.ariaRowCount = 10;
    this.ariaColCount = 50;
  }

  getHTML() {
    const body = document.querySelector('body');
    body.classList.add(this.BODY);

    const wrapper = this.createElement('div', [this.WRAPPER]);
    const title = this.createElement('h1', [this.TITLE]);
    title.textContent = 'Keyboard';
    const textarea = this.createElement('textarea', [this.KEYBOARD_TEXT]);
    textarea.id = this.KEYBOARD_TEXT;
    textarea.ariaRowCount = this.ariaRowCount;
    textarea.ariaColCount = this.ariaColCount;
    const description = this.createElement('p', [this.DESCRIPTION]);
    description.textContent = 'Keyboard created in Windows. Use ctrl + alt for changing language.';
    wrapper.append(title);
    wrapper.append(textarea);
    wrapper.append(this.keyboard);
    wrapper.append(description);
    body.append(wrapper);
  }
}