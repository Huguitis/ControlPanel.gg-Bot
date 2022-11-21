module.exports = [{
name: "createVoucher",
code: `
$addButton[1;Create Voucher;success;CreateVoucher_$authorID;no]
$color[1;YELLOW]
$footer[1;Developed by Huguitis#4583]
$description[1;$getVar[InfoEmoji] **__Create Voucher:__**
You are about creating a new voucher code. Click on the "Create Voucher" button to continue.
    
> **__Note:__ If no code specified, will generate a random one automatically.**]
    
$onlyForIDs[$joinSplitText[;];{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **You don't have permission to execute this command!**}}]
$textSplit[$getVar[AdminIDs];, ]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Create Voucher;createVoucherForm;
    {actionRow:
        {textInput:Memo:1:memoInput:yes:WinterCode:1:191}
    }
    {actionRow:
        {textInput:Code:1:codeInput:no:WINTER50CREDITS:4:36}
    }
    {actionRow:
        {textInput:Uses:1:usesInput:yes:3:1:4000}
    }
    {actionRow:
        {textInput:Credits:1:creditsInput:yes:50:0:4000}
    }
    {actionRow:
        {textInput:Expires At:1:expiresatInput:yes:26-07-2025}
    }
]
    
$onlyForIDs[$joinSplitText[;];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
$textSplit[$getVar[AdminIDs];, ]
    
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==CreateVoucher;]
`
}, {
type: "interaction",
name: "createVoucherForm",
prototype: 'modal',
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583}{color:GREEN}{description:
> ***__Voucher created successfully!__*** $getVar[SuccessEmoji]

$getVar[InfoEmoji] **__Voucher Information:__**
    
> **Memo:** $textInputValue[memoInput]
> **Code:** ||$get[Code]||
> **Uses:** $textInputValue[usesInput]
> **Credits:** $textInputValue[creditsInput]
> **Expires At:** $textInputValue[expiresatInput]
}}]

$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/vouchers;POST;{"memo": "$textInputValue[memoInput]", "code": "$get[Code]", "uses": "$textInputValue[usesInput]", "credits": "$textInputValue[creditsInput]", "expires_at": "$textInputValue[expiresatInput]"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]

$let[Code;$if[$textInputValue[codeInput]==;$randomString[16];$textInputValue[codeInput]]]
`
}]