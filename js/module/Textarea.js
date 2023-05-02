export default class Textarea {
  constructor(lang) {
    this.lang = lang;
    this.textarea = document.querySelector('.keyboard-text');
    this.notPrintedKeys = ['Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight', 'ShiftRight'];
  }

  /**
   * Adds letter to textarea
   *
   * @param {HTMLElement} element
   */
  addLetter(element, eventCode) {
    const key = element.querySelector(`.${this.lang}`);
    if (this.notPrintedKeys.includes(eventCode)) {
      return;
    }
    key.childNodes.forEach((node) => {
      if (!node.classList.contains('hidden')) {
        this.textContent = this.textarea.textContent;
        this.textContent += node.textContent;
        this.textarea.textContent = this.textContent;
      }
    });
  }
}
