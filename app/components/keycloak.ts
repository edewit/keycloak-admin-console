import axios from 'axios';
import KeycloakAdminClient from 'keycloak-admin';
import qs from 'querystringify';

export const fetchToken = async (
  host: string,
  realm: string,
  accessToken: string,
  refreshToken: string
) => {
  const url = `${host}/realms/${realm}/protocol/openid-connect/token`;
  const body = {
    client_id: 'admin-cli',
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };
  const resp = await axios.post(url, qs.stringify(body), {
    headers: {
      Authorization: `bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return {
    accessToken: resp.data.access_token,
    expiresIn: parseInt(resp.data.expires_in, 10),
  };
};

export const refreshToken = (
  adminClient: KeycloakAdminClient,
  interval: number
) => {
  setInterval(async () => {
    const response = await fetchToken(
      adminClient.baseUrl,
      adminClient.realm,
      adminClient.accessToken,
      adminClient.refreshToken
    );
    adminClient.setAccessToken(response.accessToken);
  }, interval * 1000);
};
