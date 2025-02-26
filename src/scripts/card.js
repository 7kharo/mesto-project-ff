// функция создания карточки
export function createCard(cardData, toDeleteCard, toLikeCard, cardTemplate, openImageModal) {
    // поиск элементов карточки
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const cardLikeButton = cardItem.querySelector('.card__like-button');
    // присваивание данных карточки
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardItem.querySelector('.card__title').textContent = cardData.name;
    // создание коллбэков на активные элементы карточки
    cardDeleteButton.addEventListener('click', toDeleteCard);
    cardLikeButton.addEventListener('click', toLikeCard);
    cardImage.addEventListener('click',() => openImageModal(cardImage));
    // возврат объекта карточки
    return cardItem;
}
  
// функция лайка карточки
export function toLikeCard (event) {
    if (event.target.classList.contains('card__like-button')) {
      event.target.classList.toggle('card__like-button_is-active');
    }
}
  
// функция удаления карточки
export function toDeleteCard (event) {
    event.target.closest('.card').remove();
}