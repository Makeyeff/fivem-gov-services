fx_version 'adamant'
game 'gta5'
author 'maxOrak'
description 'Goverment services'
version '1.0'
lua54 'yes'

client_scripts {
	'client/client.lua',
}


shared_scripts {
	'config.lua'
}

server_scripts {
	'server/server.lua',
}

ui_page 'html/index.html'


files {
    'html/**'
}