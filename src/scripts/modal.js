const closeModalEscape = (event) => {
    if (event.key === 'Escape') {
        const popup = document.querySelector ('.popup_is-opened');
        closeModal(popup);
    }
}

export const openModal = (popup) => {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEscape);
}

export const openImageModal = (popup, cardImageSrc, cardImageAlt) => {
    const popupImage = popup.querySelector('.popup__image');
    const popupCaption = popup.querySelector('.popup__caption');
    popupImage.src = cardImageSrc;
    popupImage.alt = cardImageAlt;
    popupCaption.textContent = cardImageAlt;
    openModal (popup);
}

export const closeModal = (popup) => {
    popup.classList.add('popup_is-animated');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEscape);
}

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

export const setInitialEditForm = (editFormName, editFormDescription) => {
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    editFormName.value = profileName.textContent;
    editFormDescription.value = profileDescription.textContent;
}