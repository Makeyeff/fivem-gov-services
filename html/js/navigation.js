import { showServices, showLicense } from './script.js';
import { mouseSoundEffect, } from './mouseSoundEffect.js';
import { showAppeals } from './appeals.js';

let rootPage = 'https://www.lossantos.gov/';
let lastPage = rootPage + '';

const setActiveNavbar = (type = 'services') => {
    $(".o-site-navbar.active").removeClass("active");
    $(`.o-site-navbar.nav-${type}`).addClass("active");
    lastPage = $('.o-navbar-url').text();
    const regex = /\/([^\/]+)$/;
    const match = lastPage.match(regex);
    lastPage = match && match[1];
    if (type === "all") {
        $('.o-navbar-url').html('https://www.lossantos.gov/');
    } else {
        $('.o-navbar-url').html(`https://www.lossantos.gov/${type}`);
    }

}

export const onClickBack = () => {
    showContent(lastPage)
    mouseSoundEffect()
}

export const showContent = (type = "services") => {
    const contentList = $(".o-site-content");
    contentList.empty();
    mouseSoundEffect();
    switch (type) {
        case "services":
            setActiveNavbar(type);
            showServices();
            break;
        case "license":
            setActiveNavbar(type)
            showLicense();
            break;
        case "property":
            setActiveNavbar(type)
            break;
        case "appeals":
            setActiveNavbar(type)
            showAppeals()
            break;
        default:
            setActiveNavbar()
            break
    }
}