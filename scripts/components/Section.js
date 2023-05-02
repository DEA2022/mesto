class Section {
  constructor(renderPageData, container) {
    this._renderPageData = renderPageData;
    this._container = container;
  }

  rendererElements() {
    this._renderPageData.items.forEach((item) => {
      const card = this._renderPageData.renderer(item);
      this._container.append(card);
    });
  }

addItem(item) {
  const cardElement = this._renderPageData.renderer(item);

    this._container.prepend(cardElement);
  }
}

export default Section;
