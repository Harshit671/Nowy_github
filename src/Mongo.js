import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REACT_APP_MNDB_MAIN });

export const addDocument = async (userName, repoName) => {
    const User = localStorage.getItem("userName")
    // console.log("yoooooo", userName.Name);
    // get user settings - accounts
    const credentials = Realm.Credentials.anonymous();
    //console.log(credentials);
    const user = await app.logIn(credentials);
    console.log(userName);
    // const result = await app.currentUser.functions.getAllUsers(userName);
    // console.log(result);
    // return (result);
    const date = new Date();
    const dateFinal = date.toDateString();
    const time = date.getHours() + ":" + date.getMinutes();
    const finalTime = dateFinal + " " + time;
    const info = {
        User: User,
        time: finalTime,
        fileName: userName.filename,
        status: userName.status,
        repo: repoName,
        patch: userName.patch.split("\n")
    }
    const mongodb = app.currentUser.mongoClient("mongodb-atlas")
    const dbcc = mongodb.db("harshit").collection("git");
    const data = await dbcc.insertOne(info)
        .then(result => {
            console.log(`Successsssss: ${result.name}`)
        }).catch(err => console.error(`Failed to insert item: ${err}`))


}

export const showDocument = async (repoName) => {
    const userName = localStorage.getItem("userName");
    // get user settings - accounts
    const credentials = Realm.Credentials.anonymous();
    // console.log(credentials);
    const user = await app.logIn(credentials);
    // console.log(user);
    // const result = await app.currentUser.functions.getAllUsers(userName);
    // console.log(result);
    // return (result);
    const mongodb = app.currentUser.mongoClient("mongodb-atlas")
    const dbcc = mongodb.db("harshit").collection("git");

    const query = { "repo": repoName }

    try {
        const showData = await dbcc.find(query);
        console.log(showData)
        return showData;
    } catch (error) {
        console.error(`Failed to insert item: ${error}`)
    }
    return [];
}

export const addUser = async (userName) => {
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    console.log(userName);
    const mongodb = app.currentUser.mongoClient("mongodb-atlas")
    const dbcc = mongodb.db("harshit").collection("Users");
    const info = { user: userName }
    const data = await dbcc.insertOne(info)
        .then(result => {
            console.log(`Successsssss: ${result.name}`)
        }).catch(err => console.error(`Failed to insert item: ${err}`))
}

export const getUser = async () => {
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    const mongodb = app.currentUser.mongoClient("mongodb-atlas")
    const dbcc = mongodb.db("harshit").collection("Users");

    const data = await dbcc.find()
        .then(result => {
            return result
        }).catch(err => console.error(`Failed to insert item: ${err}`))
    return data;
}