import { atom, AtomEffect, selector } from 'recoil';

export type UserType = {
  // Authority: string;
  accountIdx: number;
  accountsType: number;
  broadcastId: string;
  email: string;
  game: IGameList[];
  idx: number;
  lang: string;
  securityLevel: number;
  token: string;
  uid: string;
  displayName?: string;
};

type UserProfile = {
  broadcaster_type: string;
  created_at: string;
  description: string;
  display_name: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: string;
  view_count: number;
};

export interface IGameList {
  key: string;
}

export type Token = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

const UserSessionEffect =
  (key: string): AtomEffect<UserType | any | undefined> =>
  ({ setSelf, onSet }) => {
    const sessionUser = sessionStorage.getItem(key);
    if (sessionUser && sessionUser !== 'undefined') {
      setSelf(JSON.parse(sessionUser));
    }

    onSet((newValue, oldValue, isReset) => {
      // eslint-disable-next-line no-unused-expressions
      isReset ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const PermissionSessionEffect =
  (key: string): AtomEffect<boolean | any> =>
  ({ setSelf, onSet }) => {
    const sessionUser = sessionStorage.getItem(key);
    if (sessionUser && sessionUser !== 'undefined') {
      setSelf(JSON.parse(sessionUser));
    }

    onSet((newValue, oldValue, isReset) => {
      // eslint-disable-next-line no-unused-expressions
      isReset ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userAtom = atom<UserType | undefined>({
  key: 'user',
  default: undefined,
  effects: [UserSessionEffect('user'), () => {}],
});

export const userProfileAtom = atom<UserProfile | undefined>({
  key: 'userProfile',
  default: undefined,
  effects: [UserSessionEffect('userProfile'), () => {}],
});

export const twitchTokenAtom = atom<Token | undefined>({
  key: 'twitchToken',
  default: undefined,
  effects: [UserSessionEffect('twithToken'), () => {}],
});

export const permissionsAtom = {
  management: atom<boolean>({
    key: 'management',
    default: false,
    effects: [PermissionSessionEffect('management'), () => {}],
  }),
  bank: atom<boolean>({
    key: 'bank',
    default: false,
    effects: [PermissionSessionEffect('bank'), () => {}],
  }),
  bankAdd: atom<boolean>({
    key: 'bankAdd',
    default: false,
    effects: [PermissionSessionEffect('bankAdd'), () => {}],
  }),
  bankEdit: atom<boolean>({
    key: 'bankEdit',
    default: false,
    effects: [PermissionSessionEffect('bankEdit'), () => {}],
  }),
  bankLoad: atom<boolean>({
    key: 'bankLoad',
    default: false,
    effects: [PermissionSessionEffect('bankLoad'), () => {}],
  }),
  bankRollback: atom<boolean>({
    key: 'bankRollback',
    default: false,
    effects: [PermissionSessionEffect('bankRollback'), () => {}],
  }),
  streamer: atom<boolean>({
    key: 'streamer',
    default: false,
    effects: [PermissionSessionEffect('streamer'), () => {}],
  }),
  leagueManager: atom<boolean>({
    key: 'leagueManager',
    default: false,
    effects: [PermissionSessionEffect('leagueManager'), () => {}],
  }),
  codeTraker: atom<boolean>({
    key: 'codeTraker',
    default: false,
    effects: [PermissionSessionEffect('codeTraker'), () => {}],
  }),
  partnership: atom<number>({
    key: 'partnership',
    effects: [PermissionSessionEffect('partnership'), () => {}],
  }),
};

export const userTokenAtom = selector<string | undefined>({
  key: 'userToken',
  get: ({ get }) => {
    const user = get(userAtom);
    return user ? user.token : undefined;
  },
  set: ({ get, set }, newValue) => {
    const user = get(userAtom);
    if (user) {
      set(userAtom, { ...user, token: newValue as string });
    }
  },
});

export const userLanguageAtom = selector<string>({
  key: 'userLanguage',
  get: ({ get }) => {
    const user = get(userAtom);
    return user ? user.lang : 'ko';
  },
  set: ({ get, set }, newValue) => {
    const user = get(userAtom);
    if (user) {
      set(userAtom, { ...user, lang: newValue as string });
    }
  },
});
