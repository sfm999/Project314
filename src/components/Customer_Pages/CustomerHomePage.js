import React, { useCallback, useEffect, useState, createRef, forwardRef } from "react"; //Added by Ethan for modal stuff
import { Button, Card, CssBaseline, Grid, Typography, TextField, List, ListItem, ListItemText, } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import "../css/Home.css";
import ServiceRequest from "./Service_Request/ServiceRequest";
import ServiceRequestModal from "./Service_Request/ServiceRequestModal";
import Modal from "@mui/material/Modal"; //Import for MUI modal
import axios from "../../utils/axios"; //Added by Ethan for the Modal stuff
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  PersonIcon,
  ReceiptLongIcon,
  CarCrashIcon,
  LocationSearchingIcon,
  MyLocationIcon,
  DoneIcon,
} from "./Service_Request/imports";

import useAuth from "../../hooks/useAuth";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Item = styled(Card)(({ theme }) => ({
  display: "relative",
  textAlign: "center",
}));

const defaultRequests = [
  {
    vehicle: "Toyota Corolla",
    vehicleRegistration: "RGY672",
    contractorName: "Ludicrous",
    issue: "Car is overheating",
    id: 1,
  },
  {
    vehicle: "Nissan Skyline",
    vehicleRegistration: "DKing",
    contractorName: "Jesse",
    issue: "Car ran out of fuel",
    id: 2,
  },
  {
    vehicle: "Toyota Camry",
    vehicleRegistration: "JSM123",
    contractorName: "Rocco",
    issue: "Car is having trouble steering",
    id: 3,
  },
  {
    vehicle: "Nissan Patrol",
    vehicleRegistration: "DKing",
    contractorName: "Jesse",
    issue: "Car ran out of coolant",
    id: 4,
  },
  {
    vehicle: "Toyota Corolla",
    vehicleRegistration: "ASM123",
    contractorName: "Rocco",
    issue: "Car is having trouble breaking",
    id: 5,
  },
  {
    vehicle: "Nissan GT Danga",
    vehicleRegistration: "Dangaa",
    contractorName: "Dang",
    issue: "Car ran out of God dang fuel or something maybe",
    id: 6,
  },
  {
    vehicle: "Toyota Hilux",
    vehicleRegistration: "Befcke",
    contractorName: "Beefboy",
    issue: "Car is having trouble keeping up with the other beefcakes",
    id: 7,
  },
  {
    vehicle: "Nissan Patrol",
    vehicleRegistration: "patrol",
    contractorName: "Patroller",
    issue: "Car ran out of the stuff that makes it cool",
    id: 8,
  },
  {
    vehicle: "Toyota Corolla",
    vehicleRegistration: "corola",
    contractorName: "Roccorola",
    issue: "Car is having problemsnpm rocking and/or rolling",
    id: 9,
  },
];

const vehicleValues = {
  vehicleRegistration: "JSM123",
  issue: "",
};

const requestValues = {
  name: "",
  registration: "",
  longitude: "",
  latitude: "",
};

const locationValues = {
  longitude: null,
  latitude: null,
}

