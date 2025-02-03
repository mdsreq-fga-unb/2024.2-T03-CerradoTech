import * as dotenv from 'dotenv';

dotenv.config();
const sendGridKey = process.env.SENDGRID_API_KEY;

export const environment = {
    production: false,
    // apiUrl: 'http://localhost:3033',  
    apiUrl: 'http://189.50.84.178:3034', //prod
    SENDGRID_API_KEY: sendGridKey
};