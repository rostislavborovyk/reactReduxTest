import React, {Fragment} from 'react';
import {useAuth0} from "@auth0/auth0-react";

function LogoutButton(props) {
  const {logout} = useAuth0();

  return (
    <Fragment>
      <button onClick={logout}>
        Log Out
      </button>
    </Fragment>
  );
}

export default LogoutButton;