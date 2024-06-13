import { useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from './context';

const Auth = ({ capability, children }) => {
  const { loggedIn, user } = useContext(LoginContext);
  const userCapabilities = user ? user.capabilities : [];

  const okToRender = loggedIn && userCapabilities.includes(capability);

  return (
    <When condition={okToRender}>
      {children}
    </When>
  );
};

export default Auth;