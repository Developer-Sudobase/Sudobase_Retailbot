import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import data from '../../utilities/data.json';
import { AppContext } from '../../../AppContext';
import DetailView from '../DetailView/DetailView';
import '../DetailView/DetailView.css';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 160,
      margin: 5,
    },
    card: {
        flexWrap: 'nowrap'
    },
    action: {
        justifyContent: 'center',
    },
    button: {
        '&:hover': {
            backgroundColor: 'rgb(255,226,104)',
            color: '#333',
            }
    },
  }));

const ProductsUi = () => {
    const classes = useStyles();

    const { toggleModelState } = useContext(AppContext);   
    
    return (
        <>
        <Grid container item xs={12}>
        { data.Products.map ((product) => {
        return (
        <div className={classes.root} key={product.id}>
            <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={product.Image}
                    title="Contemplative Reptile"
                />
                 <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                        {product.Title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        Price: {product.Price}
                    </Typography>
                </CardContent>
            </CardActionArea>
             <div ><DetailView/></div> 
            <CardActions className={classes.action}>
                <Button size="small" color="primary" variant="contained" className={classes.button} onClick={() => toggleModelState()}>
                    {product.Button}
                </Button>
            </CardActions>
        </Card></div>
       );
        })
    } 
    </Grid>
        </>
    );
}

export default ProductsUi
