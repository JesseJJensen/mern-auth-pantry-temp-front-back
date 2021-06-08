require('dotenv').config()

const models = require('./models')

models.Bounty.create({
  name: 'Jesse James Jensen',
  wantedFor: 'Bad Coding',
  client: 'GA',
  reward: 10000,
  ship: 'old logic',
  hunters: [
    {
      name: 'JJ',
      origin: 'Earth',
    },
  ],
  captured: false,
  lastSeen: '2020',
}).then(() => {
  console.log('done')
})

// models.Bounty.deleteMany().then(() => {
//   console.log('done!');
// })
