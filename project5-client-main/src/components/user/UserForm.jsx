import { useEffect, useState } from 'react';
import { register } from '../../services/auth';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function UserForm({ showDialog, setShowDialog }) {
  useEffect(() => {
    if (showDialog) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [showDialog]);

  const [isLogin, setIsLogin] = useState(true);
  const [element, setElement] = useState();

  const registerUser = (user) => {
    return register(user);
  };

  useEffect(() => {
    if (isLogin)
      setElement(
        <SignIn
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          setIsLogin={setIsLogin}
        />
      );
    else
      setElement(
        <SignUp
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          setIsLogin={setIsLogin}
          registerUser={registerUser}
        />
      );
  }, [isLogin, setShowDialog, showDialog]);

  return (
    <>
      {element}
    </>
  );
}
