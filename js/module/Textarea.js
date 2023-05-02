export default class Textarea {
  constructor(lang) {
    this.lang = lang;
    this.textarea = document.querySelector('.keyboard-text');
  }

  /**
   * Adds letter to textarea
   *
   * @param {HTMLElement} element
   */
  addLetter(element) {
    const key = element.querySelector(`.${this.lang}`);
    key.childNodes.forEach((node) => {
      if (!node.classList.contains('hidden')) {
        this.textContent = this.textarea.textContent;
        this.textContent += node.textContent;
        this.textarea.textContent = this.textContent;
      }
    });
  }
}
