import { Button, Typography, Box, FormControl, FormLabel, Link } from "@mui/material";
import * as Yup from "yup";
import { SignInContainer } from "../../components/Container";
import { Card } from "../../components/Card";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { authTypes } from "./store/type";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
  });
  console.log(auth, "auth");
  useEffect(() => {
    if (auth && auth.data.user.accessToken) {
      console.log(auth, "authhhh");
      navigate("/");
    }
  }, [auth]);

  const initialValues = {
    email: "",
    name: "",
    password: "",
  };

  const { handleSubmit, handleChange, errors, values } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch({
        type: authTypes.POST_REGISTER,
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
            Sign Up
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
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                value={values.name}
                error={!!errors.name}
                type="name"
                name="name"
                placeholder="Your name"
                required
                color={errors.name ? "error" : "primary"}
                handleChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
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
              Sign up
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span>
                <Link
                  onClick={() => navigate("/login")}
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Login
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

export default Register;
