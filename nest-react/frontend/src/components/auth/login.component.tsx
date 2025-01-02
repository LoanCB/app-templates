import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import BackgroundImage from "@src/assets/background.jpg";
import { useLoginUserMutation } from "@src/store/api/auth-api";
import { useAppDispatch } from "@src/store/hooks";
import { openSnackBar } from "@src/store/notification-slice";
import { removeUser, setUser } from "@src/store/user-slice";
import { LoginFormData, LoginSchema } from "@src/utils/auth/login.schema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomFormField from "../common/custom-form-field/custom-form-field.component";
import Notification from "../common/notification.component";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser] = useLoginUserMutation();

  const handleFormSubmit = async (formData: LoginFormData) => {
    const { data, error } = await loginUser(formData);

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
          onSubmit={handleSubmit((data) => handleFormSubmit(data))}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            minWidth: 400,
          }}
        >
          <CustomFormField
            control={control}
            controlName="email"
            type="TEXT_FIELD"
            options={{ label: "Email" }}
          />
          <CustomFormField
            control={control}
            controlName="password"
            type="TEXT_FIELD"
            options={{ label: "Mot de passe" }}
            props={{ type: "password" }}
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
