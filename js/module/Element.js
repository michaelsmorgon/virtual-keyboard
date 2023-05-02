export default class Element {
  /**
   * Returns created HTMLElement
   *
   * @param {string} tagName
   * @param {array} classesNames
   * @returns {HTMLElement}
   */
  createElement(tagName, classesNames) {
    this.element = document.createElement(tagName);
    classesNames.forEach((className) => {
      this.element.classList.add(className);
    });
    return this.element;
  }

  /**
   * Adds value to the HTMLElement
   *
   * @param {HTMLElement} htmlElement
   * @param {string} value
   */
  addValueToElement(htmlElement, value) {
    this.htmlElement = htmlElement;
    this.htmlElement.textContent = value;
    return this.htmlElement;
  }
}
