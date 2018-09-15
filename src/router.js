
module.exports = function( app, redisClient ) {

    const resolveDB = (err, ret, resolve, reject) => {
        if (err) reject(new Error(err))
        else if (!ret) reject(new Error('No records found'))
        else if (ret) {
            resolve(ret)
        }
    }

    const getPublicBroadcasterHash = (slug) =>
        new Promise((resolve, reject) => {
            redisClient.hgetall(`broadcasters:public:${slug}`, (err, ret) => resolveDB(err, ret, resolve, reject))
        })

    const getPublicBroadcastersList = () =>
        new Promise((resolve, reject) => {
            redisClient.smembers('broadcasters:public', (err, ret) => resolveDB(err, ret, resolve, reject))
        })

    const listPublicBroadcasters = () =>
        new Promise((resolve, reject) => {
            getPublicBroadcastersList()
                .then((list) => {
                    let broadcasters = {}
                    let promises = []
                    for (let slug of list)
                    promises.push(
                        getPublicBroadcasterHash(slug)
                            .then((broadcaster) => {
                                broadcasters[slug] = broadcaster
                            })
                    )
                    Promise.all(promises)
                        .then(
                            () => {
                                resolve({broadcasters})
                            }
                        )
                        .catch(reject)
                })
                .catch(reject)
            })







    // Index route
    app.get( '/', function( req, res ) {
        listPublicBroadcasters()
            .then((results) => res.status(200).json(results))
            .catch((err) => res.status(401).json(err))
    });

};