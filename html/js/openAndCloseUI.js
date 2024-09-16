export const openJobCenter = (enable) => {
    if (enable) {
      $("body").css("display", "block");
    } else {
      $("body").css("display", "none");
      $.post(`http://${GetParentResourceName()}/close`, JSON.stringify({}));
    }
  }