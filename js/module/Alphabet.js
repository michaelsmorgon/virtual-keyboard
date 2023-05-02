export default class Alphabet {
  constructor(path) {
    this.path = path;
  }

  async getAlphabetList() {
    const res = await fetch(this.path);
    const data = await res.json();

    return data;
  }
}
