export class Api {
    constructor(options) {
        this._url = options.url;
        this._authorization = options.headers.authorization;
        this._contentType = options.headers["Content-type"];
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
                method: 'GET',
                headers: {
                    authorization: this._authorization
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    addNewCards({ name, link }) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    addLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    changeAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                },
                body: JSON.stringify({
                    avatar: avatar,
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    getUserInformation() {
        return fetch(`${this._url}/users/me/`, {
                method: 'GET',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    changeUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me/`, {
                method: 'PATCH',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })

    }
}