(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"22acc02c-02df-4ebe-9cc0-326d24707542","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e,t,n,r,o,c){var a=r.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button");i.src=e.link,i.alt=e.name,a.querySelector(".card__title").textContent=e.name,a.querySelector(".likes-counter").textContent=e.likes.length;var l=e.owner._id,d=e._id;return a.dataset.cardId=d,e.likes.some((function(e){return e._id===c}))&&s.classList.add("card__like-button_is-active"),l===c?u.addEventListener("click",t):u.style.display="none",s.addEventListener("click",n),i.addEventListener("click",(function(){return o(i)})),{cardItem:a}}function r(n){var r,o=n.target,c=o.closest(".card"),a=c.dataset.cardId,i=c.querySelector(".likes-counter");o.classList.contains("card__like-button_is-active")?(r=a,fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then(t)).then((function(e){o.classList.remove("card__like-button_is-active"),i.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при постановке лайка:",e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(a).then((function(e){o.classList.add("card__like-button_is-active"),i.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при постановке лайка:",e)}))}function o(n){var r,o=n.target.closest(".card"),c=o.dataset.cardId;console.log("cardIdForDelete: ".concat(c)),(r=c,fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then(t)).then((function(){o.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}var c=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");i(t)}},a=function(e){e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)},i=function(e){e.classList.add("popup_is-animated"),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)},u=function(e){e.querySelector(".popup__close").addEventListener("click",(function(){i(e)})),e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&i(e)}))},s=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t),n.setCustomValidity("")})),l(n,r,t)};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f,_,m={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};f=m,Array.from(document.querySelectorAll(f.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(e,f)}));var y=document.querySelector("#card-template").content,v=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),b=document.querySelector(".popup_type_edit"),S=b.querySelector(".popup__form"),C=S.querySelector(".popup__input_type_name"),q=S.querySelector(".popup__input_type_description"),L=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),k=document.querySelector(".popup_type_avatar"),g=k.querySelector(".popup__form"),x=g.querySelector(".popup__input_type_url"),A=document.querySelector(".profile__image"),I=document.querySelector(".profile__add-button"),U=document.querySelector(".popup_type_new-card"),w=U.querySelector(".popup__form"),T=w.querySelector(".popup__input_type_card-name"),j=w.querySelector(".popup__input_type_url"),D=document.querySelector(".popup_type_image"),O=D.querySelector(".popup__image"),B=D.querySelector(".popup__caption");function P(e){O.src=e.src,O.alt=e.alt,B.textContent=e.alt,a(D)}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,c,a=(c=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(t,c)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];L.textContent=i.name,E.textContent=i.about,A.style.backgroundImage="url(".concat(i.avatar,")"),_=i._id,u.forEach((function(e){var t=n(e,o,r,y,P,_).cardItem;!function(e,t){e.append(t)}(v,t)}))})).catch((function(e){console.error("Ошибка при загрузке данных:",e)})),h.addEventListener("click",(function(){!function(e,t,n,r){n.value=e.textContent,r.value=t.textContent}(L,E,C,q),d(S,m),a(b)})),u(b),S.addEventListener("submit",(function(n){n.preventDefault();var r,o,c=n.submitter,a=c.textContent;c.textContent="Сохранение...",c.disabled=!0,(r=C.value,o=q.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){L.textContent=e.name,E.textContent=e.about,i(b)})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)})).finally((function(){c.textContent=a,c.disabled=!1}))})),I.addEventListener("click",(function(){d(w,m),w.reset(),a(U)})),u(U),w.addEventListener("submit",(function(c){c.preventDefault();var a,u,s=c.submitter,l=s.textContent;s.textContent="Сохранение...",s.disabled=!0,(a=T.value,u=j.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:u})}).then(t)).then((function(e){var t=n(e,o,r,y,P,_).cardItem;v.prepend(t),i(U)})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)})).finally((function(){s.textContent=l,s.disabled=!1,w.reset()}))})),u(D),A.addEventListener("click",(function(){d(g,m),g.reset(),a(k)})),u(k),g.addEventListener("submit",(function(n){n.preventDefault();var r,o=n.submitter,c=o.textContent;o.textContent="Сохранение...",o.disabled=!0,(r=x.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){A.style.backgroundImage="url(".concat(e.avatar,")"),i(k)})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)})).finally((function(){o.textContent=c,o.disabled=!1,g.reset()}))}))})();