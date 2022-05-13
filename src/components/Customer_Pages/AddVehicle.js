import { CssBaseline, Grid, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import CustomButton from "../sub-components/CustomButton";
import CustomTextBox from "../sub-components/CustomTextBox";

const AddVehicle = () => {

  let navigate = useNavigate();
  const handleBackClick = () => {
    let path = '/manageVehicles'
    navigate(path)
  }

  return (
    <Box style={{ height: "60vh", width: '90%', margin: "auto", paddingTop: "10px",}}>
    <CssBaseline />
    
      <Typography component="h1" variant="h3">
          Add a new vehicle
      </Typography>
      <Box
        sx={{
            marginTop: "10px",
            display: 'relative',
            flexDirection: 'column',
        }}
      >
      <Box component="form" noValidate>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={10}
          justifyContent="space-evenly"
        >
          {/* Go back button */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <CustomButton text="Go Back" onClick={handleBackClick} size="large"/>
            </Grid>
          </Grid>

          {/* Get vehicle Make  */}
          <Grid item xs={6}>
            <CustomTextBox name="vehicle make" label="Vehicle Make" id="make" />
          </Grid>

          {/* Get vehicle Model  */}
          <Grid item xs={6}>
            <CustomTextBox name="vehicle model" label="Vehicle Model" id="model" />
          </Grid>
          
          {/* Get vehicle registration  */}
          <Grid item xs={6}>
            <CustomTextBox name="vehicle registration" label="Vehicle Registration" id="rego" />
          </Grid>

          {/* Get vehicle colour  */}
          <Grid item xs={6}>
            <CustomTextBox name="vehicle colour" label="Vehicle Colour" id="colour" />
          </Grid>

          {/* Get vehicle Year  */}
          <Grid item xs={6}>
            <CustomTextBox name="vehicle year" label="Vehicle Year" id="year" />
          </Grid>

          {/* Serves to push the year textfield to the left with breakpoint technology */}
          <Grid item xs={6} />

          {/* Add vehicle button/form control submit */}
          <Grid container xs={12} justifyContent="flex-end" spacing={2}>
            <Grid item>
              <CustomButton text="Add Vehicle" onClick={() => handleBackClick()} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Box>
  );
}
 
export default AddVehicle;