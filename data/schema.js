import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
  connectionFromPromisedArray
} from 'graphql-relay';

import {User, getUsers, getUserById, getUserByUsername, getFollowing, getFollowers, createUser} from './user'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
    	case User:
    			return getUserById(id)
    	default:
    		return null;
    }
  },
  (obj) => {
  	switch (obj.constructor) {
  		case User:
  			return userType;
  		default:
  			return null;
  	}
  }
);


const userType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: globalIdField('User'),
		name: { type: GraphQLString },
		username: { type: GraphQLString },
		followerConnection: {
			type: userConnection.connectionType,
			description: 'Users who follow this user',
			args: {
        ...connectionArgs,
        query: { type: GraphQLString }
      },
			resolve: (_, args) => connectionFromArray(getFollowers(), args)
		},
		followingConnection: {
			type: userConnection.connectionType,
			description: 'Users who this user follows',
			args: {
        ...connectionArgs,
        query: { type: GraphQLString }
      },
			resolve: (_, args) => connectionFromArray(getFollowing(), args)
		}
	}),
  interfaces: [nodeInterface]
});


/**
 * Define connection types here
 */
const userConnection= connectionDefinitions({ name: 'User', nodeType: userType });


// Define Queries here
const UserQueries = {
  users: {
    type: new GraphQLList(userType),
    name: 'users',
    description: 'A user list',
    resolve: () => getUsers()
  },
  userId: {
    type: userType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return getUserById(id)
    }
  },
  username: {
  	type: userType,
    args: {
      username: {
      	type: GraphQLString
      }
    },
    resolve: (root, {username}) => {
      return getUserByUsername(username);
    }
  }
};


const UserMutations = {
  createUser: mutationWithClientMutationId({
    name: 'CreateUser',

    inputFields: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) }
    },

    outputFields: {
      userEdge: {
        type: userConnection.edgeType,
        resolve: (obj) => ({ node: obj.ops[0], cursor: obj.insertedId })
      },
      users: {
        type: userType,
        resolve: () => getUsers()
      }
    },
    mutateAndGetPayload: ({name, username}) => createUser(name, username)
  })
}



const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',      //Return this type of object

  fields: () => ({
    userId: UserQueries.userId,
    username: UserQueries.username,
    users: UserQueries.users,
    node: nodeField
  })
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
      createUser: UserMutations.createUser
    })
  })

export default new GraphQLSchema({
	query: RootQuery,
  mutation: RootMutation
});