export default class Element {
  constructor() {
  }

  /**
   * Returns created HTMLElement
   * 
   * @param {string} tagName 
   * @param {array} classesNames 
   * @returns {HTMLElement}
   */
  createElement(tagName, classesNames) {
    const element = document.createElement(tagName);
    classesNames.forEach(className => {
      element.classList.add(className);
    });
    return element;
  }

  /**
   * Adds value to the HTMLElement
   * 
   * @param {HTMLElement} element 
   * @param {string} value 
   */
  addValueToElement(element, value) {
    element.textContent = value;
  }
}