import '../pages/index.css';

import {initialCards} from './cards.js';

import {createCard, toDeleteCard, toLikeCard, addCard} from './cards.js';

import {openModal, closeModal, openImageModal, addCloseListener, setInitialEditForm} from './modal.js'

// Установка фонового изображения
import avatar from '../images/avatar.jpg';
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(cardsItem => {
    const newCard = createCard(cardsItem, toDeleteCard, toLikeCard, cardTemplate);
    addCard(cardList, newCard);
});

// открытие-закрытие модального окна "Информация о себе"
const editProfileButton = document.querySelector('.profile__edit-button');
const editPopupType = document.querySelector('.popup_type_edit');
const editForm = editPopupType.querySelector('.popup__form');
const editFormName = editForm.querySelector('.popup__input_type_name');
const editFormDescription = editForm.querySelector('.popup__input_type_description');
editProfileButton.addEventListener('click', () => {
    setInitialEditForm(editFormName, editFormDescription);
    openModal(editPopupType);
});
addCloseListener(editPopupType);

// Реадктирование окна "Информация о себе"
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editFormName.value;
    profileDescription.textContent = editFormDescription.value;
    closeModal(editPopupType);
}
editForm.addEventListener('submit', handleFormSubmit);


// открытие-закрытие модального окна "Добавление карточки"
const addProfileButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
addProfileButton.addEventListener('click', () => openModal(popupTypeNewCard));
addCloseListener(popupTypeNewCard);

//Добавление новой карточки через форму
const newCardForm = popupTypeNewCard.querySelector('.popup__form');
const newCardFormName = newCardForm.querySelector('.popup__input_type_card-name');
const newCardFormDescription = newCardForm.querySelector('.popup__input_type_url');
function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardObj = {
      name: newCardFormName.value,
      link: newCardFormDescription.value
    };
    const newCard = createCard(newCardObj, toDeleteCard, toLikeCard, cardTemplate);
    cardList.prepend(newCard);
    closeModal(popupTypeNewCard);
    newCardForm.reset();
}
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// открытие-закрытие модального окна "Просмотр карточки"
const popupTypeImage = document.querySelector('.popup_type_image');
cardList.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__image')) {
      const cardImage = event.target;
      const cardImageSrc = cardImage.src;
      const cardImageAlt = cardImage.alt;
      openImageModal(popupTypeImage, cardImageSrc, cardImageAlt);
    }
  });
addCloseListener(popupTypeImage);
