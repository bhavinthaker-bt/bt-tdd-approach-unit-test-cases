const validateInputs = (userId) =>{
  if (!userId) {
    throw new Error('User ID is required');
  }
}

const getUserProfile = async(userId, userApi)=> {
  validateInputs(userId);
  const user = await userApi.fetchUser(userId);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    isActive: user.active === true
  };
}

export default getUserProfile;