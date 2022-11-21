module.exports = [{
name: "createUser",
code: `
$addButton[1;Create User;success;CreateUser_$authorID;no]
$color[1;YELLOW]
$footer[1;Developed by Huguitis#4583]
$description[1;$getVar[InfoEmoji] **__Create User:__**
You are about creating a new user. Click on the "Create User" button to continue.

> **__Note:__ If no password specified, will generate a random one automatically.**]

$onlyForIDs[$joinSplitText[;];{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **You don't have permission to execute this command!**}}]
$textSplit[$getVar[AdminIDs];, ]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Create User;createUserForm;
    {actionRow:
      {textInput:Username:1:usernameInput:yes:$username:4:30}
    }
    {actionRow:
      {textInput:Email:1:emailInput:yes:mail@huguitisnodes.host:1:64}
    }
    {actionRow:
        {textInput:Password:1:passwordInput:no:********:8:191}
    }
]

$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
    
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==CreateUser;]
`
}, {
type: "interaction",
name: "createUserForm",
prototype: 'modal',
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:GREEN}{description:
> ***__User created successfully!__*** $getVar[SuccessEmoji]

$getVar[InfoEmoji] **__User Information:__**

> **Username:** $textInputValue[usernameInput]
> **Email:** $textInputValue[emailInput]
> **Password:** ||$get[Password]||
}}]

$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/users;POST;{"name": "$textInputValue[usernameInput]", "email": "$textInputValue[emailInput]", "password": "$get[Password]"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]

$let[Password;$if[$textInputValue[passwordInput]==;$randomString[12];$textInputValue[passwordInput]]]

$onlyIf[$checkContains[$textInputValue[emailInput];@]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **That is not a valid email!**}{color:RED}}]
$onlyIf[$checkContains[$textInputValue[emailInput];.]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **That is not a valid email!**}{color:RED}}]
`
}]