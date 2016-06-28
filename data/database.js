import User from './user'

async function getUsers() {
	const users = await User.find({});
	console.log(users);
  return users;
}

function getUser(userName) {
	return User.find({userName: userName});
}

export {getUsers};
