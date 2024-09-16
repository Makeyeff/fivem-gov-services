import { agreeChangeIdCardTemplate } from './templates.js'
import { mouseSoundEffect } from './mouseSoundEffect.js';

const agreeChangeIdCard = () => {
  const firstname = $('#firstname').val();
  const secondname = $('#secondname').val();
  if (!firstname.trim() || !secondname.trim()) {
    return false;
  }
  $.post(
    `http://${GetParentResourceName()}/changeNameIdCard`,
    JSON.stringify({
      firstname: firstname.trim(),
      secondname: secondname.trim(),
    })
  );
  $('#o-profile-name').html(firstname.trim());
  $('#o-profile-lastname').html(secondname.trim());
  canselButton()
}

const canselButton = () => {
  $('.o-content').removeClass('o-content-blur');
  const contentList = $(".p-boxes");
  contentList.empty();
  document.querySelector(".request-popup").classList.toggle("show", false);
  mouseSoundEffect();
}

export const showChangeCardPopup = () => {
  const contentList = $(".p-boxes");
  document.querySelector(".request-popup").classList.toggle("show", true);
  $('.o-content').toggleClass('o-content-blur');
  const content = agreeChangeIdCardTemplate();
  contentList.append(content)
  $(".btn-changeCardId-disagree").on("click", () => canselButton());
  $(".btn-changeCardId").on("click", () => agreeChangeIdCard());
  mouseSoundEffect();
}

export const getIdCard = () => {
  mouseSoundEffect();
  $.post(`http://${GetParentResourceName()}/getIdCard`);
}

export const getDriverLicense = () => {
  mouseSoundEffect();
  $.post(`http://${GetParentResourceName()}/getDriverLicense`);
}
