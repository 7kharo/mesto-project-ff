import {deleteCard, likeCard, unlikeCard} from './api.js';

// функция создания карточки
export function createCard(cardData, toDeleteCard, toLikeCard, cardTemplate, openImageModal, userId) {
    // поиск элементов карточки
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const cardLikeButton = cardItem.querySelector('.card__like-button');
    
    // присваивание данных карточки
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardItem.querySelector('.card__title').textContent = cardData.name;
    cardItem.querySelector('.likes-counter').textContent = cardData.likes.length;
    const cardOwnerId = cardData.owner._id;
    const cardId = cardData._id;
    cardItem.dataset.cardId = cardId;
    
    // проверка стоит ли лайк пользователя
    const isUserLiked = cardData.likes.some((like) => like._id === userId);
    if (isUserLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    };
    
    //создание коллбэков на активные элементы карточки
    if (cardOwnerId === userId) {
        cardDeleteButton.addEventListener('click', toDeleteCard);
    } else {
        cardDeleteButton.style.display = 'none';
    };
    cardLikeButton.addEventListener('click', toLikeCard);
    cardImage.addEventListener('click',() => openImageModal(cardImage));
    // возврат объекта карточки
    return {
        'cardItem': cardItem
    };
}

// функция лайка карточки
export function toLikeCard (event) {
    const cardLikeButton = event.target;
    const cardLiked = cardLikeButton.closest('.card');
    const cardLikedId = cardLiked.dataset.cardId;
    const cardLikeCounter = cardLiked.querySelector('.likes-counter');
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? unlikeCard : likeCard;
    likeMethod(cardLikedId) 
            .then ((updatedLikedCard) => { 
                cardLikeButton.classList.toggle('card__like-button_is-active'); 
                cardLikeCounter.textContent = updatedLikedCard.likes.length; 
            }) 
            .catch ((err) => { 
                console.error (`Ошибка при ${isLiked ? "снятии" : "постановке"} лайка:`, err); 
            })
}
  
// функция удаления карточки
export function toDeleteCard (event) {
    const cardItem = event.target.closest('.card');
    const cardIdForDelete = cardItem.dataset.cardId;
    console.log(`cardIdForDelete: ${cardIdForDelete}`);
    deleteCard (cardIdForDelete)
        .then(() => {
            cardItem.remove();
        })
        .catch ((err) => {
            console.error ('Ошибка при удалении карточки:', err);
        })
}