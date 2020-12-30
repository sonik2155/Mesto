export class UserInfo {
    constructor({ nameElement, infoElement, avatarElement }) {
        this._nameElement = document.querySelector(nameElement);
        this._infoElement = document.querySelector(infoElement);
        this._avatarElement = document.querySelector(avatarElement)
    }
    getUserInfo() {
        const infoUser = {
            name: this._nameElement.textContent,
            info: this._infoElement.textContent,
            picture: this._avatarElement.style.backgroundImage
        }
        return infoUser
    }

    setUserInfo({ name, about, avatar }) {
        if (name) { this._nameElement.textContent = name };
        if (about) { this._infoElement.textContent = about };
        if (avatar) {
            this._avatarElement.style.backgroundImage = 'url(' + avatar + ')'
        }
    }
}