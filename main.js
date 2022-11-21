const aoijs = require("aoi.js")
const setting = require("./settings.js")

const bot = new aoijs.AoiClient({
token: setting.BotToken,
prefix: setting.BotPrefix,
intents: "all", // intents: ["messageContent", "guilds", "guildMessages"],
database: {
  db: require("aoi.db"),
  type: "aoi.db",
  path: "./Database/",
  tables: ["ControlPanelBot"],
  promisify: true 
},
// disableLogs: true
})

bot.onMessage()
bot.onInteractionCreate()

const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd,"./src/")

bot.variables({
ControlPanelURL: setting.ControlPanelURL,
ControlPanelApiKey: setting.ControlPanelApiKey,
BotPrefix: setting.BotPrefix,
AdminIDs: setting.AdminIDs,
SuccessEmoji: setting.SuccessEmoji,
ErrorEmoji: setting.ErrorEmoji,
InfoEmoji: setting.InfoEmoji
})