import React, {Fragment} from 'react';
import {useAuth0} from "@auth0/auth0-react";

function AuthData(props) {
  const {user, isLoading} = useAuth0();

  return (
    <Fragment>
      {
        isLoading
          ?
          <h1>Loading...</h1>
          :
          <div>
            <h1>{user.name}</h1>
            <img src={user.picture}  alt=""/>
          </div>

      }

    </Fragment>
  );
}

export default AuthData;