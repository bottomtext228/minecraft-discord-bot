# minecraft-discord-bot
Show online from the Minecraft server via Discord bot by [querying](https://wiki.vg/Query) the server.

# Usage


**Note:** The targeted server should have `enable-query` setted to `true` in the serfer config (`server.properties`). 
If not, this won't work.

Download the source code:
```console
git clone https://github.com/bottomtext228/minecraft-discord-bot.git
cd minecraft-discord-bot
npm i
```

Place your Discord Bot token and minecraft server ip:port in `.env` file in project directory:
```
BOT_TOKEN=token
MC_IP=0.0.0.0
MC_PORT=1337
```

Run it:
```console
node index.js
```