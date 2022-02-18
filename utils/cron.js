const cron = require('node-cron');
const fs = require('fs');
const { everyDayHandler } = require('../api/user/user.service')

// cron.schedule('* * * * * *', function() {
  // console.log('running a task every minute');
  // everyDayHandler()
// });

// const today = new Date()

// everyDayHandler()


  // console.log('today', today, 'day', today.getDate())

// 0 0 0 1-31 * *(cada 24 h)

// cron.schedule('2 0 * * *', function() {
//   console.log('---------------------');
//   console.log('Running Cron Job');
//   fs.unlink('./error.log', err => {
//     if (err) throw err;
//     console.log('Error file successfully deleted');
//   });
// });
