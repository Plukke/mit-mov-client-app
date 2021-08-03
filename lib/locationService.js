import {
  GetDevicePositionCommand,
  LocationClient
} from '@aws-sdk/client-location';
import { Auth } from 'aws-amplify';

export const initLocationClient = async () => {
  const credentials = await Auth.currentUserCredentials();

  const config = {
    credentials,
    region: 'us-east-1'
  };
  const client = new LocationClient(config);
  return client;
};

export const getDevicePosition = async (client, params) => {
  try {
    const command = new GetDevicePositionCommand(params);
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.log('error tracking', error, error.stack);
  }
};
