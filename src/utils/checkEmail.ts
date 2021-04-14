import User from '../models/User.ts';

async function checkIfEmailExists(email: string) {
  const listOfAccountsWithEmail = await User.where('email', email).all();

  console.log(listOfAccountsWithEmail);

  if (listOfAccountsWithEmail.length == 0) {
    return false;
  }

  return true;
}

export default checkIfEmailExists;
