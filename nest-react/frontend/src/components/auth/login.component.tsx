import { Box, Button, TextField, Typography } from "@mui/material";
import BackgroundImage from "@src/assets/background.jpg";
import { useLoginUserMutation } from "@src/store/api/auth-api";
import { useAppDispatch } from "@src/store/hooks";
import { openSnackBar } from "@src/store/notification-slice";
import { removeUser, setUser } from "@src/store/user-slice";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../common/notification.component";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginUser] = useLoginUserMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data, error } = await loginUser({
      email,
      password,
    });

    if (error) {
      dispatch(
        openSnackBar({
          message: "Utilisateur ou mot de passe incorrect",
          severity: "error",
        })
      );
    } else if (data) {
      dispatch(removeUser());
      dispatch(setUser({ accessToken: data.accessToken, ...data.user }));
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Notification />
      <Box
        sx={{
          backgroundColor: "white",
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography align="center" variant="h5" mb={2}>
          Login
        </Typography>
        <form
          onSubmit={(event) => handleSubmit(event)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            minWidth: 400,
          }}
        >
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Mot de passe"
            type="password"
            required
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" variant="contained">
            Se connecter
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
