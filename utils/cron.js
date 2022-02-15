const cron = require('node-cron');
const fs = require('fs');

// cron.schedule('* * * * *', function() {
//   console.log('running a task every minute');
// });

var today  = new Date();

console.log(today.toLocaleDateString("en-US"));
console.log('day', today.getDay())
// 0 0 0 1-31 * *(cada 24 h)

// cron.schedule('2 0 * * *', function() {
//   console.log('---------------------');
//   console.log('Running Cron Job');
//   fs.unlink('./error.log', err => {
//     if (err) throw err;
//     console.log('Error file successfully deleted');
//   });
// });
