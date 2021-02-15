import React from 'react';
import {
  Button,
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  LoginPage,
} from '@patternfly/react-core';
import { TimesIcon } from '@patternfly/react-icons';
import { KeycloakServer } from './KeycloakServer';

type ServerListProps = {
  servers: KeycloakServer[];
  onSelect: (server: KeycloakServer) => void;
  onAddServer: () => void;
  removeServer: (index: nubmer) => void;
};

export default function ServerList({
  servers,
  onSelect,
  onAddServer,
  removeServer,
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
            key={server.host}
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
              <DataListAction
                id="delete"
                aria-label="delete server"
                aria-labelledby={`${index}`}
              >
                <Button variant="plain" onClick={() => removeServer(index)}>
                  <TimesIcon />
                </Button>
              </DataListAction>
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
