QBCore = exports['qb-core']:GetCoreObject()
local webhookWriteToGov =
    "https://discord.com/api/webhooks/1285259929875124224/7k7SlRBz7I5j3OmHlokfF1d3y-zS_KeVnBaDYm5LNbzf0YYbhl_ViFvfn6Dkm0e21_1T"

local function giveNewIdCard(source)
    local Player = QBCore.Functions.GetPlayer(source)
    local info = {}
    info.citizenid = Player.PlayerData.citizenid
    info.firstname = Player.PlayerData.charinfo.firstname
    info.lastname = Player.PlayerData.charinfo.lastname
    info.birthdate = Player.PlayerData.charinfo.birthdate
    info.gender = Player.PlayerData.charinfo.gender
    info.nationality = Player.PlayerData.charinfo.nationality

    exports['qb-inventory']:AddItem(source, 'id_card', 1, false, info, 'giveNewIdCard')
end

local function giveDriverLicense(source)
    local Player = QBCore.Functions.GetPlayer(source)
    local info = {}
    info.firstname = Player.PlayerData.charinfo.firstname
    info.lastname = Player.PlayerData.charinfo.lastname
    info.birthdate = Player.PlayerData.charinfo.birthdate
    info.type = 'Class C Driver License'

    exports['qb-inventory']:AddItem(source, 'driver_license', 1, false, info, 'giveDriverLicense')
end

local function sendToDiscord(message, name)
    local username = name
    if username == nil then
        username = "Аноним"
    end

    local content = "Обращение от " .. username .. ": " .. message
    local data = {
        content = content,
        username = 'Обращние гражданина'
    }

    PerformHttpRequest(webhookWriteToGov, function(err, text, headers)
        if err ~= 200 or err ~= 204 then
            print("Error sending message to Discord:", err)
        else
            print("Message sent successfully! Response:", text)
        end
    end, 'POST', json.encode(data), {
        ['Content-Type'] = 'application/json'
    })
end

QBCore.Functions.CreateCallback('govermentService:server:changeName', function(source, cb, firstname, lastname)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local charInfo = Player.PlayerData.charinfo

    charInfo.firstname = charInfo.firstname ~= '' and firstname
    charInfo.lastname = charInfo.lastname ~= '' and lastname
    Player.Functions.SetPlayerData("charinfo", charInfo)
    Player.Functions.SetMetaData("firstname", firstname)
    Player.Functions.SetMetaData("lastname", lastname)

    Player.Functions.Save()
    Player.Functions.UpdatePlayerData(true)
    Wait(1000)
    TriggerClientEvent('QBCore:Player:UpdatePlayerData', src)
    Wait(3000)
    Player = QBCore.Functions.GetPlayer(src)
    giveNewIdCard(src)
    cb()
end)

QBCore.Functions.CreateCallback('govermentService:server:getIdCard', function(source, cb)
    local src = source
    giveNewIdCard(src)
    cb()
end)

QBCore.Functions.CreateCallback('govermentService:server:getDriverLicense', function(source, cb)
    local src = source
    giveDriverLicense(src)
    cb()
end)

QBCore.Functions.CreateCallback('govermentService:server:writeToGov', function(source, cb, msg, name)
    local src = source
    sendToDiscord(msg, name)
    cb()
end)
