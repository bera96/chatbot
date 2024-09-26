import {
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import * as Yup from "yup";
import { SignInContainer } from "../../components/Container";
import { Card } from "../../components/Card";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { authTypes } from "./store/type";
import Spinner from "../../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  console.log(auth, "auth");
  useEffect(() => {
    if (auth && auth.data.user.accessToken) {
      navigate("/");
    }
  }, [auth]);

  const { handleSubmit, handleChange, errors, values } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch({
        type: authTypes.POST_LOGIN,
        payload: values,
      });
    },
  });

  return (
    <>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                value={values.email}
                error={!!errors.email}
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                color={errors.email ? "error" : "primary"}
                style={{ ariaLabel: "email" }}
                handleChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  onClick={() => {}}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <Input
                value={values.password}
                error={!!errors.password}
                name="password"
                placeholder="••••••"
                type="password"
                required
                handleChange={handleChange}
                color={errors.password ? "error" : "primary"}
              />
            </FormControl>
            <Button fullWidth variant="contained" onClick={() => handleSubmit()}>
              Login
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  onClick={() => navigate("/register")}
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
      {auth.loading && <Spinner />}
    </>
  );
};

export default Login;
