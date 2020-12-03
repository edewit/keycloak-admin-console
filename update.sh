#!/bin/bash

git clone https://github.com/keycloak/keycloak-admin-ui.git /tmp/keycloak-admin-ui/

cp -r /tmp/keycloak-admin-ui/src/* ./app/keycloak/

sed -ri 's/"(.+?svg")/".\/img\1/g' app/keycloak/PageHeader.tsx
