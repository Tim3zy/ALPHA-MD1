const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUF1T2hmTGlaU2ZUcXN1Q1E2SUE5Q1AwSnFuU29udmJ5c0lxN2Z6dlhFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVG9XUDRTL2tETXFzNlg1K003ZFBTaTJZTzF3dXp4WCtzYW5VbnZKK1Rtbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnR0ZEQUZWMURpTk10WEpBSGlKSHgxVVZ4cnY5TlJ5NjAzY1Brc0JOYUZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrYmg0L3lsUHF3WkFXcVd3b2JtK1ZtL2d0eWpFVCtYaUlMVFY3QklQNHhRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtKTE4zY1VBamg4Y3BHaWMrRWg1UzdtTXcvaldZaUFETm82R3RjWHZtbWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikp1K1FiaWdNZDcyTnJXVXhLZ1BwUy93Z01FdVhMTXgwKy9kb1F4eXN6eE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0Z0M1YvVTFhMkRIT2oyNmt0SUdIY21HbHdmR3A0KzF5ZzhuMUZETUtsRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0lybW40azkxZG1JUlBGczJUSlZRUWR5RlY5aDVyVkZhODQzWkFsTjNuZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNac3dEdkZMaVFORG5ZT3FYYlVYNGVOeWNnd2NuMk5nM1lZNmhVNHNxUkZNMFBaYm1rL2UyZEhmankyQ2xjYkRDRStJOGJMcjc3ajk2dW1pQUVtS0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAwLCJhZHZTZWNyZXRLZXkiOiJZQkdXVktGNnUvSmdxR0VMclJYRDV5b3pYNGRhS2Q0NE9JYUZuV0didmFNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYQkswcTMtX1JPMmphNUxjaVAyajhBIiwicGhvbmVJZCI6ImFlYTQ4MzM3LTUyNjktNDIzZi1hMWUxLWY4ZGU5M2VhZjNjNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1RjZkWlY4WGJVY1dnWU0vRy8rOXErU3h5TEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmwvT2Z4QmJSbGxRek91eTk1a1ppS0RRRWhRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZLNTZUVE01IiwibWUiOnsiaWQiOiIyMzQ4MTIyNDQ2NDEyOjU4QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQdnErYzRERUtUZnE3WUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIrdTBieTNKZmFyc3ZOOVdoclRDUlhMUVZjbi9paHppNy9zU2ZpL3ZjYVVnPSIsImFjY291bnRTaWduYXR1cmUiOiJOeDg4eDFsbmdUR1l5ZzVKcHJqcU1wN0cwZWErM1haRTNtWVpldU5reEFqWUF6N1dudFE3ZkU2OVgwc1kzemFQank0V1pQQ05idWwxOEN1aWZINmJCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZVNCaFlrRGVGeWlCZXB4WnovR2ptWlo0bXh4SklVZWJGeHVIbUZFNFp1OEdzSlJVRGZkOGNpYjFEK01EdEJ3S3hVMHlPTXdFRU9nK2cvbzZ2Q3hBQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTIyNDQ2NDEyOjU4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZydEc4dHlYMnE3THpmVm9hMHdrVnkwRlhKLzRvYzR1LzdFbjR2NzNHbEkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ1NzU2NjV9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TimmyFk🤧 ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348122446412",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'TIMMMYFK-BOT',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
