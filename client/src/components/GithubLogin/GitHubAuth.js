import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { CLEAR_OUT, LOGIN_WITH_GOOGLE_APPLE } from '../../RTK/Reducers/Reducers';
import { config } from '../../utils/config';
 
const GitHubAuth = () => {
  const { client_id, redirect_uri, proxy_url } = config;
  const dispatch = useDispatch();

  const HasCodeDealer = async (hasCode) => {
    if (hasCode) {
      try {
        const response = await axios.post(proxy_url, { code: hasCode });
        const user = response.data;
        // console.log('proxy_url', user);
        dispatch(CLEAR_OUT());
        dispatch(LOGIN_WITH_GOOGLE_APPLE({
          _id: user.node_id,
          email: user.login,
          name: user.name,
          avatar: user.avatar_url
        }))
      } catch (error) {
        console.log('proxy_url error', error);
      }
    }
  }

  const handleGitHub = () => {
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const popup = window.open(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=user:email`,
      "githubLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        // Perform any necessary actions after the popup window is closed
        // For example, handle the case when the user closes the popup without providing the code
      } else {
        try {
          const popupUrl = popup.location.href;
          if (popupUrl.includes('?code=')) {
            const [base, code] = popupUrl.split("?code=");
            console.log('Extracted code:', code);
            popup.close();
            clearInterval(checkPopupClosed);
            HasCodeDealer(code);
          }
        } catch (error) {
          // Ignore the cross-origin error when accessing the popup's location
          console.log(error);
        }
      }
    }, 1000);
  };

  return (
    <Button className='ggBtns' startIcon={gitHubIcon} onClick={handleGitHub}>
      Github
    </Button>
  );
};

export default GitHubAuth;
const gitHubIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99916 1.11108C5.09129 1.11108 1.11108 5.09074 1.11108 10.0002C1.11108 13.9275 3.65778 17.2589 7.18998 18.4343C7.63471 18.5162 7.79678 18.2417 7.79678 18.0059C7.79678 17.7948 7.78914 17.236 7.78478 16.4944C5.31229 17.0314 4.79062 15.3026 4.79062 15.3026C4.38627 14.2757 3.80348 14.0023 3.80348 14.0023C2.99642 13.4511 3.8646 13.4621 3.8646 13.4621C4.75679 13.5248 5.22607 14.3783 5.22607 14.3783C6.01895 15.7365 7.30676 15.3441 7.81315 15.1166C7.89391 14.5425 8.12365 14.1507 8.37739 13.9286C6.40366 13.7043 4.32843 12.9415 4.32843 9.53533C4.32843 8.5651 4.67493 7.77113 5.24354 7.15015C5.15186 6.92533 4.84682 6.02113 5.33084 4.79771C5.33084 4.79771 6.07679 4.5587 7.77495 5.709C8.4838 5.51147 9.24448 5.41324 10.0002 5.40942C10.7555 5.41324 11.5156 5.51147 12.2255 5.709C13.9226 4.5587 14.6675 4.79771 14.6675 4.79771C15.1526 6.02113 14.8475 6.92533 14.7564 7.15015C15.3261 7.77113 15.6699 8.5651 15.6699 9.53533C15.6699 12.9502 13.5914 13.7016 11.6116 13.9215C11.9303 14.196 12.2146 14.7384 12.2146 15.5673C12.2146 16.7558 12.2037 17.7146 12.2037 18.0059C12.2037 18.2439 12.3641 18.5205 12.8149 18.4338C16.3443 17.2556 18.8889 13.9264 18.8889 10.0002C18.8889 5.09074 14.9087 1.11108 9.99916 1.11108Z" fill="#182359" />
</svg>

