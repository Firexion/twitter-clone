import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  name: {
     type: String, required: true, trim: true
  },
  username: {
  	 type: String, required: true, trim: true,  unique : true
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
},
{
  timestamps: true
});

UserSchema.set('toJSON', {getters: true});

const User = mongoose.model('User', UserSchema);

async function getUsers() {
	return await User.find({});
}

async function getUserById(id) {
	return await User.findOne({id: id});
}

async function getUserByUsername(username) {
	return await User.findOne({username: username});
}

function getFollowers(user) {
	return user.followers;
}

function getFollowing(user) {
	return user.following;
}


async function createUser(name, username) {
  return await User.create({name: name, username: username});
}

export {User, getUsers, getUserById, getUserByUsername, getFollowing, getFollowers, createUser}