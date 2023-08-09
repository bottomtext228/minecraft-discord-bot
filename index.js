import 'dotenv/config';
import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import * as util from 'minecraft-server-util';


const minecraftQueryOptions = {
    sessionID: 228,
    enableSRV: true,
    timeout: 10e3
};

const serverIp = process.env.MC_IP || '0.0.0.0';
const serverPort = parseInt(process.env.MC_PORT) || 255625;

// create Discord Client and login
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(process.env.BOT_TOKEN);



// Discord bot is ready to work
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);


    run().catch(console.log); // start quering the server

});

// set bot's activity with minecraft server info
function setPresence(data) {
    const MAX_PRESENCE_NAME_LENGTH = 128;
    const presenceString = `Minecraft (${data.hostIP}:${data.hostPort}). ${data.players.online} players. ${data.players.list.join(' ')}`.slice(0, MAX_PRESENCE_NAME_LENGTH);
    client.user.setPresence({
        status: 'online',
        activities: [{
            name: presenceString,
            type: ActivityType.Playing
        }],
    });
}


function queryServer(ip, port) {
    util.queryFull(ip, port, minecraftQueryOptions)
        .then(setPresence)
        .catch((error) => {
            if (error.message == 'Server is offline or unreachable') {
                client.user.setPresence({
                    status: 'dnd',
                    activities: [{
                        name: '' // remove activity
                    }],
                });
            }  
        });

}

// infinite loop with 30s delay
async function run() {
    queryServer(serverIp, serverPort);
    setTimeout(run, 30e3);
}