const CustomerHomePage = () => {
  const [profile, setProfile] = useState();
  const [vehicle, setvehicle] = useState(vehicleValues);
  const [request, setRequest] = useState(requestValues);
  const [clicked, setClicked] = useState(false);
  const [locationDenied, setDenied] = useState();
  const [location, setLocation] = useState(locationValues);

  const { userID } = useAuth();
  const [vehicleList, setVehicleList] = useState([]);

  const [serviceOpen, setServiceOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);

  const handleOpen = () => setServiceOpen(true);
  const handleClose = () => setServiceOpen(false);

  const sendDataToHomePage = (index) => {
    console.log(index);
    setRequest(index);
  };

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        console.log(location.longitude, location.latitude);
        setClicked(!clicked);
        setDenied(false);
      },
      (err) => {
        console.log(err);
        setDenied(true);
      }
    );
  }

  const handleVehicleSelect = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  }
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  

  const fetchVehicles = async () => {
    axios.get(`users/vehicles/?user=${userID}`).then((response) => {
      console.log(response.data);
      setVehicleList(response.data);
    });
  }

  const fetchData = useCallback(async () => {
    const ID = window.localStorage.getItem("userID");
    console.log("Printing from within fetchData:", ID);
    await axios.get(`users/${ID}`).then((response) => {
      setProfile(response.data);
      console.log("The data from the response given by axios:", response.data);
    });
  }, []);

  useEffect(() => {
    fetchData();
    fetchVehicles();
    console.log("vehicle")
  }, [fetchData], [fetchVehicles]);

  const ref = createRef();

  const serviceRequestModal = forwardRef((props, ref) => (
    <ServiceRequestModal
      profile={profile}
      vehicle={vehicle}
      sendDataToHomePage={sendDataToHomePage}
    />
  ));

  return (
    <Box
      sx={{
        mx: "auto",
        width: "90%",
        height: "100%",
      }}
    >
      <CssBaseline />

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="h3" sx={{ marginTop: "10px" }}>
            Home Page
          </Typography>
        </Grid>
      </Grid>

      <Card
        sx={{
          width: "100%",
          display: "relative",
        }}
      >
        <Grid container spacing={1} justifyContent="space-evenly">
          {defaultRequests.map((req) => {
            return (
              <Grid
                item
                xs={4}
                md={3}
                xl={2}
                sx={{
                  margin: "10px",
                  padding: "1px",
                }}
                key={req.id}
              >
                <Item
                  sx={{
                    maxWidth: "320px",
                    minWidth: "210px",
                    maxHeight: "301px",
                  }}
                >
                  <ServiceRequest request={req} />
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Card>

      {/* Request service button  */}
      <Button
        onClick={handleOpen}
        fullWidth
        variant="outlined"
        size="large"
        sx={{
          color: "black",
          border: "1px solid black",
          marginBottom: "10px",
          minHeight: "80px",
          fontSize: "1.8rem",
          top: 0,
          "&:hover": {
            backgroundColor: "black",
            color: "white",
            border: "none",
          },
        }}
      >
        Request Service
      </Button>

      <Dialog open={serviceOpen} onClose={handleClose}>
        
        
        <DialogContent>
          <DialogContentText variant="h5">
            Time to make a request my child
          </DialogContentText>
          <Grid container>
            <Grid item>
              <DialogContentText>
                <Typography>Name: {profile?.first_name}  {profile?.last_name}</Typography>
              </DialogContentText>
              <TextField
                autofocus
                multiline
                maxRows={4}
                margin="dense"
                name="issue"
                id="issue"
                label="Issue Description"
                type="issue"
              />
            </Grid>
            <Grid item>
              <List>
              <ListItem>
                <Typography>
                  get current location: 
                </Typography>
                <Button onClick={getLocation}>
                  {clicked ? <MyLocationIcon /> : <LocationSearchingIcon />}
                </Button>
                <Typography>
                  {locationDenied ? "Allow access to location services" : ""}
                  {clicked && !locationDenied ? <DoneIcon /> : ""}
                </Typography>
              </ListItem>
            </List>
        
            </Grid>
            <Grid item>
              <List>
                <ListItem
                  button
                  id="lock-button"
                  aria-haspopup="listbox"
                  area-controls="lock-menu"
                  area-label="when device is locked"
                  area-expanded={open ? 'true' : undefined}
                  onclick={handleVehicleSelect}
                >
                  <ListItemText
                    primary="Vehicle List"
                    secondary={vehicleList[selectedIndex]}
                    />

                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onclose={handleMenuClose}
                menuListProps={{
                  'area-labelledby': 'lock-button',
                  role: 'listbox'
                }}
                >
                  {vehicleList.map((vehicle, index) => (
                    <MenuItem
                      key={vehicle}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick = {(event) => handleItemClick(event, index)}
                    >
                      {vehicle.registration}
                      </MenuItem>
                  ))}
                </Menu>
            </Grid>
          </Grid>
        </DialogContent>
          
          
          

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          {/*This should also actually submit the request, or send the
             the user to the payment screen :) */}
          <Button onClick={handleClose}>Submit Request</Button>
        </DialogActions>

      </Dialog>
      {/*<Modal
        open={serviceOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <ServiceRequestModal
          profile={profile}
          vehicle={vehicle}
          ref={ref}
          sendDataToHomePage={sendDataToHomePage}
        />
      </Modal>*/}
    </Box>
  );
};

export default CustomerHomePage;
