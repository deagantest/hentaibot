const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const request = require('request');
const client = new Discord.Client();
const config = require("./config.json");

//attaching the config to the CLIENT so it's accessible everywhere.
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

//loading 18+ NSFW commands
fs.readdir("./commands/nsfw/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/nsfw/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load nsfw directory ${commandName}`);
    client.commands.set(commandName, props);
  });
});

//Bot Status timer
var timer;
var i = 0;
  timer = client.setInterval(function () {
    var gamePresence = [
      `hentai`,
      `nekos`,
      `-help`,
      `anime`,
      `${client.guilds.size} nekos!`,
      `${client.users.size} traps!`
    ];
    client.user.setPresence({ game: { name: gamePresence[i%gamePresence.length], type: 3 } });
    i++;
  },7500);
//End of code

//Log the Bot in.
client.login(config.token);
