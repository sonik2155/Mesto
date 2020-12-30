export class Card {
    constructor({
            name,
            link,
            likes,
            owner,
            handleCardClick,
            cardDelete,
            elementLike,
        }, id, cardId,
        cardSelector) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._owner = owner._id;
        this._id = id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._cardDelete = cardDelete;
        this._elementLike = elementLike;
        this._cardId = cardId;
    }

    isLiked() {
        return Boolean(this._likes.some((like) => {
            return like._id == this._id
        }))
    }


    _getLikeQuantity() {
        const likesCount = this._element.querySelector('.element__quantity-like')
        likesCount.textContent = this._likes.length
        this._likesToggle()
    }

    _likesToggle(array) {
        const likeButton = this._element.querySelector(".element__like");
        if (this.isLiked(array)) {
            likeButton.classList.add('element__like_active')
        } else {
            likeButton.classList.remove('element__like_active')
        }
    }

    _getTemplate() {
        const createCard = document
            .querySelector(this._cardSelector)
            .content.querySelector('.element__card')
            .cloneNode(true);

        return createCard
    }

    generateCard() {
        this._element = this._getTemplate();

        const cardImage = this._element.querySelector('.element__pic');
        const cardTitle = this._element.querySelector('.element__title');

        cardImage.src = this._link;
        cardTitle.textContent = this._name;
        cardImage.alt = this._name;

        this._element.querySelector('.element__title').textContent = this._name;

        this.setEventListeners();
        this._getLikeQuantity();
        this._renderButtons();

        return this._element;
    }

    setLikes(array) {
        this._likes = array.likes;
        this._getLikeQuantity();
    }

    cardRemove() {
        this._element.remove();
        this._element = null;
    }

    setEventListeners() {
        this._element.querySelector(".element__pic").addEventListener("click", () => {
            this._handleCardClick({
                link: this._link,
                name: this._name
            });
        });

        this._element.querySelector(".element__delete").addEventListener("click", () => {
            this._cardDelete(this);
        })

        this._element.querySelector(".element__like").addEventListener("click", () => {
            this._elementLike(this)
        })

    };

    id() {
        return this._cardId
    }

    _renderButtons() {
        this._deletButton = this._element.querySelector(".element__delete")
        if (this._id === this._owner) {
            this._deletButton.classList.add('element__delete_visible')
        } else {
            this._deletButton.classList.add('element__delete_hidden')
        }
    }
}