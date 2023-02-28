import { Client, messageCallbackType, StompHeaders } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { isLive, LiveWS, TestWS } from '../../Pages/config';

const serverURL = isLive ? LiveWS : TestWS;
// const serverURL = 'http://decakill.work:44444/ws'

// const sock = new SockJS(serverURL)
// export const client = Stomp.over(sock);

let myToken: string;

const getToken = () => {
  const user = sessionStorage.getItem('user') ?? '';
  console.log(user);
  if (user) {
    const { token } = JSON.parse(user);
    myToken = token;
    console.log(myToken);
  }
  return myToken;
};
export const client = new Client({
  brokerURL: serverURL,
  connectHeaders: {},
  webSocketFactory() {
    return new SockJS(serverURL);
  },
  debug(str) {
    // debug (str) {
    // console.log(str);
  },

  reconnectDelay: 5000, // 자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

export const stompPublish = (url: string, data: object) => {
  getToken();
  console.log('stompPublish-url', url);
  client.publish({
    destination: url,
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${myToken}` },
    skipContentLengthHeader: false,
  });
};

export const stompPublishNoToken = (url: string, data: object) => {
  client.publish({
    destination: url,
    body: JSON.stringify(data),
    headers: {},
    skipContentLengthHeader: false,
  });
};

export const stompSubscribe = (
  destination: string,
  callback: messageCallbackType,
  headers?: StompHeaders,
) => {
  return client.subscribe(destination, callback, headers);
};

export const stompIsConnected = () => {
  return client.connected;
};

export const stompUnSubscribe = (id: string, headers?: StompHeaders) => {
  client.unsubscribe(id, headers);
};

export default Client;
