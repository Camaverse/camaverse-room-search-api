# Camaverse Broadcast Search API

**global:stats**

1. Keeps mostly numerical statistics for the global application
1. Set on system startup

**global:stats:guests**
1. **Type:** Number 
1. **Desc:** total number of guests
1. **Rules:** 
    1. Incremented when a guest connects to the server
    1. Decremented when a guest disconnects from the server
    1. Decremented when a guest logs in 

**global:stats:users**
1. **Type:** Number 
1. **Desc:** total number of loggedin users
1. **Rules:** 
    1. Incremented when a guest logs to the server
    1. Decremented when a user disconnects from the server
    1. Decremented when a user logs off 

**global:stats:broadcasters**
1. **Type:** Number 
1. **Desc:** total number of all broadcasters
1. **Rules:** 
    1. Incremented when a broadcaster starts a show(public, private, group)
    1. Decremented when a broadcaster end a show

**global:stats:broadcasters:{show}**
1. **Type:** Number 
1. **Desc:** total number of broadcasters in {show}
1. **Rules:** 
    1. Incremented when a broadcaster starts {show}
    1. Decremented when a broadcaster end {show}

**global:stats:users:{show}**
1. **Type:** Number 
1. **Desc:** total number of user in {show}
1. **Rules:** 
    1. Incremented when a user enters {show}
    1. Decremented when a user leaves {show}