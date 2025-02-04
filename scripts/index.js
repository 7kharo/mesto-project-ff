// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, toDeleteCard) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardItem.querySelector('.card__image').src = cardData.link;
    cardItem.querySelector('card__title').textContent = cardData.name;
    cardItem.querySelector('.card__delete-button').addEventListener('click', toDeleteCard);
    return cardItem;
}
// @todo: Функция удаления карточки
function toDeleteCard (event) {
    const removedCard = event.target.parentElement;
    removedCard.remove();
}
// @todo: Функция добавления карточки
function addCard (cardList, card) {
    cardList.append(card);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {addCard(cardList, card)});