import Popup from './popup.js';
export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._allInputs = this._popup.querySelectorAll('.popup__form');
        this._formValue = {};
        this._allInputs.forEach(input => this._formValue[input.name] = input.value)
        return this._formValue

    }

    setEventListeners() {
        super.setEventListeners()
        this._form = this._popup.querySelector(".popup__container")
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleFormSubmit(this._getInputValues())
            this._handleEscClose;
        })
    }

    close() {
        super.close()
    }
}