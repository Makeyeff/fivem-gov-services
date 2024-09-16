
export const notif = (msg) => {
    const notification = document.getElementById('notification');
    $('#notification').html(msg);
    notification.classList.remove('hidden1');
    notification.classList.add('show1');
  
    // Убираем уведомление через 3 секунды
    setTimeout(() => {
      notification.classList.remove('show1');
      notification.classList.add('hidden1');
    }, 3000); // 3000 миллисекунд = 3 секунды
  };