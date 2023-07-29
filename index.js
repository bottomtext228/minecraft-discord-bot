import 'dotenv/config';
import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import * as util from 'minecraft-server-util';


const options = {
    sessionID: 228,
    enableSRV: true,
    timeout: 10e3
};

const IP = process.env.MC_IP || '0.0.0.0';
const PORT = parseInt(process.env.MC_PORT) || 255625;


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function setPresence(data) {
    let playersString = '';
    for (const player of data.players.list) {
        playersString += player + ' ';
    }
    const MAX_PRESENCE_NAME_LENGTH = 128;
    const presenceString = `Minecraft (${data.hostIP}:${data.hostPort}). ${data.players.online} players. ${playersString}`.slice(0, MAX_PRESENCE_NAME_LENGTH);
    client.user.setPresence({
        status: 'online',
        activities: [{
            name: presenceString,
            type: ActivityType.Playing
        }],
    });
}

function queryServer() {
    util.queryFull(IP, PORT, options)
        .then(setPresence)
        .catch((error) => {
            if (error.message == 'Server is offline or unreachable') {
                client.user.setPresence({
                    status: 'dnd'
                });
            }  
        });

}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    run().catch(console.log);

});

async function run() {
    queryServer();
    setTimeout(run, 30e3);
}



client.login(process.env.BOT_TOKEN);





