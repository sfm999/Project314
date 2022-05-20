import * as React from "react";
import { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { deepOrange } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
import { setSession } from '../../utils/jwt'
import axios from '../../utils/axios';
import { useFetch } from '../../hooks/useFetch';
=======
import { setSession } from "../../utils/jwt";
import axios from "../../utils/axios";
>>>>>>> 0860e6f22f9c4d49b999a75b2aa5ef590b8197fa

const TextBox = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "green",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
  },
});

const defaultValues = {
<<<<<<< HEAD
    email: "",
    password:"",
}
const tempValues = {
    email: "",
    password:"",
}

export default function ContractorSignIn() {

    const [url, setUrl] = useState('http://localhost:8000/');
    const { data: client, isPending, error } = useFetch(url, { type: 'GET' });

    const [validated, setValidated] = useState(false);
    
    const [formValues, setFormValues] = useState(defaultValues);
    const navigate = useNavigate();
=======
  email: "",
  password: "",
};

export default function ContractorSignIn() {
  const [formValues, setFormValues] = useState(defaultValues);
  const navigate = useNavigate();
>>>>>>> 0860e6f22f9c4d49b999a75b2aa5ef590b8197fa

  const handleFormChange = (e) => {
    const { name, value } = e.target;

<<<<<<< HEAD
    // const login = async(email, password) => {

    //     await axios.post('', {email, password,})
    //     .then(response => {
    //         console.log(response.data.access)
    //         setSession(response.data.access)
    //         navigate("/ContractorProfile");
    //     })
    //     .catch(error => {console.log(error)})
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const temp_url = `http://localhost:8000/clients?email=${data.get('email')}`
        setUrl(temp_url)
        console.log("New url:", url)
        console.log(client)

    };
=======
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const login = async (email, password) => {
    await axios
      .post("", { email, password })
      .then((response) => {
        setSession(response.data.access);
        navigate("/ContractorProfile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    login(data.get("email"), data.get("password"));
  };
>>>>>>> 0860e6f22f9c4d49b999a75b2aa5ef590b8197fa

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: deepOrange[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Contractor Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextBox
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            id="email"
            variant="outlined"
            autoComplete="email"
            onChange={handleFormChange}
          />
          <TextBox
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            variant="outlined"
            autoComplete="new-password"
            onChange={handleFormChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/ContractorSignUp" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
