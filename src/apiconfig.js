// let userId = '';
// if(JSON.stringify(localStorage.getItem('isloggedIn'))) {
//   if(JSON.stringify(localStorage.getItem('isloggedIn'))){
//     userId = JSON.stringify(localStorage.getItem('isloggedIn'));
//   }            

// console.log("apiconfig",JSON.stringify(localStorage.getItem('isloggedIn')));
// }
// console.log(userId)

const exportValue = {
  // host: 'https://gigglynode.bbcloudhub.com',
  //  host: 'http://gigglynode.bbcloudhub.com/v-1.0.5/giggly_admin/'
   host: 'https://gigglynode.fniix.com',
 //host : 'http://localhost:5051',
  version: 'v-1.0.5',
  api:'giggly_admin',
  headers: {
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
    key: 'E09F1280ghjghjg606C3BF43D882F479032F03B2C4172B795F997E03FA356604CA06A2C7090DBD6380454C39FD57BFCC6A24C712795021FB9501DBA54719285AFBC5AE2',
      AUTHORIZATIONKEYFORTOKEN:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcktleSI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1OTQxODY5NzB9.Ni80IfthuIhrp1EbfAhfzJCHSkL5J9mP3wXN7pMR6Ks',
      LOGINSTATUS:0,
      DEVICEID:1234567890,
      VERSION:2.5,
      DEVICETYPE:1,
      //device_name:encoded      
  },
 
};

export default exportValue;
