QBCore = exports['qb-core']:GetCoreObject()

---------------------------------------
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
