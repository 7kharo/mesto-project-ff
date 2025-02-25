export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Функция создания карточки
export function createCard(cardData, toDeleteCard, toLikeCard, cardTemplate) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardItem.querySelector('.card__image').src = cardData.link;
  cardItem.querySelector('.card__image').alt = cardData.name;
  cardItem.querySelector('.card__title').textContent = cardData.name;
  cardItem.querySelector('.card__delete-button').addEventListener('click', toDeleteCard);
  cardItem.querySelector('.card__like-button').addEventListener('click', toLikeCard);
  return cardItem;
}

export function toLikeCard (event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active');
  }
}

// @todo: Функция удаления карточки
export function toDeleteCard (event) {
  event.target.closest('.card').remove(); // получаем ссылку на ближайшую к кнопке удаления карточку и удаляем выбранный класс
}


// @todo: Функция добавления карточки
export function addCard (cardList, card) {
  cardList.append(card);
}