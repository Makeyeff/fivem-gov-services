import { text } from './text.js';

export const agreeChangeIdCardTemplate = () => {
  return `
    <div class="title-changeCardId">Смена паспортных данных </div><div></div>
    <div>Введите новое имя: </div>
    <input id="firstname" />
    <div>Введите новую фамилию: </div>
    <input id="secondname" />
     <div class="btn-changeCardId-disagree">Отмена</div>
    <div class="btn-changeCardId">Подтвердить</div>
  `}

export const servicesTemplate = (title, description, id) => {
  return `
    <div class="template-item">
      <div class="template-item-title">${title}</div>
      <div class="template-item-description">${description}</div>
      <div class="template-item-btn btn-${id}">Выбрать</div>
    </div>
   `
}

export const licenseTemplate = (title, active) => {
  const value = active ? 'Активна' : 'Не активна'
  console.log()
  const resultTitle = text.licenses?.[title]?.[0] ? text.licenses?.[title]?.[0] : title;
  const resultDescription = text.licenses?.[title]?.[1] ? text.licenses?.[title]?.[1] : title;

  return `
    <div class="template-item">
      <div class="template-item-title">${resultTitle}</div>
      <div class="template-item-description">${resultDescription}</div>
      <div class="template-item-btn btn-${title}">${value}</div>
    </div>
   `
}

export const showAppealsTemplate = () => {
  return `
    <div class="title-changeCardId">Ваше обращение</div>
    <textarea id="appeals" rows="5" cols="33"></textarea>
    <div class="btn-appeals-disagree">Отмена</div>
    <div class="btn-appeals">Подтвердить</div>
  `}