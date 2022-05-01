import { Container, Grid, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper({elevation:0}))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  }));

export default function Plan({plan}){
    return(
        <Grid>
            <Typography variant='h5'gutterBottom component='div'>
                Payment Plan
            </Typography>

           <Item> 
                <h3>
                    {plan.type}
                </h3>                
            </Item>

            <Button variant ='outlined' size="small" >Change Payment Plan</Button>
        </Grid>
    );
}