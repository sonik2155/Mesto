import Popup from './popup.js';
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this.popupFullsScreenImg = this._popup.querySelector(".popup__pic");
        this.popupTitle = this._popup.querySelector('.popup__name-pic')
    }
    open(link, name) {
        this.popupFullsScreenImg.src = link;
        this.popupFullsScreenImg.alt = name;
        this.popupTitle.textContent = name

        super.open()
    }

}