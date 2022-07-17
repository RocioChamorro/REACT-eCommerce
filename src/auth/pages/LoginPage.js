import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AuthLayout } from '../layout/AuthLayout';
import { Google } from '@mui/icons-material';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth/thunks';

export const LoginPage = () => {

  const { status } = useSelector( state => state.auth);

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm({ email: 'rocio@gmail.com', password: '123456' });

  const isAuthenticating = useMemo( () => status === 'checking', [status]);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch( checkingAuthentication() );

  };

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (
    // <ThemeProvider theme={theme}>
      <AuthLayout title="Iniciar sesión">
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value= { email }
              onChange = { onInputChange }
              disabled = {isAuthenticating}
        
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value= { password }
              onChange = { onInputChange }
              disabled = {isAuthenticating}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isAuthenticating}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={ RouterLink } variant="body2" to="/">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={ RouterLink } variant="body2" to="/auth/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} >
                <Button variant="contained" fullWidth onClick={ onGoogleSignIn } disabled={isAuthenticating}>
                  <Google />
                  <Typography >Google</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
       
      </AuthLayout>
    // </ThemeProvider>
  );
}
