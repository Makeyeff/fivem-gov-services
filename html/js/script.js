import { showChangeCardPopup, getIdCard, getDriverLicense } from './services.js';
import { servicesTemplate, licenseTemplate } from './templates.js';
import { onCloseClick } from './closeAll.js';
import { openJobCenter } from './openAndCloseUI.js';
import { text } from './text.js';
import { showContent, onClickBack } from "./navigation.js";

let isDriver = false;
let Licences = undefined;

const setPlayerData = (data) => {
  const { firstname,
    secondname,
    nationality,
    dateOfBirth,
    citizenId,
    gender,
    driver, licences } = data;

  isDriver = driver
  Licences = licences
  const sex = gender === 0 ? 'Male' : "Female";
  $('#o-profile-idCard').html(citizenId);
  $('#o-profile-name').html(firstname);
  $('#o-profile-lastname').html(secondname);
  $('#o-profile-sex').html(sex);
  $('#o-profile-dateOfBirth').html(dateOfBirth);
  $('#o-profile-nationality').html(nationality);
}

export const showServices = () => {
  const contentList = $(".o-site-content");
  contentList.empty();
  text.servises.map((item) => {
    contentList.append(servicesTemplate(item.title, item.description, item.id));
  })
  $(".btn-changeIdCard").on("click", () => showChangeCardPopup());
  $(".btn-getIdCard").on("click", () => getIdCard());
  if (isDriver) {
    $(".btn-getDriverLicense").on("click", () => getDriverLicense());
  } else {
    $(".btn-getDriverLicense").addClass("disable");
  }
}

export const showLicense = () => {
  const contentList = $(".o-site-content");
  contentList.empty();
  for (const key in Licences) {
    if (Licences.hasOwnProperty(key)) {
      console.log(`${key}: ${Licences[key]}`);
      contentList.append(licenseTemplate(key, Licences[key]));
    }
  }
}



const onClicksAction = () => {
  $(".nav-all").on("click", () => showContent());
  $(".nav-services").on("click", () => showContent('services'));
  $(".nav-license").on("click", () => showContent('license'));
  $(".nav-property").on("click", () => showContent('property'));
  $(".nav-appeals").on("click", () => showContent('appeals'));
  // 
  $(".homeImg").on("click", () => showContent());
  $(".backImg").on("click", () => onClickBack());
  // Кнопка выхода
  $(".exitbtn").on("click", () => {
    onCloseClick()
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      onCloseClick()
    }
  });
  showContent();
}

window.addEventListener("message", (event) => {
  switch (event.data.action) {
    case "SHOW_UI":
      setPlayerData(event.data);
      openJobCenter(true);
      onClicksAction();
      break;
    default:
      break;
  }
});