// Конфигурация запроса
const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers : {
        authorization: '22acc02c-02df-4ebe-9cc0-326d24707542',
        'Content-Type': 'application/json'
    }
};

// Проверка ответа сервера
function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// Запрос информации о пользователе
export const getUserInfo = () => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
      headers: apiConfig.headers
    })
      .then(checkResponse)
};

// Обновление информации о пользователе
export const updateUserInfo = (name, about) => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: apiConfig.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(checkResponse)
};

// Обновление аватара
export const updateAvatar = (avatarUrl) => {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: apiConfig.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(checkResponse)
};

// Запрос карточек с сервера
export const getInitialCards = () => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
      headers: apiConfig.headers
    })
      .then(checkResponse)
};
  
// Добавление новой карточки
export const addNewCard = (name, link) => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(checkResponse);
};

// Удаление карточки
export const deleteCard = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: apiConfig.headers
    })
      .then(checkResponse)
};

// Постановка лайка
export const likeCard = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: apiConfig.headers
    })
      .then(checkResponse)
};

// Cнятие лайка
export const unlikeCard = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: apiConfig.headers
    })
      .then(checkResponse)
};