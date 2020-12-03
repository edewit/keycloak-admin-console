import React, { Fragment, useState } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './app.global.css';

import KcAdminClient from 'keycloak-admin';
import { KeycloakAdminConsole } from './keycloak/KeycloakAdminConsole';
import App from './containers/App';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const kcAdminClient = new KcAdminClient();

document.addEventListener('DOMContentLoaded', async () => {
  const Console = () => {
    const [login, setLogin] = useState(false);
    return (
      <>
        {!login && (
          <App onLogin={() => setLogin(true)} adminClient={kcAdminClient} />
        )}
        {login && <KeycloakAdminConsole adminClient={kcAdminClient} />}
      </>
    );
  };

  render(
    <AppContainer>
      <Console />
    </AppContainer>,
    document.getElementById('root')
  );
});
