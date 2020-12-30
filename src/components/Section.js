export class Section {
    constructor({ items, renderer }, cardSection) {
        this._items = items;
        this._renderer = renderer;
        this._elCard = document.querySelector(cardSection);
    }
    addItem(item) {
        this._elCard.prepend(item)
    }

    setItem(item) {
        this._elCard.append(item)
    }

    renderItems() {
        this._items.forEach((element) => {
            this._renderer(element)
        });
    }

}