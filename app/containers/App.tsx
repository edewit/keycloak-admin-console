import React, { useCallback, useState } from 'react';

import KeycloakAdminClient from 'keycloak-admin';
import { KeycloakServer } from '../components/KeycloakServer';
import Login from '../components/Login';
import ServerList from '../components/ServerList';
import useStorage from '../components/storage';
import { fetchToken, refreshToken } from '../components/keycloak';

type AppProps = {
  adminClient: KeycloakAdminClient;
  onLogin: () => void;
};

export default function App({ onLogin, adminClient }: AppProps) {
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [servers, setServers] = useStorage<KeycloakServer[]>('servers', []);

  const fetchRefreshToken = useCallback(
    async (host: string) => {
      try {
        const response = await fetchToken(
          host,
          adminClient.accessToken,
          adminClient.refreshToken
        );
        adminClient.setAccessToken(response.accessToken);
        refreshToken(adminClient, response.expiresIn);
        setRefreshFailed(false);
        onLogin();
      } catch (error) {
        setServers(servers.filter((server) => server.host !== host));
        setRefreshFailed(true);
      }
    },
    [adminClient, onLogin, servers, setServers]
  );

  return (
    <>
      {(servers.length === 0 || refreshFailed) && (
        <Login
          onCancel={() => setRefreshFailed(false)}
          onLogin={async (host, username, password) => {
            adminClient.setConfig({
              baseUrl: host,
            });
            await adminClient.auth({
              username,
              password,
              grantType: 'password',
              clientId: 'admin-cli',
              offlineToken: true,
            });

            await fetchRefreshToken(host);
            setServers([...servers, { host, token: adminClient.refreshToken }]);
          }}
        />
      )}
      {servers.length > 0 && !refreshFailed && (
        <ServerList
          servers={servers}
          onSelect={(server) => {
            adminClient.setConfig({
              baseUrl: server.host,
            });
            adminClient.refreshToken = server.token;
            fetchRefreshToken(server.host);
          }}
          onAddServer={() => setRefreshFailed(true)}
        />
      )}
    </>
  );
}
