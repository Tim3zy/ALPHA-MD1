const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUxEamxJQ2VjTDFTVGdKZXpKZGhRR1ozeDViczhmZThpdFFXMHd4bS9XYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid25kSE5aSFk5bHhqQXVROUI2Q2p6dWtZWkUzUURYNGlqeEVqWk5CeDVrWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZR3V5ZzZ2eU9NeVFYRTVqbTlYTW5ySHZVQzZwUldWSmFtSkFrWWlnZTN3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDU3BKbWZJNXE2T21WcTNHZElpbGl1anphWm1VNzV4eHNaUGVUN2h2bG1NPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNIMG9xczFrZmhveDZrSFhUcHhLQUd4SmtnU1c5YVJabWVNTENleWo4a0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjUwM0lWLzVoY0t4VXpuaGF1SE03bENqY2xsU1RCb1NEa1NweU1SL2dIbms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUJMazV2bVlIQzd5NFJNelk5ZzZqeXpwc2d2YjQ3ckI0VFRCeDUxckoydz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDFhVGwzbURCY3hWb1NEYndzRE9oZTlBM1pPRGFvTHM5MHlIYi9vbjVnWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNWVmxIaXJiY3hlR2pEUTRKNFI0TGE1dXhWbE90UjU0eWw1ai85OGI0SGdKdUNrbERxVU1yL3c0akY1T0dBUCt4RkFWNk9oMVpKZFVlVlBvam1JWENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMxLCJhZHZTZWNyZXRLZXkiOiJWWnBYTmFBMS9tZWRpaWNDUlE0OVRMVXMxek1VLzhMbUNZY1FLckc5SVFRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJTUFRZNkpCbVNnU0RESlhVVVV4WEN3IiwicGhvbmVJZCI6IjZkM2E5ZDhhLWE5OTEtNDJhOC04ZGY4LWFiNzkwNzkyMGY1ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSbmNUTjVRRHpHaDV0dmRVOG1XZkNVb005dmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRTdWMjVLWnBSTDQraUdsRVJBcGlDRWEzL2NJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1QQ0ZERlZMIiwibWUiOnsiaWQiOiIyMzQ4MTIyNDQ2NDEyOjU5QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQenErYzRERU1hMnJyWUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIrdTBieTNKZmFyc3ZOOVdoclRDUlhMUVZjbi9paHppNy9zU2ZpL3ZjYVVnPSIsImFjY291bnRTaWduYXR1cmUiOiJwRkdvNDlNMndVQ1ZlZ1hBWWtFY1Nob0g3dXJqa3hnWmpKVTB2V2Y0SUxvWmhCR3NGeGE2YllmVkRaM3ZENk9YdFpnODNBTXhHLzJiMFY5WE9CazVBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoic0t5OHlKUzRZNkNQdUpxRWhvV05CSXNXMjFTd1Z0WkxTZnVHZGphbmw4OXUzTmxWMzluczVKRTY1Z3hVak9LZWFSSEpNdnNxelgyVm1nYVl2RDJZQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTIyNDQ2NDEyOjU5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZydEc4dHlYMnE3THpmVm9hMHdrVnkwRlhKLzRvYzR1LzdFbjR2NzNHbEkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ2MTk2MDR9',
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
