import React from 'react';
import firebase from "../GithubLogin/firebase";
import Welcome from "./welcome";
import GitHubAuth from '../GithubLogin/GitHubAuth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

function Main() {
  const [user, loading, error] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user === null) {
    return <GitHubAuth />;
  }

  return (
    <div>
      <Welcome user={user} signOut={signOut} />
    </div>
  );
}

export default Main;
