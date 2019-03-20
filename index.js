const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL'] });

const COOL_DOWN = 60 * 60 * 1000;
const GCD = new Set();
function getLock(userID) {
  if (GCD.has(userID)) return false;

  GCD.add(userID);
  setTimeout(() => GCD.delete(userID), COOL_DOWN);

  return true;
}

client.on('ready', () => console.info('ready'));

client.on('messageReactionAdd', async (reaction, user) => {
  if (!getLock(user.id)) return;

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
