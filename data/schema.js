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

import {User, getUsers} from './database'



const userType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		_id: { type: GraphQLString },
		name: { type: GraphQLString },
		username: { type: GraphQLString }
	})
});

const queryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		users: {
			type: new GraphQLList(userType),
			resolve: async () => {
				const users = await getUsers();
				console.log(users);
				return users;
			}
		}
	})
});


export default new GraphQLSchema({
	query: queryType
});