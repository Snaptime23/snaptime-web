import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { baseUrl } from '../../api/config.ts';
import { useIsMobile } from '../../hooks/useIsMobile.ts';
import { useAppDispatch } from '../../store/index.ts';
import { login, logout } from '../../store/slices/loginState.ts';

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const [loginFailed, setLoginFailed] = useState(false);
  const LoginTry = () => {
    setLoginFailed(true);
    fetch(`${baseUrl}/api/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        ['user_name']: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(login());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closeLogin = () => {
    dispatch(logout());
  };

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return isMobile ? (
    <div>mobile</div>
  ) : (
    <div className="fixed top-0 z-[2000] flex h-[100vh] w-[100vw] items-center justify-center bg-black/[.5]">
      <Card sx={{ maxWidth: 450 }} className="flex flex-col items-center justify-center">
        <CardHeader
          className="w-full !px-[32px]"
          title="Login panel"
          action={
            <IconButton aria-label="settings" onClick={closeLogin}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent className="mx-4 mb-2 flex flex-col items-center justify-center gap-5">
          <TextField
            error={loginFailed}
            className="w-[300px]"
            id="outlined-basi"
            label="username"
            variant="outlined"
            onChange={changeUsername}
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <TextField
              error={loginFailed}
              className="w-[300px]"
              id="outlined-basici"
              label="password"
              variant="outlined"
              type="password"
              helperText={loginFailed ? 'username or password is incorrect' : ' '}
              onChange={changePassword}
            />
            <Button className="w-[100px]" variant="contained" onClick={LoginTry}>
              Login
            </Button>
          </div>
        </CardContent>
        <CardActions className="flex w-full justify-between">
          <Button size="small">Create Account</Button>
          <Button size="small">Forget Password</Button>
        </CardActions>
      </Card>
    </div>
  );
};
export { Login };
