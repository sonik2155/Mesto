import '../pages/index.css';

import { validateElement } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'

const popupInfo = document.querySelector(".popup_add_info");
const popupCards = document.querySelector(".popup_add_cards");
const avatarPopup = document.querySelector(".popup_update_avatar")

const openPopupButton = document.querySelector(".profile__edit-button");
const updateAvatarButton = document.querySelector(".profile__avatar-button")
const addButtonCard = document.querySelector(".profile__add-button");
const cardsButtonSave = popupCards.querySelector('.popup__button');

const inputAvatar = avatarPopup.querySelector('.popup__apdate_picture')
const inputTitle = popupCards.querySelector('.popup__form_name_title');
const inputlink = popupCards.querySelector('.popup__form_pic_url');
const inputName = popupInfo.querySelector(".popup__form_name_call");
const inputJob = popupInfo.querySelector(".popup__form_job");
const elName = document.querySelector(".profile__info-title");
const elJob = document.querySelector(".profile__info-profession");

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
        authorization: '344a64cf-b308-474c-8210-0f54155eeeb6',
        'Content-type': 'application/json'
    }
});

Promise.all([
        api.getUserInformation(),
        api.getInitialCards()
    ])
    .then((value) => {
        const [userData, item] = value
        console.log(userData)

        const userProfile = new UserInfo({
            nameElement: ".profile__info-title",
            infoElement: ".profile__info-profession",
            avatarElement: ".profile__zone"
        });

        userProfile.setUserInfo(userData)

        const serverCardLike = (card) => {
            if (card.isLiked()) {
                api.deleteLike(card._cardId)
                    .then((data) => {
                        card.setLikes(data)
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            } else {
                api.addLike(card._cardId)
                    .then((data) => {
                        card.setLikes(data)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }

        const serverDelete = (card) => {
            deletePopupSubmit.open()
            deletePopupSubmit.handleSubmit(() => {
                api.deleteCard(card._cardId)
                    .then((res) => {
                        card.cardRemove(res)
                        deletePopupSubmit.close()
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        }

        const editPopupProfile = new PopupWithForm({
            popupSelector: ".popup_add_info",
            handleFormSubmit: ({ name, info }) => {
                editPopupProfile.dataLoading(true);
                api.changeUserInfo({
                        name: name,
                        about: info
                    })
                    .then((res) => {
                        userProfile.setUserInfo(res);
                        editPopupProfile.close()
                    })
                    .catch(err => console.log(`Error ${err}`))
                    .finally(() => {
                        editPopupProfile.dataLoading(false)
                    })
            }
        })

        const addCardPopup = new PopupWithForm({
            popupSelector: ".popup_add_cards",
            handleFormSubmit: ({ call, link }) => {
                addCardPopup.dataLoading(true);
                api.addNewCards({
                        name: call,
                        link: link
                    })
                    .then((res) => {
                        addNewCard(res)
                        addCardPopup.close()
                    })
                    .catch(err => console.log(`Error ${err}`))
                    .finally(() => {
                        addCardPopup.dataLoading(false)
                    })
            }
        })

        const popupAvatar = new PopupWithForm({
            popupSelector: ".popup_update_avatar",
            handleFormSubmit: ({ picture }) => {
                popupAvatar.dataLoading(true);
                api.changeAvatar({
                        avatar: picture
                    })
                    .then((res) => {
                        userProfile.setUserInfo(res);
                        popupAvatar.close();
                    })
                    .catch(err => console.log(`Error ${err}`))
                    .finally(() => {
                        popupAvatar.dataLoading(false)
                    })
            }
        })

        const deletePopupSubmit = new PopupWithSubmit('.popup_confirm_delete');
        deletePopupSubmit.setEventListeners();

        function handleCardClick(items) {
            popupImg.open(items.link, items.name)
        }

        function addNewCard(items) {
            const card = new Card({
                ...items,
                handleCardClick: handleCardClick,
                cardDelete: serverDelete,
                elementLike: serverCardLike
            }, userData._id, items._id, '#element');
            const elCard = card.generateCard();
            initialCard.addItem(elCard)
            return card
        }

        const popupImg = new PopupWithImage(".popup_add_image")
        popupImg.setEventListeners();

        const popupAddFormValidator = new FormValidator(validateElement, popupCards)
        popupAddFormValidator.enableValidation()

        const popupEditFormValidator = new FormValidator(validateElement, popupInfo)
        popupEditFormValidator.enableValidation()

        editPopupProfile.setEventListeners();
        addCardPopup.setEventListeners();
        popupAvatar.setEventListeners();

        addButtonCard.addEventListener("click", () => {
            addCardPopup.open();
            popupAddFormValidator.removeActiveButtonState(cardsButtonSave);
            inputTitle.value = null;
            inputlink.value = null;
        })

        openPopupButton.addEventListener("click", () => {
            const userInfo = userProfile.getUserInfo()

            inputName.value = userInfo.name
            inputJob.value = userInfo.info
            editPopupProfile.open()
        });

        updateAvatarButton.addEventListener('click', () => {
            popupAvatar.open()
            inputAvatar.value = null;
        })

        const initialCard = new Section({
            items: item.reverse(),
            renderer: (data) => {
                addNewCard(data)
            }
        }, '.element')
        initialCard.renderItems();
    })