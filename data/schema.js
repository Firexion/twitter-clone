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

import * as UserModel from './user'
import {getViewer} from './viewer'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
    	case User:
    			return UserModel.getUserById(id)
      case Viewer:
        return getViewer()
    	default:
    		return null;
    }
  },
  (obj) => {
  	switch (obj.constructor) {
  		case User:
  			return userType;
      case Viewer:
        return viewerType;
  		default:
  			return null;
  	}
  }
);


const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    users: {
      type: userConnection.connectionType,
      description: 'All users',
      args: {
        ...connectionArgs,
        query: { type: GraphQLString }
      },
      resolve: (_, args) => connectionFromPromisedArray(UserModel.getUsers(), args)
    },
    user: {
      type: userType,
      description: 'Single users',
      args: {
        username: {
          type: GraphQLString
        }
      },
      resolve: (_, args) => UserModel.getUserByUsername(args.username)
    }
  }),
  interfaces: [nodeInterface]
});

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
			resolve: (_, args) => connectionFromArray(UserModel.getFollowers(), args)
		},
		followingConnection: {
			type: userConnection.connectionType,
			description: 'Users who this user follows',
			args: {
        ...connectionArgs,
        query: { type: GraphQLString }
      },
			resolve: (_, args) => connectionFromArray(UserModel.getFollowing(), args)
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
    resolve: () => UserModel.getUsers()
  },
  userId: {
    type: userType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return UserModel.getUserById(id)
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
      return UserModel.getUserByUsername(username);
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
        resolve: () => UserModel.getUsers()
      }
    },
    mutateAndGetPayload: ({name, username}) => UserModel.createUser(name, username)
  }),
  deleteUser: mutationWithClientMutationId({
    name: 'DeleteUser',

    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
      deletedUserId: {
        type: GraphQLID,
        resolve: ({id}) => id,
      },
      viewer: {
        type: viewerType,
        resolve: () => getViewer(),
      },
    },
    mutateAndGetPayload: ({id}) => {
      const localUserId = fromGlobalId(id).id;
      UserModel.deleteUser(localUserId);
      return {id};
    }
  })
}


const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
      createUser: UserMutations.createUser,
      deleteUser: UserMutations.deleteUser
    })
  })

export default new GraphQLSchema({
	query: new GraphQLObjectType({
    name: 'Query', 
    fields: () => ({
      viewer: {
        type: viewerType,
        resolve: () => getViewer(),
      },
      node: nodeField
    })
  }),
  mutation: RootMutation
});