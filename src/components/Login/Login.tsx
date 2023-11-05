import { Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material';
import { FC, useState } from 'react';
const Login: FC = () => {
  const [isMobile] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const LoginTry = () => {
    setLoginFailed(true);
  };

  return isMobile ? (
    <div>mobile</div>
  ) : (
    <div className="fixed z-[100] flex h-[100vh] w-[100vw] items-center justify-center bg-black/[.5]">
      <Card sx={{ maxWidth: 450 }} className="flex flex-col items-center justify-center">
        <CardHeader className="mt-3" title="Login panel" />
        <CardContent className="mx-4 mb-2 flex flex-col items-center justify-center gap-5">
          <TextField
            error={loginFailed}
            className="w-[300px]"
            id="outlined-basic"
            label="username"
            variant="outlined"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <TextField
              error={loginFailed}
              className="w-[300px]"
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              helperText={loginFailed ? 'username or password is incorrect' : ' '}
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
