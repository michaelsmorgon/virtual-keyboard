import Element from "./Element.js";

export default class Keyboard extends Element {
  constructor() {
    super();
    this.DEFAULT_KEY = 'defaultKey';
    this.SHIFT_PRESSED = 'shiftPressed';
    this.CAPS = 'caps';
    this.CAPS_SHIFT = 'capsShift';
    this.HIDDEN = 'hidden';
    this.KEYBOARD = 'keyboard';
    this.ROW = 'row';
    this.KEY = 'key';
  }

  /**
   * Returns element with created key
   * 
   * @param {Object} key 
   * @param {string} lang 
   * @param {boolean} allHidden 
   * @returns {HTMLElement}
   */
  createKey(key, lang, allHidden = false) {
    let defKey = this.createElement('span', [this.DEFAULT_KEY]);
    if (allHidden) {
      defKey = this.createElement('span', [this.DEFAULT_KEY, this.HIDDEN]);
    }
    this.addValueToElement(defKey, key.defaultKey);

    const shiftPressed = this.createElement('span', [this.SHIFT_PRESSED, this.HIDDEN]);
    this.addValueToElement(shiftPressed, key.shiftPressed);

    const caps = this.createElement('span', [this.CAPS, this.HIDDEN]);
    this.addValueToElement(caps, key.caps);

    const capsShift = this.createElement('span', [this.CAPS_SHIFT, this.HIDDEN]);
    this.addValueToElement(capsShift, key.capsShift);

    const commonElement = this.createElement('span', [lang]);
    commonElement.appendChild(defKey);
    commonElement.appendChild(shiftPressed);
    commonElement.appendChild(caps);
    commonElement.appendChild(capsShift);

    return commonElement;
  }

  /**
   * Returns element with created keyboard
   * 
   * @param {array} mainAlphabet
   * @param {array} secondaryAlphabet
   * @returns {HTMLElement}
   */
  createKeyboard(mainAlphabet, secondaryAlphabet) {
    let rowNum = mainAlphabet[0].rowNum;
    const keyboard = this.createElement('div', [this.KEYBOARD]);
    let rowElem = this.createElement('div', [this.ROW]);

    mainAlphabet.forEach((val, ind) => {
      const mainKey = this.createKey(val, 'en');
      const secondaryKey = this.createKey(secondaryAlphabet[ind], 'ru', true);
      const key = this.createElement('div', [this.KEY, val.name]);

      if (rowNum !== val.rowNum) {
        keyboard.appendChild(rowElem);
        rowNum = val.rowNum;
        rowElem = this.createElement('div', [this.ROW]);
      }
      key.appendChild(mainKey);
      key.appendChild(secondaryKey);
      rowElem.appendChild(key);
      if (mainAlphabet.length === ind + 1) {
        keyboard.appendChild(rowElem);
      }
    });
    keyboard.id = 'keyboard';
    return keyboard;
  }
}