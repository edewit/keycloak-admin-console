import React from 'react';
import {
  Button,
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  LoginPage,
} from '@patternfly/react-core';
import { KeycloakServer } from './KeycloakServer';

type ServerListProps = {
  servers: KeycloakServer[];
  onSelect: (server: KeycloakServer) => void;
  onAddServer: () => void;
};

export default function ServerList({
  servers,
  onSelect,
  onAddServer,
}: ServerListProps) {
  return (
    <LoginPage loginTitle="Server list">
      <DataList
        aria-label="Server list"
        onSelectDataListItem={(id) => onSelect(servers[parseInt(id, 10)])}
      >
        {servers.map((server, index) => (
          <DataListItem
            aria-labelledby="Server"
            key={server.token}
            id={`${index}`}
          >
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary content">
                    {server.host}
                  </DataListCell>,
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        ))}
      </DataList>
      <Button isBlock onClick={onAddServer}>
        Add Server
      </Button>
    </LoginPage>
  );
}
