import { mouseSoundEffect } from './mouseSoundEffect.js';
import {openJobCenter} from './openAndCloseUI.js'; 

export const onCloseClick = () => {
  $('.o-content').removeClass('o-content-blur');
  document.querySelector(".request-popup.show")?.classList.remove("show");
  mouseSoundEffect();
  openJobCenter(false);
  const contentList = $(".p-boxes");
  contentList.empty();
  document.querySelector(".request-popup").classList.toggle("show", false);
}