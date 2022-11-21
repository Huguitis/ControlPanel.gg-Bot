module.exports = [{
name: "sendNotification",
code: `
$addButton[1;All Users;success;AllUsers_$authorID;no]
$addButton[1;Especified Users;success;EspecifiedUsers_$authorID;no]
$color[1;YELLOW]
$footer[1;Developed by Huguitis#4583]
$description[1;$getVar[InfoEmoji] **__Send Notification:__**
You are about sending a notification. You can:

- Send a notification to the users you want.
- Send a notification to all the users.]
    
$onlyForIDs[$joinSplitText[;];{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **You don't have permission to execute this command!**}}]
$textSplit[$getVar[AdminIDs];, ]

$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Send Notification;SendNotificationEspecifiedUsersForm;
    {actionRow:
        {textInput:Users:1:usersInput:yes:186902438396035072,2:1:4000}
    }
    {actionRow:
        {textInput:Title:1:titleInput:no:Hello there!:1:4000}
    }
    {actionRow:
        {textInput:Content:2:contentInput:no:<b>test notification content</b>:1:4000}
    }
]
    
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
    
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==EspecifiedUsers;]

$suppressErrors
`
}, {
type: "interaction",
name: "SendNotificationEspecifiedUsersForm",
prototype: 'modal',
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:GREEN}{description:
> ***__Notification sent successfully!__*** $getVar[SuccessEmoji]
    
$getVar[InfoEmoji] **__Notification Information:__**
    
> **Via:** Database
> **Users:** $textInputValue[usersInput]
> **Title:** $textInputValue[titleInput]
> **Content:** \`$textInputValue[contentInput]\`
}}]
    
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/notifications;POST;{"via": "database", "users": "$nonEscape[$textInputValue[usersInput]]", "title": "$nonEscape[$textInputValue[titleInput]]", "content": "$nonEscape[$textInputValue[contentInput]]"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]

$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Send Notification;SendNotificationAllUsersForm;
    {actionRow:
        {textInput:Title:1:titleInput:no:Hello there!:1:4000}
    }
    {actionRow:
        {textInput:Content:2:contentInput:no:<b>test notification content</b>:1:4000}
    }
]
        
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
            
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==AllUsers;]

$suppressErrors
`
}, {
type: "interaction",
name: "SendNotificationAllUsersForm",
prototype: 'modal',
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:GREEN}{description:
> ***__Notification sent successfully!__*** $getVar[SuccessEmoji]
        
$getVar[InfoEmoji] **__Notification Information:__**
        
> **Via:** Database
> **Users:** All.
> **Title:** $textInputValue[titleInput]
> **Content:** \`$textInputValue[contentInput]\`
}}]
        
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/notifications;POST;{"via": "database", "all": "1", "title": "$nonEscape[$textInputValue[titleInput]]", "content": "$nonEscape[$textInputValue[contentInput]]"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]

$suppressErrors
`
}]