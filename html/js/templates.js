import { text } from './text.js';

export const agreeChangeIdCardTemplate = () => {
  return `
    <div class="title-changeCardId">${text.template.agreeChangeIdCardTemplate.title}</div><div></div>
    <div>${text.template.agreeChangeIdCardTemplate.name}</div>
    <input id="firstname" />
    <div>${text.template.agreeChangeIdCardTemplate.lastname}</div>
    <input id="secondname" />
     <div class="btn-changeCardId-disagree">${text.template.agreeChangeIdCardTemplate.btnCancel}</div>
    <div class="btn-changeCardId">${text.template.agreeChangeIdCardTemplate.btnAgree}</div>
  `}

export const servicesTemplate = (title, description, id) => {
  return `
    <div class="template-item">
      <div class="template-item-title">${title}</div>
      <div class="template-item-description">${description}</div>
      <div class="template-item-btn btn-${id}">${text.template.servicesTemplate.btnChoice}</div>
    </div>
   `
}

export const licenseTemplate = (title, active) => {
  const value = active ? text.template.licenseTemplate.active : text.template.licenseTemplate.disActive;
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
    <div class="title-changeCardId">${text.template.showAppealsTemplate.title}</div>
    <textarea id="appeals" rows="5" cols="33"></textarea>
    <div class="btn-appeals-disagree">${text.template.showAppealsTemplate.btnDisagree}</div>
    <div class="btn-appeals">${text.template.showAppealsTemplate.btnAgree}</div>
  `}