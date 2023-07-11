import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CLEAR_OUT, LOGIN_WITH_GOOGLE_APPLE } from '../../RTK/Reducers/Reducers';
import fireBase from '../../utils/firebase';


const GoogleAuth = () => {
  const dispatch = useDispatch();
  const handleGoogle = async () => {
    const provider = new fireBase.auth.GoogleAuthProvider();
    const res = await fireBase.auth().signInWithPopup(provider);
    if (res.user) {
      const user = res.user;
      dispatch(CLEAR_OUT())
      dispatch(LOGIN_WITH_GOOGLE_APPLE({
        _id: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL
      }))
    }
  };

  return (
    <Button className='ggBtns' startIcon={googleIcon} onClick={handleGoogle}>
      Google
    </Button>
  );
};

export default GoogleAuth;
const googleIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1313 10.3346C19.1313 9.69529 19.0729 9.08003 18.9642 8.48999H10.3051V11.9786H15.2531C15.04 13.106 14.3921 14.061 13.4186 14.7007V16.9634H16.3899C18.1286 15.3931 19.1313 13.0811 19.1313 10.3346Z" fill="#4285F4" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3051 19.1486C12.7875 19.1486 14.8686 18.3411 16.3899 16.9634L13.4186 14.7007C12.5954 15.2418 11.542 15.5617 10.3051 15.5617C7.91033 15.5617 5.88374 13.9754 5.16069 11.8434H2.08887V14.1802C3.6016 17.1277 6.71082 19.1486 10.3051 19.1486Z" fill="#34A853" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.16074 11.8434C4.97686 11.3022 4.87246 10.724 4.87246 10.1298C4.87246 9.53557 4.97686 8.95737 5.16074 8.41625V6.07941H2.08892C1.46638 7.29693 1.11108 8.67458 1.11108 10.1298C1.11108 11.585 1.46638 12.9627 2.08892 14.1802L5.16074 11.8434Z" fill="#FBBC05" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3051 4.69794C11.6549 4.69794 12.8669 5.15308 13.8198 6.04654L16.4569 3.45977C14.8643 2.00493 12.7832 1.11108 10.3051 1.11108C6.71121 1.11108 3.6016 3.13227 2.08887 6.07941L5.16069 8.41625C5.88374 6.28462 7.91072 4.69794 10.3051 4.69794Z" fill="#EA4335" />
</svg>

