import Element from './Element.js';

export default class Keyboard extends Element {
  constructor(mainLang) {
    super();
    this.DEFAULT_KEY = 'defaultKey';
    this.SHIFT_PRESSED = 'shiftPressed';
    this.CAPS = 'caps';
    this.CAPS_SHIFT = 'capsShift';
    this.HIDDEN = 'hidden';
    this.KEYBOARD = 'keyboard';
    this.ROW = 'row';
    this.KEY = 'key';
    this.lang = mainLang;
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
    this.defKey = this.createElement('span', [this.DEFAULT_KEY]);
    if (allHidden) {
      this.defKey = this.createElement('span', [this.DEFAULT_KEY, this.HIDDEN]);
    }
    this.defKey = this.addValueToElement(this.defKey, key.defaultKey);

    this.shiftPressed = this.createElement('span', [this.SHIFT_PRESSED, this.HIDDEN]);
    this.shiftPressed = this.addValueToElement(this.shiftPressed, key.shiftPressed);

    this.caps = this.createElement('span', [this.CAPS, this.HIDDEN]);
    this.caps = this.addValueToElement(this.caps, key.caps);

    this.capsShift = this.createElement('span', [this.CAPS_SHIFT, this.HIDDEN]);
    this.capsShift = this.addValueToElement(this.capsShift, key.capsShift);

    const classesName = [];
    classesName.push(lang);
    if (allHidden) {
      classesName.push(this.HIDDEN);
    }
    const commonElement = this.createElement('span', classesName);
    commonElement.appendChild(this.defKey);
    commonElement.appendChild(this.shiftPressed);
    commonElement.appendChild(this.caps);
    commonElement.appendChild(this.capsShift);

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
    let { rowNum } = mainAlphabet[0];
    const keyboard = this.createElement('div', [this.KEYBOARD]);
    let rowElem = this.createElement('div', [this.ROW]);

    mainAlphabet.forEach((val, ind) => {
      const mainKey = this.createKey(val, 'en', this.lang !== 'en');
      const secondaryKey = this.createKey(secondaryAlphabet[ind], 'ru', this.lang !== 'ru');
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
