import { LoginOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, CardContent, CardHeader, IconButton, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { baseUrl } from '../../api/config.ts';
import { useEmitter } from '../../store/emitter/emitter.ts';
import { useAppDispatch } from '../../store/index.ts';
import { logInAction } from '../../store/slices/auth.ts';
import { login, logout } from '../../store/slices/loginState.ts';

const Register: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //   const [bio, setbio] = useState('');
  //   const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
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
        console.debug(res);
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
        console.debug(err);
      });
  };

  const registerAccount = () => {
    fetch(`${baseUrl}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
        // bio: bio,
        // email: email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res: { code: number }) => {
        if (res.code === 200) {
          LoginTry();
        } else {
          setLoginFailed(true);
        }
      })
      .catch((err) => {
        console.debug(err);
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

  //   const changeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setbio(e.target.value);
  //   };

  //   const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setEmail(e.target.value);
  //   };

  return (
    <Card sx={{ maxWidth: 600 }} className="flex flex-col items-center justify-center px-2 py-4">
      <CardHeader
        className="w-full uppercase"
        title="光印 Snaptime 用户注册"
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
          onChange={changePassword}
        />
        <TextField error={loginFailed} fullWidth label="个人描述" variant="outlined" type="password" />
        <TextField error={loginFailed} fullWidth label="邮箱" variant="outlined" type="password" />
        <Button
          className="h-[48px]"
          disableElevation
          fullWidth
          variant="contained"
          onClick={registerAccount}
          startIcon={<LoginOutlined></LoginOutlined>}
        >
          注册光印 Snaptime
        </Button>
      </CardContent>
    </Card>
  );
};
export { Register };
