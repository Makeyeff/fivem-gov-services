Config = {}

Config.Mysql = "mysql-async"

Config.StartLocation = {
    pedcoords = vector4(-269.81802368164, -960.033203125, 30.22313117981, 301.3229675293),
    pedModel = 'a_m_y_business_01',
    markercoord = vector3(-269.27758789063, -959.7373046875, 30.22313117981),
    markerConfig = {
        Type = 1,
        rgb = {
            r = 255,
            g = 255,
            b = 0
        }
    },
    blip = {
        color = 5,
        name = 'Job Center',
        scale = 1.0,
        sprite = 407
    }
}


Config.Jobs = {{
    isGoverment = true,
    jobname = "Сменить имя",
    desc = "Тут можно сменить ваше имя и фамилию",
    level = 0,
    image = "./imgs/lumberjack_bg.jpg",
    whitelist = true,
    webhook = 'https://discord.com/api/webhooks/1133469268411957329/fwdrfMAgzzVcYaKOYzpxVl45grFf6O3lqncajUNTkvjfo79vA9xvYUe2gF_60tv7M-kG',
    setJobConfig = {
        name = 'lumberjack',
        grade = 0
    },
    questions = {"Введите имя", "Введите фамилию"}
}}

Config.Local = {
    ['jobsetit'] = 'Welcome To : ',
    ['jobWhitelistSend'] = 'Your Whitelist Sended To : ',
    ['buyLevel'] = 'thank you for purchase you get a level in job center menu. enjoy',
    ['OpenMenu'] = 'Press ~INPUT_CONTEXT~ To Open ~y~Job Center',
    ['getXP'] = '[JOB CENTER] You Recive : ',
    ['getLevel'] = '[JOB CENTER] Your Level Upgrade To : '
}
