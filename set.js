const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUd1NW1pY2VtMzBZUDlEYS9nVmtMSGJrYU1lWVhhYmxZQlVHUG1lZE5VMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmIzUXNMZ3VSV0xqc0hsQjcyZDNUUHBvS25JUTB6eVNFYnJ3b3pPZ1pXND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTGRTQThWdDgwbThLZHhxUnRzWFhBcU4vTEw0czJQZzVGRlI4ZEpuQ0V3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiRVFMNFZjRXJvYWwzMXd6TTlURVIxdjdhMnpneUJUNDI2UnVNOHVXV1RVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdJeS9MNnd0TWdENStGT1h6aVFTZmhuN2NVNzIvTUJVMnhyRGZVa1dpRjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IncxNGUrMzQ4bkhMYkxDWTdlZ0JHa1NLdjhRNkJUMmpNdU1OYTg3VnNKSFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk5ZamovMmlrOGFLTU1pTlFpQkhncWc2WXh1ajQvVjJGRnVMa3N0aklXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlE4blFUbFJQYzNRVE94S1FDSVZvWFh0bVlwZW81d0c5NFZDZkhkalZHUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVrNHlSMGh6ZGJlRkh1alQ4TnZvUUNrdkNEUHZnTmhuTEdvc0x3Zkx2K2cwejVpRVMvZFBiWmJMcHZFM1lwUE1FcFhRR0JWUm4vcmtETnFZS2hmdUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjgsImFkdlNlY3JldEtleSI6ImhRaExteUZ2V0Q5YkhoZThPUngxdXZnc2pkemlFL3VhMzJ3NGtmdktxZzQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA3ODExMjg5MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTlBMkVFOTk4RDQ0MjIyMDQ2NiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5NDMxNjMxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MDc4MTEyODkxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBQTFCRkJGRDBFNTk2Q0JBNTM5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTk0MzE2MzN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InoybHl3Ry01VGhxaEhUYlZiRVNmNEEiLCJwaG9uZUlkIjoiZjc3NzQ4YzctYmE3MS00ZTMxLWI3YzItZGUwYTc5MzM4ZDUzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inh5cVNQc1lJSXYwOWVJMVJsanpaTmRzOURUbz0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkd0d1J4OC9uTk1WUjlWbTNsTUcrNmlYZmdzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSjNqLzk0SkVNemo4Yk1HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibUx4azI4aWRYdXJMSzVlQmdFNDZJL09lcVNSN2Y5V1FnWGcyNG50YTBEUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiLzIxeExGaVU3MXR4VFNDZytwWktMWm51QWFwc0Rxanc2dU5VeG8vc1pYUzBsZk5JV1puSW0yQlhXQ3N0RDVuUk1idmluN21zSWNPZDUyelFEK0FEQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IjVMaWpXKzkrbURoN3YrN2hWMkJCeGIvTk4vRmFzUm51MmZEZjhhWVZ4ajJudXowcFFEYWdFUTJwMmMrVDJRQkVPcnNnQ3NtMHNSVkxXL1JJMHphN0J3PT0ifSwibWUiOnsiaWQiOiIyMzQ4MDc4MTEyODkxOjM2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNhZXNhciJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDc4MTEyODkxOjM2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlppOFpOdkluVjdxeXl1WGdZQk9PaVB6bnFra2UzL1ZrSUY0TnVKN1d0QTAifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTk0MzE2MzAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT080In0=',
    PREFIXE: process.env.PREFIX || "?",
    OWNER_NAME: process.env.OWNER_NAME || "Caesar",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348078112891", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'C̶a̶e̶s̶a̶r̶-̶M̶d̶',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || 'sk-proj-e20aljveXK3imt9IgaQhT3BlbkFJMphyLKWOubU5rhmKUlKx',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/6756c02480e4ea955e6ec.mp4',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});




