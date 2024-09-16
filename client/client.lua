local QBCore = exports['qb-core']:GetCoreObject()

local peds = {}

CreateThread(function()
    SetNuiFocus(false, false)
    Wait(1000)
    DoScreenFadeIn(1000)
end)

local function helptext(str)
    SetTextComponentFormat("STRING")
    AddTextComponentString(str)
    DisplayHelpTextFromStringLabel(0, 0, 1, -1)
end

local function openGovServicesUI()
    local player = QBCore.Functions.GetPlayerData()
    local metadata = player.metadata
    local charinfo = player.charinfo
    local licences = metadata.licences

    local firstName = player.charinfo.firstname
    local lastName = player.charinfo.lastname
    local phone = charinfo.phone
    local citizenId = player.citizenid
    local dateOfBirth = charinfo.birthdate
    local gender = charinfo.gender
    local nationality = charinfo.nationality
    local nationality = charinfo.nationality
    local driver = licences.driver
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "SHOW_UI",
        firstname = firstName,
        secondname = lastName,
        nationality = nationality,
        dateOfBirth = dateOfBirth,
        citizenId = citizenId,
        gender = gender,
        driver = driver,
        licences = licences
    })
end

local Open_Menu = function()
    while not IsScreenFadedOut() do
        DoScreenFadeOut(1000)
        Wait(0)
    end
    Wait(1000)
    openGovServicesUI()
end

RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)
    Wait(1000)
    DoScreenFadeIn(1000)
end)

RegisterNUICallback('changeNameIdCard', function(data, cb)
    local firstname = data.firstname
    local secondname = data.secondname
    QBCore.Functions.TriggerCallback('govermentService:server:changeName', function()
        TriggerEvent('QBCore:Notify', 'Данные были изменены')
    end, firstname, secondname)
end)

RegisterNUICallback('getIdCard', function(data, cb)
    QBCore.Functions.TriggerCallback('govermentService:server:getIdCard', function()
        TriggerEvent('QBCore:Notify', 'Новая Id карта получена')
    end)
end)

RegisterNUICallback('changeNameIdCard', function(data, cb)
    local firstname = data.firstname
    local secondname = data.secondname
    QBCore.Functions.TriggerCallback('govermentService:server:changeName', function()
        TriggerEvent('QBCore:Notify', 'Данные были изменены')
    end, firstname, secondname)
end)

RegisterNUICallback('getDriverLicense', function(data, cb)
    QBCore.Functions.TriggerCallback('govermentService:server:getDriverLicense', function()
        TriggerEvent('QBCore:Notify', 'Новые водительские права получены');
    end)
end)

RegisterNUICallback('writeToGov', function(data, cb)
    local msg = data.msg
    local name = data.name

    QBCore.Functions.TriggerCallback('govermentService:server:writeToGov', function()
        TriggerEvent('QBCore:Notify', 'Обращение отправлено')
    end, msg, name)
end)
-- createBlip
Citizen.CreateThread(function()
    Wait(2000)
    local blip = AddBlipForCoord(Config.StartLocation.markercoord.x, Config.StartLocation.markercoord.y,
        Config.StartLocation.markercoord.z)
    SetBlipSprite(blip, Config.StartLocation.blip.sprite)
    SetBlipDisplay(blip, 4)
    SetBlipScale(blip, Config.StartLocation.blip.scale)
    SetBlipColour(blip, Config.StartLocation.blip.color)
    SetBlipAsShortRange(blip, true)
    BeginTextCommandSetBlipName('STRING')
    AddTextComponentSubstringPlayerName(Config.StartLocation.blip.name)
    EndTextCommandSetBlipName(blip)
end)

-- CreatePed
Citizen.CreateThread(function()

    local pedModel = Config.StartLocation.pedModel -- Change this to the ped model you want for the NPC
    RequestModel(pedModel)
    while not HasModelLoaded(pedModel) do
        Wait(1)
    end
    local ped = CreatePed(4, pedModel, Config.StartLocation.pedcoords, false, true)
    SetPedCanBeTargetted(ped, false)
    SetPedCanBeKnockedOffVehicle(ped, false)
    SetEntityAsMissionEntity(ped, true, true)
    SetBlockingOfNonTemporaryEvents(ped, true)
    SetEntityInvincible(ped, true)
    FreezeEntityPosition(ped, true)
    table.insert(peds, ped)

    local greetingSent = false
    local animationPlayed = false

    while true do
        local sleep = true
        Wait(0)
        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)
        local npcCoords = GetEntityCoords(ped)
        local distance = #(playerCoords - npcCoords)
        if not animationPlayed and distance < 2.0 then
            sleep = false
            TaskPlayAnim(ped, "gestures@m@standing@casual", "gesture_hello", 8.0, 1.0, -1, 16, 0, false, false, false)
            PlayAmbientSpeech1(ped, "GENERIC_HI", "SPEECH_PARAMS_FORCE_NORMAL_CLEAR")
            animationPlayed = true
        end
        if distance >= 2.0 and animationPlayed then
            animationPlayed = false
        end
        if distance < 10.0 and not inMenu then
            sleep = false
            DrawMarker(Config.StartLocation.markerConfig.Type, Config.StartLocation.markercoord.x,
                Config.StartLocation.markercoord.y, Config.StartLocation.markercoord.z, 0, 0, 0, 0, 0, 0, 0.5, 0.5, 0.6,
                Config.StartLocation.markerConfig.rgb.r, Config.StartLocation.markerConfig.rgb.g,
                Config.StartLocation.markerConfig.rgb.b, 255, 0, 1, 0, 1, 0, 0, 0)
            if distance < 2.0 then
                helptext(Config.Local['OpenMenu'])
                if IsControlJustPressed(0, 86) then

                    Open_Menu()

                end
            end
        end
        if sleep then
            Wait(1000)
        end
    end
end)
