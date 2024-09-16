import { showAppealsTemplate } from './templates.js';
import { mouseSoundEffect } from "./mouseSoundEffect.js";
import { showContent } from './navigation.js';

const appealsCansel = () => {
    mouseSoundEffect();
    $('.o-content').removeClass('o-content-blur');
    const contentList = $(".p-boxes");
    contentList.empty();
    document.querySelector(".request-popup").classList.toggle("show", false);
    showContent()
}

const writeMsg = (msg) => {
    const lastName = $('#o-profile-lastname').text();
    const name = $('#o-profile-name').text();
    const resultName = name + ' ' + lastName
    if (!msg.trim()) {
        // appealsCansel()
        return;
    }
    $.post(
        `http://${GetParentResourceName()}/writeToGov`,
        JSON.stringify({
            msg: msg,
            name: resultName
        })
    );
    appealsCansel()
}


const agreeAppeals = () => {
    const msg = $('#appeals').val();
    writeMsg(msg)
}

export const showAppeals = () => {
    const contentList = $(".p-boxes");
    contentList.empty();
    document.querySelector(".request-popup").classList.toggle("show", true);
    $('.o-content').toggleClass('o-content-blur');
    const content = showAppealsTemplate();
    contentList.append(content)
    $(".btn-appeals-disagree").on("click", () => appealsCansel());
    $(".btn-appeals").on("click", () => agreeAppeals());
    mouseSoundEffect();
}