import { useForm } from "react-hook-form";
import { TextField, Box, Typography, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { signupAPI } from "../api/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const resp = await signupAPI(data.username, data.email, data.password);
      console.log(resp);
      localStorage.setItem("authToken", resp.data.token);
      dispatch(login(data));
      reset();
      navigate("/dashboard/default");
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={500}
        alignItems="center"
        margin="auto"
        padding={5}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
      >
        <Typography
          gutterBottom
          variant="h2"
          align="center"
          marginBottom={3}
          color="#2da58e"
        >
          Sign up
        </Typography>
        <Typography variant="h4" align="center" marginBottom={3}>
          Enter your credentials to continue
        </Typography>
        <Typography variant="h5" align="center" marginBottom={3}>
          Sign up with Email address
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
            {...register("email")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="username"
            name="username"
            label="Username"
            {...register("username")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            style={{
              backgroundColor: palette.success.main,
              color: palette.success.light,
              marginTop: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            Sign Up
          </Button>
          <Button type="reset" fullWidth>
            Reset
          </Button>
          <Divider />
          <Typography
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop="1rem"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
