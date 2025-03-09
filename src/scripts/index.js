// Импорт стилей
import '../pages/index.css';

// Импорт исходных даннных
import {initialCards} from './cards.js';

//Импорт функций
import {createCard, toDeleteCard, toLikeCard} from './card.js';
import {openModal, closeModal, addCloseListener} from './modal.js';
import {enableValidation} from './validation.js';

// Установка фонового изображения
import avatar from '../images/avatar.jpg';
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

/////////////////////////ОБЪЯВЛЕНИЕ КОНСТАНТ///////////////////////////////
// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM: Список карточек
const cardList = document.querySelector('.places__list');

// DOM: "Информация о себе"
const editProfileButton = document.querySelector('.profile__edit-button');
const editPopupType = document.querySelector('.popup_type_edit');
const editForm = editPopupType.querySelector('.popup__form');
const editFormName = editForm.querySelector('.popup__input_type_name');
const editFormDescription = editForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//DOM: "Добавление карточки"
const addProfileButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupTypeNewCard.querySelector('.popup__form');
const newCardFormName = newCardForm.querySelector('.popup__input_type_card-name');
const newCardFormDescription = newCardForm.querySelector('.popup__input_type_url');

//DOM: Просмотр карточки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
////////////////////////////////////////////////////////////////////////////
/////////////////////////ОБЪЯВЛЕНИЕ ФУНКЦИЙ/////////////////////////////////
// функция добавления карточки
function addCard (cardList, card) {
  cardList.append(card);
}

// функция записи значений по умолчанию в модальном окне "Информация о себе"
const setInitialEditForm = (profileName, profileDescription, editFormName, editFormDescription) => {
  editFormName.value = profileName.textContent;
  editFormDescription.value = profileDescription.textContent;
}

// функция сохранения информации о себе
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editFormName.value;
  profileDescription.textContent = editFormDescription.value;
  closeModal(editPopupType);
}

// функция добавления новой карточки через форму
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardObj = {
    name: newCardFormName.value,
    link: newCardFormDescription.value
  };
  const newCard = createCard(newCardObj, toDeleteCard, toLikeCard, cardTemplate, openImageModal);
  cardList.prepend(newCard);
  closeModal(popupTypeNewCard);
  newCardForm.reset();
}

// функция открытия модального окна с карточкой
function openImageModal (cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openModal (popupTypeImage);
}
////////////////////////////////////////////////////////////////////////////
/////////////////////////РЕАЛИЗАЦИЯ ФУНКЦИЙ/////////////////////////////////
// вывод исходных карточек на страницу
initialCards.forEach(cardsItem => {
    const newCard = createCard(cardsItem, toDeleteCard, toLikeCard, cardTemplate, openImageModal);
    addCard(cardList, newCard);
});

// открытие-закрытие модального окна "Информация о себе"
editProfileButton.addEventListener('click', () => {
    setInitialEditForm(profileName, profileDescription, editFormName, editFormDescription);
    openModal(editPopupType);
});
addCloseListener(editPopupType);

// сохранение "Информация о себе"
editForm.addEventListener('submit', handleEditFormSubmit);

// открытие-закрытие модального окна "Добавление карточки"
addProfileButton.addEventListener('click', () => openModal(popupTypeNewCard));
addCloseListener(popupTypeNewCard);

// добавление новой карточки через форму
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// открытие-закрытие модального окна "Просмотр карточки"
addCloseListener(popupTypeImage);