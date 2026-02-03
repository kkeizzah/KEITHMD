/*I wrote a script to automate my job. Now I just sit back and watch Netflix while it runs.*/
const fs = require('fs-extra');
const path = require('path');

// Load environment variables
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const session = process.env.SESSION || '';
const dev = process.env.OWNER_NUMBER || '254748387615';

// Database defaults with proper naming
const anticallStatus = (process.env.ANTICALL_STATUS || 'false').toLowerCase() === 'true';
const anticallMessage = process.env.ANTICALL_MESSAGE || 'Call me later 🙏';
const anticallAction = process.env.ANTICALL_ACTION || 'reject';

// Database connection
const { Sequelize } = require('sequelize'); 
const DATABASE_URL = process.env.DATABASE_URL || './database.db'; 

const database = DATABASE_URL === './database.db'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
      })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
      });

module.exports = {  
  database,
  dev,
  session,
  anticallStatus,
  anticallMessage,
  anticallAction
};
