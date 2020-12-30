import Popup from './popup.js';
export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._handleSubmit = this._popup.querySelector('.popup__container');
    }

    handleSubmit(handleSubmitform) {
        this._handleSubmitform = handleSubmitform
    }

    setEventListeners() {
        super.setEventListeners();
        this._handleSubmit.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitform();
        })
    }
}