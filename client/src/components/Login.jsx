import React from "react";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { TextField, Box, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { loginAPI } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const resp = await loginAPI(data.email, data.password);
      console.log(resp);
      localStorage.setItem("authToken", resp.data.token);
      dispatch(login(data));
      reset();
      navigate("/dashboard/default");
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
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
          marginBottom={4}
          color="#2da58e"
        >
          Hi, Welcome Back!
        </Typography>
        <Typography gutterBottom variant="h4" align="center" marginBottom={3}>
          Enter your credentials to continue
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
            {...register("email")}
            style={{ backgroundColor: "#f8fafc" }}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            {...register("password")}
            style={{ backgroundColor: "#f8fafc" }}
            InputProps={{ sx: { borderRadius: 2 } }}
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
            Sign In
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
            onClick={() => navigate("/register")}
          >
            Don&apos;t have an account?
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
