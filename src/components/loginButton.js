import React, {Fragment} from 'react';
import {useAuth0} from "@auth0/auth0-react";

function LoginButton(props) {
  const {loginWithRedirect} = useAuth0();

  return (
    <Fragment>
      <button onClick={loginWithRedirect}>
        Log In
      </button>
    </Fragment>
  );
}

export default LoginButton;