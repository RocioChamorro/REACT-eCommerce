import {useMemo, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startRegisterUserWithEmailPassword } from "../../store/auth/thunks";
import { Alert } from "@mui/material";

const formData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [
    (value) => value.length >= 6,
    "El password debe de tener más de 6 caracteres",
  ],
  firstName: [(value) => value.length >= 1, "Campo obligatorio"],
  lastName: [(value) => value.length >= 1, "Campo obligatorio"],
};

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const { formState, firstName, lastName, email, password, onInputChange, isFormValid, firstNameValid, lastNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    formState.displayName = `${firstName} ${lastName}`
   
    setFormSubmitted(true);
    
    if ( !isFormValid ) return;
    if (isAuthenticating) return;

    dispatch( startRegisterUserWithEmailPassword(formState) );
  };

  return (
    <AuthLayout>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              label="Nombres"
              name="firstName"
              value={firstName}
              onChange={onInputChange}
              disabled={isAuthenticating}
              error={ !!firstNameValid && formSubmitted }
              helperText={ formSubmitted ? firstNameValid : null }
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              label="Apellidos"
              name="lastName"
              value={lastName}
              onChange={onInputChange}
              disabled={isAuthenticating}
              error={ !!lastNameValid && formSubmitted }
              helperText={ formSubmitted ? lastNameValid : null }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Correo"
              name="email"
              value={email}
              onChange={onInputChange}
              disabled={isAuthenticating}
              error={ !!emailValid && formSubmitted }
              helperText={ formSubmitted ? emailValid : null }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Contraseña"
              name="password"
              type="password"
              value={password}
              onChange={onInputChange}
              disabled={isAuthenticating}
              error={ !!passwordValid && formSubmitted }
              helperText={ formSubmitted ? passwordValid : null }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}  disabled={isAuthenticating}
              label="Deseo recibir información, ofertas, recomendaciones y actualizaciones de PinkPig!."
            />
          </Grid>
        </Grid>
        <Grid item xs={12} display={ !!errorMessage ? '' : 'none'}>
          <Alert severity="error">{ errorMessage }</Alert>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={ isAuthenticating }
        >
          Registrarse
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} variant="body2" to="auth/login">
              ¿Ya tienes una cuenta? Iniciar sesión
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};
