import { LoginOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { baseUrl } from '../../api/config.ts';
import { useIsMobile } from '../../hooks/useIsMobile.ts';
import { useEmitter } from '../../store/emitter/emitter.ts';
import { useAppDispatch } from '../../store/index.ts';
import { logInAction } from '../../store/slices/auth.ts';
import { login, logout } from '../../store/slices/loginState.ts';
import { Register } from '../Register/Register.tsx';

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const [loginFailed, setLoginFailed] = useState(false);
  const emitter = useEmitter();
  const LoginTry = () => {
    fetch(`${baseUrl}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res: { code: number; result: { token: string } }) => {
        console.log(res);
        if (res.code === 200) {
          dispatch(login());
          setLoginFailed(false);
          dispatch(
            logInAction({
              authKey: res.result.token,
            })
          );
          closeLogin();
          emitter.emit('openSnackbar', {
            message: '登录成功',
            severity: 'success',
          });
        } else {
          setLoginFailed(true);
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

  const [showregister, setShowregister] = useState(false);
  const registerAccount = () => {
    setShowregister(true);
  };

  return isMobile ? (
    <div>mobile</div>
  ) : (
    <div className="fixed top-0 z-[2000] flex h-[100vh] w-[100vw] items-center justify-center bg-black/[.5]">
      {!showregister ? (
        <Card sx={{ maxWidth: 600 }} className="flex flex-col items-center justify-center px-2 py-4">
          <CardHeader
            className="w-full uppercase"
            title="光印 Snaptime 用户登录"
            action={
              <IconButton aria-label="settings" onClick={closeLogin}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className="flex min-w-[500px] flex-col items-center justify-center gap-5">
            <TextField error={loginFailed} fullWidth label="用户名" variant="outlined" onChange={changeUsername} />
            <TextField
              error={loginFailed}
              fullWidth
              label="密码"
              variant="outlined"
              type="password"
              helperText={loginFailed ? '用户名或密码错误' : ' '}
              onChange={changePassword}
            />
            <Button
              className="h-[48px]"
              disableElevation
              fullWidth
              variant="contained"
              onClick={LoginTry}
              startIcon={<LoginOutlined></LoginOutlined>}
            >
              登录光印 Snaptime
            </Button>
          </CardContent>
          <CardActions className="flex w-full justify-end gap-2 !px-[16px]">
            <Button variant="outlined" size="small" onClick={registerAccount}>
              创建用户
            </Button>
            <Button variant="outlined" size="small">
              忘记密码
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Register></Register>
      )}
    </div>
  );
};
export { Login };
