module.exports = [{
name: "modifyUser",
code: `
$addButton[2;Delete User;danger;DeleteUser_$authorID_$findUser[$message];no]
$addButton[1;Change Email;primary;ChangeEmail_$authorID_$findUser[$message];no]
$addButton[1;Change Server Limit;primary;ChangeServerLimit_$authorID_$findUser[$message];no]
$addButton[1;Change Credits;primary;ChangeCredits_$authorID_$findUser[$message];no]
$addButton[1;Unsuspend;danger;UnsuspendUser_$authorID_$findUser[$message];$if[$getObjectProperty[suspended]==0;yes;no]]
$addButton[1;Suspend;danger;SuspendUser_$authorID_$findUser[$message];$if[$getObjectProperty[suspended]==1;yes;no]]
    
$footer[1;Developed by Huguitis#4583]
$color[1;$if[$getObjectProperty[suspended]==1;RED;GREEN]]
$thumbnail[1;$userAvatar[$findUser[$message]]]
$description[1;$getVar[InfoEmoji] **__$username[$findUser[$message]]'s Information:__**
    
> **ID:** $getObjectProperty[id]
> **Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
> **Name:** $getObjectProperty[name]
> **Role:** $getObjectProperty[role]
> **Credits:** $getObjectProperty[credits]
> **Server Limit:** $getObjectProperty[server_limit]
> **Email:** ||$getObjectProperty[email]||
> **IP:** ||$getObjectProperty[ip]||
> **Discord Verified At:** $getObjectProperty[discord_verified_at]
> **Suspended:** $if[$getObjectProperty[suspended]==0;No;Yes] 
> **Referral Code:** $getObjectProperty[referral_code]
]
    
$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$findUser[$message];;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **That user is not registered on the dashboard or they have not linked their discord account to this one!**}};{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
    
$onlyForIDs[$joinSplitText[;];{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **You don't have permission to execute this command!**}}]
$textSplit[$getVar[AdminIDs];, ]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:RED}{thumbnail:$userAvatar[$advancedTextSplit[$interactionData[customId];_;3]]}{description:
> ***__User suspended successfully!__*** $getVar[SuccessEmoji]

$getVar[InfoEmoji] **__$username[$advancedTextSplit[$interactionData[customId];_;3]]'s Information:__**

> **ID:** $getObjectProperty[id]
> **Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
> **Name:** $getObjectProperty[name]
> **Role:** $getObjectProperty[role]
> **Credits:** $getObjectProperty[credits]
> **Server Limit:** $getObjectProperty[server_limit]
> **Email:** ||$getObjectProperty[email]||
> **IP:** ||$getObjectProperty[ip]||
> **Discord Verified At:** $getObjectProperty[discord_verified_at]
> **Suspended:** Yes
> **Referral Code:** $getObjectProperty[referral_code]
}};
{actionRow:{button:Suspend:danger:SuspendUser_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:yes}{button:Unsuspend:danger:UnsuspendUser_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}{button:Change Credits:primary:ChangeCredits_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}{button:Change Server Limit:primary:ChangeServerLimit_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}{button:Change Email:primary:ChangeEmail_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}}{actionRow:{button:Delete User:danger:DeleteUser_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}}]
        
$createObject[$httpRequest[$getVar[ControlPanelURL]/api/users/$advancedTextSplit[$interactionData[customId];_;3]/suspend;PATCH;;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
    
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
    
$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
    
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==SuspendUser;]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:GREEN}{thumbnail:$userAvatar[$advancedTextSplit[$interactionData[customId];_;3]]}{description:
> ***__User unsuspended successfully!__*** $getVar[SuccessEmoji]

$getVar[InfoEmoji] **__$username[$advancedTextSplit[$interactionData[customId];_;3]]'s Information:__**
    
> **ID:** $getObjectProperty[id]
> **Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
> **Name:** $getObjectProperty[name]
> **Role:** $getObjectProperty[role]
> **Credits:** $getObjectProperty[credits]
> **Server Limit:** $getObjectProperty[server_limit]
> **Email:** ||$getObjectProperty[email]||
> **IP:** ||$getObjectProperty[ip]||
> **Discord Verified At:** $getObjectProperty[discord_verified_at]
> **Suspended:** No
> **Referral Code:** $getObjectProperty[referral_code]
}};
{actionRow:{button:Suspend:danger:SuspendUser_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}{button:Unsuspend:danger:UnsuspendUser_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:yes}{button:Change Credits:primary:ChangeCredits_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}{button:Change Server Limit:primary:ChangeServerLimit_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}{button:Change Email:primary:ChangeEmail_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}}{actionRow:{button:Delete User:danger:DeleteUser_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}}]
       
$createObject[$httpRequest[$getVar[ControlPanelURL]/api/users/$advancedTextSplit[$interactionData[customId];_;3]/unsuspend;PATCH;;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
    
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
    
$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
    
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==UnsuspendUser;]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{color:YELLOW}{description:**Please send the new amount of credits:**}]
           
$awaitMessages[$channelID;$authorID;1m;everything;updatecredits;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **Out of time.**};{"ModifiedUser": "$advancedTextSplit[$interactionData[customId];_;3]", "name": "$getObjectProperty[name]", "email": "$getObjectProperty[email]", "credits": "$getObjectProperty[credits]", "server_limit": "$getObjectProperty[server_limit]", "role": "$getObjectProperty[role]"};]
    
$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$advancedTextSplit[$interactionData[customId];_;3];;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **That user is not registered on the dashboard or they have not linked their discord account to this one!**}};{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
    
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
        
$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ChangeCredits;]
    
$suppressErrors
`
}, {
name: "updatecredits",
type: "awaited",
code: `
$addButton[2;Delete User;danger;DeleteUser_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Change Email;primary;ChangeEmail_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Change Server Limit;primary;ChangeServerLimit_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Change Credits;primary;ChangeCredits_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Unsuspend;danger;UnsuspendUser_$authorID_$awaitData[ModifiedUser];$if[$getObjectProperty[suspended]==0;yes;no]]
$addButton[1;Suspend;danger;SuspendUser_$authorID_$awaitData[ModifiedUser];$if[$getObjectProperty[suspended]==1;yes;no]]

$footer[1;Developed by Huguitis#4583]
$color[1;$if[$getObjectProperty[suspended]==1;RED;GREEN]]
$thumbnail[1;$userAvatar[$awaitData[ModifiedUser]]]
$description[1;
> ***__User credits changed successfully!__*** $getVar[SuccessEmoji]
    
$getVar[InfoEmoji] **__$username[$awaitData[ModifiedUser]]'s Information:__**
    
> **ID:** $getObjectProperty[id]
> **Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
> **Name:** $getObjectProperty[name]
> **Role:** $getObjectProperty[role]
> **Credits:** $message
> **Server Limit:** $getObjectProperty[server_limit]
> **Email:** ||$getObjectProperty[email]||
> **IP:** ||$getObjectProperty[ip]||
> **Discord Verified At:** $getObjectProperty[discord_verified_at]
> **Suspended:** $if[$getObjectProperty[suspended]==0;No;Yes] 
> **Referral Code:** $getObjectProperty[referral_code]
]
    
$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$awaitData[ModifiedUser];;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **That user is not registered on the dashboard or they have not linked their discord account to this one!**}};{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
    
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/users/$awaitData[ModifiedUser];PATCH;{"name": "$awaitData[name]", "email": "$awaitData[email]", "credits": "$message",  "server_limit": "$awaitData[server_limit]", "role": "$awaitData[role]"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]"}]]
    
$onlyIf[$isNumber[$message]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **That is not a valid number!**}{color:RED}}]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{color:YELLOW}{description:**Please send the new server limit:**}]
           
$awaitMessages[$channelID;$authorID;1m;everything;updateserverlimit;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **Out of time.**};{"ModifiedUser": "$advancedTextSplit[$interactionData[customId];_;3]", "name": "$getObjectProperty[name]", "email": "$getObjectProperty[email]", "credits": "$getObjectProperty[credits]", "server_limit": "$getObjectProperty[server_limit]", "role": "$getObjectProperty[role]"};]
   
$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$advancedTextSplit[$interactionData[customId];_;3];;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **That user is not registered on the dashboard or they have not linked their discord account to this one!**}};{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
    
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
            
$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
            
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ChangeServerLimit;]
    
$suppressErrors
`
}, {
name: "updateserverlimit",
type: "awaited",
code: `
$addButton[2;Delete User;danger;DeleteUser_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Change Email;primary;ChangeEmail_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Change Server Limit;primary;ChangeServerLimit_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Change Credits;primary;ChangeCredits_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Unsuspend;danger;UnsuspendUser_$authorID_$awaitData[ModifiedUser];$if[$getObjectProperty[suspended]==0;yes;no]]
$addButton[1;Suspend;danger;SuspendUser_$authorID_$awaitData[ModifiedUser];$if[$getObjectProperty[suspended]==1;yes;no]]
        
$footer[1;Developed by Huguitis#4583]
$color[1;$if[$getObjectProperty[suspended]==1;RED;GREEN]]
$thumbnail[1;$userAvatar[$awaitData[ModifiedUser]]]
$description[1;
> ***__User server limit changed successfully!__*** $getVar[SuccessEmoji]
        
$getVar[InfoEmoji] **__$username[$awaitData[ModifiedUser]]'s Information:__**
        
> **ID:** $getObjectProperty[id]
> **Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
> **Name:** $getObjectProperty[name]
> **Role:** $getObjectProperty[role]
> **Credits:** $getObjectProperty[credits]
> **Server Limit:** $message
> **Email:** ||$getObjectProperty[email]||
> **IP:** ||$getObjectProperty[ip]||
> **Discord Verified At:** $getObjectProperty[discord_verified_at]
> **Suspended:** $if[$getObjectProperty[suspended]==0;No;Yes] 
> **Referral Code:** $getObjectProperty[referral_code]
]
        
$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$awaitData[ModifiedUser];;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **That user is not registered on the dashboard or they have not linked their discord account to this one!**}};{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
        
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/users/$awaitData[ModifiedUser];PATCH;{"name": "$awaitData[name]", "email": "$awaitData[email]", "credits": "$awaitData[credits]",  "server_limit": "$message", "role": "$awaitData[role]"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]"}]]
    
$onlyIf[$isNumber[$message]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **That is not a valid number!**}{color:RED}}]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{color:YELLOW}{description:**Please send the new user email:**}]
                   
$awaitMessages[$channelID;$authorID;1m;everything;updateemail;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **Out of time.**};{"ModifiedUser": "$advancedTextSplit[$interactionData[customId];_;3]", "name": "$getObjectProperty[name]", "email": "$getObjectProperty[email]", "credits": "$getObjectProperty[credits]", "server_limit": "$getObjectProperty[server_limit]", "role": "$getObjectProperty[role]"};]
            
$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$advancedTextSplit[$interactionData[customId];_;3];;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **That user is not registered on the dashboard or they have not linked their discord account to this one!**}};{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
            
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
                
$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
                
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ChangeEmail;]
    
$suppressErrors
`
}, {
name: "updateemail",
type: "awaited",
code: `
$addButton[2;Delete User;danger;DeleteUser_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Change Email;primary;ChangeEmail_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Change Server Limit;primary;ChangeServerLimit_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Change Credits;primary;ChangeCredits_$authorID_$awaitData[ModifiedUser];no]
$addButton[1;Unsuspend;danger;UnsuspendUser_$authorID_$awaitData[ModifiedUser];$if[$getObjectProperty[suspended]==0;yes;no]]
$addButton[1;Suspend;danger;SuspendUser_$authorID_$awaitData[ModifiedUser];$if[$getObjectProperty[suspended]==1;yes;no]]
            
$footer[1;Developed by Huguitis#4583]
$color[1;$if[$getObjectProperty[suspended]==1;RED;GREEN]]
$thumbnail[1;$userAvatar[$awaitData[ModifiedUser]]]
$description[1;
> ***__User email changed successfully!__*** $getVar[SuccessEmoji]
            
$getVar[InfoEmoji] **__$username[$awaitData[ModifiedUser]]'s Information:__**
            
> **ID:** $getObjectProperty[id]
> **Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
> **Name:** $getObjectProperty[name]
> **Role:** $getObjectProperty[role]
> **Credits:** $getObjectProperty[credits]
> **Server Limit:** $getObjectProperty[server_limit]
> **Email:** ||$message[1]||
> **IP:** ||$getObjectProperty[ip]||
> **Discord Verified At:** $getObjectProperty[discord_verified_at]
> **Suspended:** $if[$getObjectProperty[suspended]==0;No;Yes] 
> **Referral Code:** $getObjectProperty[referral_code]
]
            
$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$awaitData[ModifiedUser];;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **That user is not registered on the dashboard or they have not linked their discord account to this one!**}};{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
            
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/users/$awaitData[ModifiedUser];PATCH;{"name": "$awaitData[name]", "email": "$message[1]", "credits": "$awaitData[credits]",  "server_limit": "$awaitData[server_limit]", "role": "$awaitData[role]"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]"}]]
        
$onlyIf[$checkContains[$message[1];@]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **That is not a valid email!**}{color:RED}}]
$onlyIf[$checkContains[$message[1];.]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **That is not a valid email!**}{color:RED}}]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:RED}{description:
> ***__User deleted successfully!__*** $getVar[SuccessEmoji]}}]
            
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/users/$advancedTextSplit[$interactionData[customId];_;3];DELETE;;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]]
        
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
        
$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==DeleteUser;]
    
$suppressErrors
`
}]
