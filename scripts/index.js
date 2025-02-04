// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, toDeleteCard) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardItem.querySelector('.card__image').src = cardData.link;
    cardItem.querySelector('.card__title').textContent = cardData.name;
    cardItem.querySelector('.card__delete-button').addEventListener('click', toDeleteCard);
    return cardItem;
}

// @todo: Функция удаления карточки
function toDeleteCard (event) {
    event.target.parentElement.remove(); // получаем ссылку на родительский элемент кнопки удаления (карточку) и удаляем выбранный класс
}

// @todo: Функция добавления карточки
function addCard (cardList, card) {
    cardList.append(card);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardsItem => {
    const newCard = createCard(cardsItem, toDeleteCard);
    addCard(cardList, newCard);
});