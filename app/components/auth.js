// components/Auth.js
import { SignIn, SignUp, useUser } from '@clerk/nextjs';

const Auth = () => {
  const { isSignedIn, user } = useUser();

  if (isSignedIn) {
    return <div>Welcome, {user.firstName}!</div>;
  }

  return (
    <div>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Auth;
