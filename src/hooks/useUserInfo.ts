import { useSelectAuthState } from '../store/index.ts';

function useUserInfo() {
  const authState = useSelectAuthState();
  const token = authState.authKey;
  if (!token) {
    return null;
  }
  const payload = token.split('.')[1];
  const decoded = atob(payload);
  const userInfo = JSON.parse(decoded) as {
    user_id: string;
    user_name: string;
    iss: string;
    exp: number;
  };
  return userInfo;
}

export { useUserInfo };
