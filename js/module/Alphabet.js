export default class Alphabet {
  constructor(path) {
    this.path = path;

    return this.init();
  }

  async init() {
    const res = await fetch(this.path);
    this.data = await res.json();
    return this;
  }

  getAlphabetList() {
    return this.data;
  }
}