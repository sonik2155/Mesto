export class FormValidator {
    constructor(object, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = object.inputSelector;
        this._submitButtonSelector = object.submitButtonSelector;
        this._inactiveButtonClass = object.inactiveButtonClass;
        this._inputErrorClass = object.inputErrorClass;
        this._errorClass = object.errorClass;
    }
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            this.removeActiveButtonState(buttonElement, this._inactiveButtonClass)
        } else {
            this.addActiveButtonState(buttonElement, this._inactiveButtonClass)
        }
    }

    removeActiveButtonState = (buttonElement) => {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    };

    addActiveButtonState = (buttonElement) => {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
    };

    _setEventListeners = () => {
        const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
        const buttonElement = this._formSelector.querySelector(this._submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement)
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement)
            });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
}