import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { AuthLayout } from '../layout/AuthLayout';
import { Google } from '@mui/icons-material';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { Alert } from '@mui/material';

const formData = {
  email: "",
  password: ""
};

const formValidations = {
  email: [ (value) => value.includes("@"), "El correo debe de tener una @" ],
  password: [ (value) => value.length >= 6, "El password debe de tener más de 6 caracteres" ]
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector( state => state.auth);
  const dispatch = useDispatch();

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const { formState, email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(formData, formValidations);

  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    
    if ( !isFormValid ) return;
    if (isAuthenticating) return;

    dispatch( startLoginWithEmailPassword(formState) );
  };

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title="Iniciar sesión">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          id="email"
          label="Correo"
          name="email"
          margin="normal"
          value={email}
          onChange={onInputChange}
          disabled={isAuthenticating}
          error={ !!emailValid && formSubmitted }
          helperText={ formSubmitted ? emailValid : null }
          fullWidth
          autoFocus
        />
        <TextField
          id="password"
          label="Contraseña"
          name="password"
          type="password"
          margin="normal"
          value={password}
          onChange={onInputChange}
          disabled={isAuthenticating}
          error={ !!passwordValid && formSubmitted }
          helperText={ formSubmitted ? passwordValid : null }
          fullWidth
        />
        <Grid item xs={12} display={ !!errorMessage ? '' : 'none'}>
          <Alert severity="error">{ errorMessage }</Alert>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isAuthenticating}
        >
          Iniciar sesión
        </Button>
        <Divider>o</Divider>
        <Grid container>
          <Grid item xs={12}>
            <Button
              sx={{ mt: 3, mb: 2 }}
              variant="contained"
              fullWidth
              onClick={onGoogleSignIn}
              disabled={isAuthenticating}
            >
              <Google />
              <Typography>Google</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          {/* <Grid item xs>
            <Link component={RouterLink} variant="body2" to="/">
              ¿Olvidaste tu contraseña?
            </Link>
          </Grid> */}
          <Grid item xs={12} textAlign="center">
            <Link component={RouterLink} variant="body2" to="/auth/register">
              {"¿No tienes una cuenta? Regístrate"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}
