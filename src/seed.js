const colors = require('colors');
const redis = require('redis');

const redisClient = redis.createClient();

/*
broadcasters:{showtype} [list]
*/
/*
broadcasters:{showtype}:{slug} [hash]
    isAway: [1,0]
    show: {enum: ['public','private', 'vip'], default: 'public'},
    isOnline: [1,0]
    tags: String,
    topic: String,
    username: String
    images:broadcasterGrid: String
    viewers: Number,
    xp: Number
*/

const newBroadcaster = (showType, suffix) => [
    `broadcasters:${showType}:broadcaster-${suffix}`,
    'gridImage', 'https://slack-redir.net/link?url=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F70390%2Fshow-17.jpg',
    'isAway', 1,
    'topic', 'here is my topic',
    'username', `Broadcaster ${suffix}`,
    'viewers', 0,
    'xp', 2300
]


let remaining = 50
const createBroadcasters = () => {
    const showType = 'public'
    const currentBroadcaster = newBroadcaster(showType, remaining)
    const slug = `broadcaster-${remaining}`

    redisClient.hset(currentBroadcaster, (err, res) => {
        if (err) console.log(err)
        else {
            redisClient.sadd(`broadcasters:${showType}`, slug)
            redisClient.hgetall(currentBroadcaster[0], (err, res) => {
                if (err) console.log(err)
                else {
                    console.log(res)
                    remaining--
                    if (remaining) createBroadcasters()
                }
            })

        }
    })
}

createBroadcasters()

/*
const broadcasterArray = [
    broadcasters:{showtype}:{slug} [hash]
isAway: [1,0]
tags: String,
    topic: String,
    username: String
images:broadcasterGrid: String
viewers: Number,
    xp: Number
];


redisClient.hset(, (err, res) => {
    if (err) reject(new Error(err))
    else {
        resolve({clientID, ...res})
    }
})

*/
/*
broadcasters:{showtype}:{slug}:watchers [list]
    users: {}


broadcasters:{showtype}:{slug}:messages [list]
    message: {}
*/



console.log('Seed running')