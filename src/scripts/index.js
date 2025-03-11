// Импорт стилей
import '../pages/index.css';

//Импорт функций
import {createCard, toDeleteCard, toLikeCard} from './card.js';
import {openModal, closeModal, addCloseListener} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';

// Импорт функций API
import {getUserInfo, getInitialCards, updateUserInfo, updateAvatar, addNewCard} from './api.js';

// Создание объекта для валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Применение валидации форм
enableValidation(validationConfig);

// Создание переменных с данными о пользователе
let userId;

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

// DOM: "Аватар пользователя" 
const editAvatarPopup = document.querySelector ('.popup_type_avatar');
const avatarForm = editAvatarPopup.querySelector('.popup__form');
const avatarFormUrl = avatarForm.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');

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

// функция сохранения информации о себе + API
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const buttonTextInitial = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  updateUserInfo(editFormName.value, editFormDescription.value)
      .then ((userData) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(editPopupType);
      })
      .catch(err => {
        console.error('Ошибка при обновлении профиля:', err);
      })
      .finally(() => {
        submitButton.textContent = buttonTextInitial;
        submitButton.disabled = false;
      });
}
// функция изменения аватара + API
function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const buttonTextInitial = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  updateAvatar (avatarFormUrl.value)
      .then ((userData) => {
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(editAvatarPopup);
      })
      .catch(err => {
        console.error('Ошибка при обновлении профиля:', err);
      })
      .finally(() => {
        submitButton.textContent = buttonTextInitial;
        submitButton.disabled = false;
        avatarForm.reset();
      });
}

// функция добавления новой карточки через форму + API
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const buttonTextInitial = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  addNewCard (newCardFormName.value, newCardFormDescription.value)
    .then ((cardData) => {
      const newCard = createCard(cardData, toDeleteCard, toLikeCard, cardTemplate, openImageModal, userId).cardItem;
      cardList.prepend(newCard);
      closeModal(popupTypeNewCard);
    })
    .catch(err => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      submitButton.textContent = buttonTextInitial;
      submitButton.disabled = false;
      newCardForm.reset();
    })
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
// Вывод исходных данных страницы
Promise.all ([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
        // Отображаем данные пользователя
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        userId = userData._id;
        // Отображаем карточки
        cardsData.forEach(card => {
            const newCard = createCard(card, toDeleteCard, toLikeCard, cardTemplate, openImageModal, userId).cardItem;
            addCard(cardList, newCard);
        });
    })
    .catch(err => {
        console.error('Ошибка при загрузке данных:', err);
    });

// открытие-закрытие модального окна "Информация о себе"
editProfileButton.addEventListener('click', () => {
    setInitialEditForm(profileName, profileDescription, editFormName, editFormDescription);
    clearValidation(editForm, validationConfig);
    openModal(editPopupType);
});
addCloseListener(editPopupType);

// сохранение "Информация о себе"
editForm.addEventListener('submit', handleEditFormSubmit);

// открытие-закрытие модального окна "Добавление карточки"
addProfileButton.addEventListener('click', () => {
  clearValidation(newCardForm, validationConfig);
  newCardForm.reset();
  openModal(popupTypeNewCard);
});
addCloseListener(popupTypeNewCard);

// добавление новой карточки через форму
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// открытие-закрытие модального окна "Просмотр карточки"
addCloseListener(popupTypeImage);

// открытие-закрытие модального окна "Смена аватара"
profileImage.addEventListener ('click', () => {
  clearValidation(avatarForm, validationConfig);
  avatarForm.reset();
  openModal(editAvatarPopup);
});
addCloseListener(editAvatarPopup);

// замена аватара
avatarForm.addEventListener ('submit', handleEditAvatarSubmit);