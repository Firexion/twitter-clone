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

import {User, getUsers, getUserById, getUserByUserName, getFollowing, getFollowers} from './user'

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
		followers: {
			type: userConnection,
			description: 'Users who follow this user',
			args: connectionArgs,
			resolve: (_, args) => connectionFromArray(getFollowers(), args)
		},
		following: {
			type: userConnection,
			description: 'Users who this user follows',
			args: connectionArgs,
			resolve: (_, args) => connectionFromArray(getFollowing(), args)
		}
	}),
  interfaces: [nodeInterface]
});


/**
 * Define connection types here
 */
const { connectionType: userConnection } = connectionDefinitions({ name: 'User', nodeType: userType });


// Define Queries here
const UserQueries = {
  users: {
    type: new GraphQLList(userType),
    name: 'users',
    description: 'A user list',
    resolve: () => {return getUsers()}
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
  userName: {
  	type: userType,
    args: {
      username: {
      	type: GraphQLString
      }
    },
    resolve: (root, {userName}) => {
      return getUserByUserName(userName);
    }
  }
};



const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',      //Return this type of object

  fields: () => ({
    userId: UserQueries.userId,
    userName: UserQueries.userName,
    users: UserQueries.users,
    node: nodeField
  })
});

export default new GraphQLSchema({
	query: RootQuery
});