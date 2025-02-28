import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Alert from "@mui/joy/Alert";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((userCredential) => {
        setSuccess("Login successful!");
        setError("");
        setTimeout(() => navigate(from, { replace: true }), 1500);
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
      });
  };

  return (
    <CssVarsProvider>
      <main>
        <CssBaseline />
        <Sheet
          sx={{
            width: 350,
            mx: "auto",
            my: 4,
            py: 4,
            px: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "md",
            boxShadow: "lg",
            backgroundColor: "white",
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h3" component="h1" sx={{ textAlign: "center" }}>
              <b>Login</b>
            </Typography>
            <Typography level="body-sm" sx={{ textAlign: "center", color: "gray" }}>
              Sign in to continue.
            </Typography>
          </div>

          {/* Success and Error Alerts */}
          {success && <Alert variant="soft" color="success">{success}</Alert>}
          {error && <Alert variant="soft" color="danger">{error}</Alert>}

          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="johndoe@email.com" required />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" placeholder="Enter password" required />
            </FormControl>
            <Button type="submit" sx={{ mt: 2, backgroundColor: "primary.solidBg" }}>
              Log in
            </Button>
          </form>

          <Typography
            endDecorator={<Link href="/signup">Sign up</Link>}
            sx={{ fontSize: "sm", alignSelf: "center", color: "gray" }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

export default Login;
