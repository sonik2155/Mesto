export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.close = this.close.bind(this);
        this.closeIcon = this._popup.querySelector(".popup__close-button");
        this._submitButton = this._popup.querySelector('.popup__button');
    }

    _closeOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this.closeIcon.addEventListener('click', this.close.bind(this))
        this._popup.addEventListener('click', this._closeOverlay.bind(this))
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }
    open() {
        this._popup.classList.add('popup_is-opened')
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._popup.classList.remove('popup_is-opened')
        document.removeEventListener('keydown', this._handleEscClose)
    }
    dataLoading(load) {
        if (load) {
            this._submitButton.textContent = "Сохранение..."
        } else {
            this._submitButton.textContent = "Сохранить"
        }
    }

}