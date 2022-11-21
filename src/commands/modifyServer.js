module.exports = [{
name: "modifyServer",
code: `
$addButton[1;Delete Server;danger;DeleteServer__$authorID__$message[1];no]
$addButton[1;Unsuspend;danger;UnsuspendServer__$authorID__$message[1];$if[$getObjectProperty[suspended]==null;yes;no]]
$addButton[1;Suspend;danger;SuspendServer__$authorID__$message[1];$if[$getObjectProperty[suspended]!=null;yes;no]]
    
$footer[1;Developed by Huguitis#4583]
$color[1;$if[$getObjectProperty[suspended]==null;GREEN;RED]]
$description[1;$getVar[InfoEmoji] **__Server Information:__**
    
> **ID:** $getObjectProperty[id]
> **Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
> **Identifier:** $getObjectProperty[identifier]
> **Name:** $getObjectProperty[name]
> **Description:** $if[$getObjectProperty[description]==null;None.;$getObjectProperty[description]]
> **Owner ID:** $getObjectProperty[user_id]
> **Suspended:** $if[$getObjectProperty[suspended]==null;No;Yes] 
]
    
$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/servers/$message[1];;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **Cannot find any server with that ID!**}};{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
    
$onlyForIDs[$joinSplitText[;];{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **You don't have permission to execute this command!**}}]
$textSplit[$getVar[AdminIDs];, ]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:RED}{description:
> ***__Server suspended successfully!__*** $getVar[SuccessEmoji]
    
$getVar[InfoEmoji] **__Server Information:__**
    
> **ID:** $getObjectProperty[id]
> **Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
> **Identifier:** $getObjectProperty[identifier]
> **Name:** $getObjectProperty[name]
> **Description:** $if[$getObjectProperty[description]==null;None.;$getObjectProperty[description]]
> **Owner ID:** $getObjectProperty[user_id]
> **Suspended:** Yes
}};
{actionRow:{button:Suspend:danger:SuspendServer__$authorID__$advancedTextSplit[$interactionData[customId];__;3]:yes}{button:Unsuspend:danger:UnsuspendServer__$authorID__$advancedTextSplit[$interactionData[customId];__;3]:no}{button:Delete Server:danger:DeleteServer__$authorID__$advancedTextSplit[$interactionData[customId];__;3]:no}}]
           
$createObject[$httpRequest[$getVar[ControlPanelURL]/api/servers/$advancedTextSplit[$interactionData[customId];__;3]/suspend;PATCH;;;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
        
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
        
$onlyif[$advancedTextSplit[$interactionData[customId];__;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];__;1]==SuspendServer;]
        
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:GREEN}{description:
> ***__Server unsuspended successfully!__*** $getVar[SuccessEmoji]
        
$getVar[InfoEmoji] **__Server Information:__**
        
> **ID:** $getObjectProperty[id]
> **Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
> **Identifier:** $getObjectProperty[identifier]
> **Name:** $getObjectProperty[name]
> **Description:** $if[$getObjectProperty[description]==null;None.;$getObjectProperty[description]]
> **Owner ID:** $getObjectProperty[user_id]
> **Suspended:** No
}};
{actionRow:{button:Suspend:danger:SuspendServer__$authorID__$advancedTextSplit[$interactionData[customId];__;3]:no}{button:Unsuspend:danger:UnsuspendServer__$authorID__$advancedTextSplit[$interactionData[customId];__;3]:yes}{button:Delete Server:danger:DeleteServer__$authorID__$advancedTextSplit[$interactionData[customId];__;3]:no}}]
               
$createObject[$httpRequest[$getVar[ControlPanelURL]/api/servers/$advancedTextSplit[$interactionData[customId];__;3]/unsuspend;PATCH;;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
            
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
            
$onlyif[$advancedTextSplit[$interactionData[customId];__;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
            
$onlyIf[$advancedTextSplit[$interactionData[customId];__;1]==UnsuspendServer;]
            
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:RED}{description:
> ***__Server deleted successfully!__*** $getVar[SuccessEmoji]}}]
                   
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/servers/$advancedTextSplit[$interactionData[customId];__;3];DELETE;;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]
                
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
                
$onlyif[$advancedTextSplit[$interactionData[customId];__;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
                
$onlyIf[$advancedTextSplit[$interactionData[customId];__;1]==DeleteServer;]
                
$suppressErrors
`
}]