const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL'] });

client.on('ready', () => console.info('ready'));

client.on('messageReactionAdd', async reaction => {
  const msg = reaction.message;
  const emoji = reaction._emoji.name;
  if (emoji !== '🇾') return;

  for (const emoji of ['🇮', '🇰', '🇪', '🇸']) {
    await msg.react(emoji);
  }
});

const token = process.env.YIKES_TOKEN;
if (!token) throw new Error('Specify env YIKES_TOKEN');

client.login(token);
