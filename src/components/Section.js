class Section {

  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  rendererElements() {
    this._items.forEach((item) => {
      const card = this._renderer(item);
      this._container.append(card);
    });
  }

  addItem(item) {
    const cardElement = this._renderer(item);

    this._container.prepend(cardElement);
  }
}

export default Section;
