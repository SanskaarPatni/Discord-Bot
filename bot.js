require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const PREFIX = "$";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  if (msg.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = msg.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    console.log(CMD_NAME);
    console.log(args);
    if (CMD_NAME === "kick") {
      if (!msg.member.hasPermission("KICK_MEMBERS"))
        return msg.reply("You do not have permissions to use that command");
      if (args.length === 0) return msg.reply("Please provide an ID");
      const member = msg.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => msg.channel.send(`${member} was kicked.`))
          .catch((err) => msg.channel.send("I cannot kick the user  :("));
      } else {
        msg.channel.send("That member was not found");
      }
    } else if (CMD_NAME === "ban") {
      if (!msg.member.hasPermission("BAN_MEMBERS"))
        return msg.reply("You do not have permissions to use that command");
    }
  }
});
// client.on("typingStart", (channel, user) => {
//   console.log("Type fast");
// });

client.login(process.env.DISCORD_BOT_TOKEN);
