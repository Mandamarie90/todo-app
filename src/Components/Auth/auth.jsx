import { useAuth } from '../../Context/Auth/index';

const Auth = ({ capability, children }) => {
  const auth = useAuth();  // Get the entire context object

  if (!auth || !auth.user) return null; // Check if auth or user is not available

  return auth.hasCapability(capability) ? children : null;
};

export default Auth;
