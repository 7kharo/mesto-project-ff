// функция закрытия модального окна по Esc
const closeModalEscape = (event) => {
    if (event.key === 'Escape') {
        const popup = document.querySelector ('.popup_is-opened');
        closeModal(popup);
    }
}

// функция открытия модального окна
export const openModal = (popup) => {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEscape);
}

// функция закрытия модального окна
export const closeModal = (popup) => {
    popup.classList.add('popup_is-animated');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEscape);
}

// функция добавления слушателя для закрытия модального окна
export const addCloseListener = (popup) => {
    const closeCross = popup.querySelector('.popup__close');
    closeCross.addEventListener('click', () => {
        closeModal(popup);
    });

    popup.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains ('popup')) {
            closeModal(popup);
        }
    });
}