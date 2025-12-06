
const processENV = process.env.TEST_ENV
const env = processENV || 'dev'
console.log('Test environment is: ' + env)

const config = {
    apiUrl: 'https://conduit-api.bondaracademy.com/api',
    userEmail: 'templateapiuser@xyz.com',
    userPassword: 'Welcome'
}

if(env === 'qa'){
    config.userEmail = '',
    config.userPassword = ''
}
if(env === 'prod'){
    config.userEmail = '',
    config.userPassword = ''
}

export {config}

















































// // confignvEnvironment.js
// import 'dotenv/config';

// type EnvConfig = {
//   name: string;
//   baseUrl: string;
//   dbServer: string;
//   dbUser: string;
//   dbPassword: string;
// };

// type Environments = {
//   [key: string]: EnvConfig;
// };

// const environments: Environments = {
//   REG: {
//     name: 'REG',
//     baseUrl: 'https://automationexercise.com/',
//     dbServer: 'localhost',
//     dbUser: process.env.DB_USER || '',
//     dbPassword: process.env.DB_PASSWORD || '',
//   },

//   QA: {
//     name: 'QA',
//     baseUrl: 'https://qa.yoursite.com',
//     dbServer: 'qa-db.server.com',
//     dbUser: process.env.DB_USER || '',
//     dbPassword: process.env.DB_PASSWORD || '',
//   },
  
//   STAGE: {
//     name: 'STAGE',
//     baseUrl: 'https://stage.yoursite.com',
//     dbServer: 'stage-db.server.com',
//     dbUser: process.env.DB_USER || '',
//     dbPassword: process.env.DB_PASSWORD || '',
//   },
// };

// const selectedEnv = (process.env.TEST_ENV || 'REG').toUpperCase();
// const currentConfig = environments[selectedEnv];

// export default currentConfig;
