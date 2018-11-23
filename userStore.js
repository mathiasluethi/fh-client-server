class UserStore {
    constructor() {
        this.users = {};
    }

    getOrCreateUser(userId) {
        if (!userId || userId.length === 0) {
            return Promise.reject(new Error('You must specify a user id'));
        }

        const userData = this.retrieve(userId);

        // If there was no user with this id, create one
        if (!userData) {
            console.log('Storing new user with id: ', userId);
            return this
                .setUser(userId, {
                    id: userId,
                    mode: UserStore.MODE_AGENT
                })
                .then((newUser) => {
                    // Attach this temporary flag to indicate that the user is
                    // freshly created.
                    newUser.isNew = true;
                    return newUser;
                });
        }
    }

    setUser(userId, userData) {
        console.log('UserStore.setUser called with ', userData);
        if (!userId || userId.length === 0 || !userData) {
            return Promise.reject(new Error('You must specify a user id and provide data to store'));
        }

        console.log('Updating user with id: ', userId);
        this.store(userId, userData);

        return Promise.resolve(userData);
    }

    // This function could be modified to support persistent database storage
    store(userId, data) {
        // In this case we just simulate serialization to an actual datastore
        this.users[userId] = JSON.stringify(data);
    }

    // This function could be modified to support persistent database storage
    retrieve(userId) {
        // In this case we just simulate deserialization from an actual datastore
        const userData = this.users[userId];
        return userData ? JSON.parse(userData) : null;
    }
}

module.exports = UserStore;
