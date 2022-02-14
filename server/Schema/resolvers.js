// const users = require("../dummyData")

// const resolvers = {
//     Query: {
//         getAllUsers() {
//             return users
//         }
//     },

//     Mutation: {
//         createUser(parent, args) { 
//             const newUser = args
//             users.push(newUser)
//             return newUser;
//         }
//     }
// }

// module.exports = {resolvers}


const userList = require("../dummyData")
const movieData = require("../movieData")
const _ = require("lodash");
const movies = require("../movieData");

const resolvers = {
    Query: {
        // get all users
        users: () => {
            return userList 
        },
        // get single user
        user: (parent, args) => {
            const id = args.id
            const user = _.find(userList, {id: Number(id)})
            return user
        },

        // get all movies
        movies: () => {
            return movieData
        },
        // get single movie \
        movie: (parent, args) => {
            const name = args.name
            const movie = _.find(movieData, {name})
            return movie
        }
    },
    User: { 
        favoriteMovie: () => {
            return _.filter(movieData, (movie) => movie.yearOfPublication >=2000 && movie.yearOfPublication <= 2010)
        }
    },
   Mutation: {
        createUser: (parent, args) => {
            const user = args
            const lastId = userList[userList.length -1].id;
            user.id = lastId + 1
            userList.push(user)
            return user
        },
        updateUserName: (parent, args) => {
            const {id, name} = args.input
            let userUpdated;
            userList.forEach(user => {
                if(user.id === Number(id)) {
                    user.name = name
                    userUpdated = user
                }
            })
            return userUpdated
        },
        deleteUser: (parent, args) => {
            const id = args.id
            _.remove(userList, (user) => user.id === Number(id))
            return null;
        }
   }
}
module.exports = {resolvers}
