import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

const Signup = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((userCredential) => {
        Swal.fire({
          title: "Account Created Succesfully!",
          text: "You can now log in.",
          icon: "success",
          confirmButtonText: "Go to Login",
        }).then(() => navigate("/login"));
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
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
          <Typography level="h3" component="h1" sx={{ textAlign: "center" }}>
            <b>Sign Up</b>
          </Typography>
          <Typography level="body-sm" sx={{ textAlign: "center", color: "gray" }}>
            Create an account to continue.
          </Typography>

          <form onSubmit={handleSignup}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" type="text" placeholder="Your Name" required />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="johndoe@email.com" required />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" placeholder="Enter password" required />
            </FormControl>
            <Button type="submit" sx={{ mt: 2, backgroundColor: "primary.solidBg" }}>
              Sign Up
            </Button>
          </form>

          <Typography
            endDecorator={<Link href="/login">Log in</Link>}
            sx={{ fontSize: "sm", alignSelf: "center", color: "gray" }}
          >
            Already have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

export default Signup;
