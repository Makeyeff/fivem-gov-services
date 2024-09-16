export const text = {
  servises: [{
    title: "Сменить данные",
    description: "Здесь вы можете поменять своё имя или фамилию",
    id: "changeIdCard"
  }, {
    title: "Получить АйДИ карту",
    description: "Здесь вы можете получить свой АЙДИ карту. С ней вы можете спокойно перемещаться по штату.",
    id: "getIdCard"
  }, {
    title: "Получить водительские права",
    description: "Здсь вы можете получить водительские права, если они у вас уже есть в базе.",
    id: "getDriverLicense"
  }],
  licenses: {
    weapon: ["Лицензия на оружие", 'Данная лицензия позволяет вам приобретать, носить и хранить гражданское оружие.'],
    driver: ["Водительские права", "Данный вид прав позволяет вам перемещаться на наземном транспорте."],
    business: ["Лицензия для бизнеса", "Разрешение на ведение специализированного бизнеса"]
  },
  appeals: {
    notMsg: 'Обращене отправлено'
  },
  servicesText: {
    notify: 'Ваши данные изменены, получите новые документы',
    notifyGetIdCard: 'Получите новые документы',
    getDriverLicense: 'Получите новые документы',
  },
  template: {
    agreeChangeIdCardTemplate: {
      title: 'Смена паспортных данных',
      name: 'Введите новое имя:',
      lastname: 'Введите новую фамилию:',
      btnAgree: 'Подтвердить',
      btnCancel: 'Отмена'
    },
    servicesTemplate: {
      btnChoice: 'Выбрать'
    },
    licenseTemplate: {
      active: 'Активна',
      disActive: 'Не активна',
    },
    showAppealsTemplate: {
      title: 'Ваше обращение',
      btnDisagree: 'Отмена',
      btnAgree: 'Подтвердить'
    }
  },

}