import React, { useState } from 'react';
import {
  ActionGroup,
  Alert,
  Button,
  Divider,
  Form,
  FormGroup,
  LoginPage,
  TextInput,
} from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

export type ErrorType = {
  message: string;
  severity: 'warning' | 'danger';
};

type Validated = 'success' | 'warning' | 'error' | 'default';
type LoginProps = {
  onLogin: (
    host: string,
    realm: string,
    username: string,
    password: string
  ) => void;
  onCancel: () => void;
  errors: ErrorType[];
};

export default function Login({ onLogin, onCancel, errors }: LoginProps) {
  const [host, setHost] = useState<{
    value: string;
    validated: Validated;
  }>({ value: '', validated: 'default' });
  const [realm, setRealm] = useState('master');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleHostChange = (value: string) => {
    let validated: Validated = 'default';
    if (value !== '') {
      validated = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(value)
        ? 'success'
        : 'error';
    }
    setHost({
      value,
      validated,
    });
  };

  const login = () => onLogin(host.value, realm, username, password);
  return (
    <LoginPage loginTitle="Add keycloak instance">
      <>
        {errors.map((error) => (
          <Alert
            isInline
            key={error.message}
            variant={error.severity}
            title={error.message}
          />
        ))}
        <Form>
          <FormGroup
            label="Host"
            isRequired
            fieldId="host"
            helperText="location of keycloak e.g. http://localhost:8080/auth"
            helperTextInvalid="Please enter a valid keycloak location"
            helperTextInvalidIcon={<ExclamationCircleIcon />}
            validated={host.validated}
          >
            <TextInput
              validated={host.validated}
              isRequired
              type="text"
              id="host"
              name="host"
              value={host.value}
              onChange={handleHostChange}
            />
          </FormGroup>
          <FormGroup label="Realm" isRequired fieldId="realm">
            <TextInput
              isRequired
              type="text"
              id="realm"
              name="realm"
              value={realm}
              onChange={setRealm}
            />
          </FormGroup>
          <FormGroup label="Username" isRequired fieldId="username">
            <TextInput
              isRequired
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={setUsername}
            />
          </FormGroup>
          <FormGroup label="Password" isRequired fieldId="password">
            <TextInput
              isRequired
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={setPassword}
            />
          </FormGroup>
          <ActionGroup>
            <Button isBlock onClick={login}>
              Login
            </Button>
            <Button isBlock onClick={onCancel} variant="plain">
              Cancel
            </Button>
          </ActionGroup>
        </Form>
      </>
    </LoginPage>
  );
}
