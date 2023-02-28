import axios from 'axios';
import QueryString from 'qs';
import { axiosGet, axiosPost } from './axios/axios';

interface UserByCode {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: string;
  redirect_uri: string;
}

class TwitchServices {
  //  1. 로그인 버튼 클릭하여 권한 부여된 이후 쿼리스트링 데이터 받아오기
  getTwitchUserByCode = (data: UserByCode) => {
    return new Promise((resolve, reject) => {
      axiosTwitchPost({
        url: 'https://id.twitch.tv/oauth2/token',
        data: QueryString.stringify(data),
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  //  2. 받아온 토큰으로 유저 정보 받아오기
  getTwitchUserByToken = (data: any) => {
    return new Promise((resolve, reject) => {
      const token = data.access_token;
      axiosTwitchGet({
        url: 'https://api.twitch.tv/helix/users',
        headers: {
          'Client-ID': `${process.env.REACT_APP_TWITCH_CLIENT_ID}`,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // 3. 랭킹 페이지에서 id로 각 유저 데이터 가져오기
  getTwitchUserById = (tokenData: any, id: string) => {
    return new Promise((resolve, reject) => {
      const token = tokenData?.access_token;
      axiosTwitchGet({
        url: `https://api.twitch.tv/helix/users?id=${id}`,
        headers: {
          'Client-ID': 'yy1y8gnfg8605oeocof1pm7u74py1c',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}

const axiosTwitchPost = axios.create({
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  timeout: 20000,
});

const axiosTwitchGet = axios.create({
  method: 'GET',
  timeout: 20000,
});

export default new TwitchServices();
