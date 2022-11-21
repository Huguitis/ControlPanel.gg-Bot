module.exports = ({
name: "help",
aliases: "commands",
code: `
$color[1;GREEN]
$footer[1;Developed by Huguitis#4583]
$addButton[1;Bot Repository;link;https://github.com/Huguitis/ControlPanel.gg-Bot;no]
$addButton[1;Support Server;link;https://discord.gg/CVbPZRt9yG;no]
$description[1;
**__Admin Commands:__**

> \`$getVar[BotPrefix]createUser\` - Creates a new user on the panel.
> \`$getVar[BotPrefix]createVoucher\` - Creates a new voucher code on the panel.
> \`$getVar[BotPrefix]modifyUser\` - Modifies an existing user on the panel.
> \`$getVar[BotPrefix]modifyServer\` - Modifies an existing server on the panel.
> \`$getVar[BotPrefix]sendNotification\` - Sends a notification to all/selected users.
> \`$getVar[BotPrefix]eval\` - Evaluates a code on discord.
]

`
})