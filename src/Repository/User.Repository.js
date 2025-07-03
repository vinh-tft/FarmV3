const users = [];

export const findUserByEmail = (email) => users.find(u => u.email === email);
export const createUser = (user) => users.push(user);
