import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  userName: {
  	type: String
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

UserSchema.set('toJSON', {getters: true});

const User = mongoose.model('User', UserSchema);

async function getUsers() {
	const users = await User.find({});
	console.log(users);
  return users;
}

async function getUserById(id) {
	const user = await User.findOne({id: id});
	return user;
}

async function getUserByUserName(userName) {
	const user = await User.findOne({userName: userName});
	return user;
}

function getFollowers(user) {
	return user.followers;
}

function getFollowing(user) {
	return user.following;
}

export {User, getUsers, getUserById, getUserByUserName, getFollowing, getFollowers}