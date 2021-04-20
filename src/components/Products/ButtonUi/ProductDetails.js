import { Button, Card, CardActions, CardContent, CardMedia, Divider, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import data from '../../utilities/data.json';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      margin: 5,
      display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
      },
      content: {
        // flex: '1 0 auto',
      },
      cover: {
        width: '50%',
        flexDirection:'flex-end'
      },
      action: {
        justifyContent: 'center',
    },
    button: {
        '&:hover': {
            backgroundColor: 'rgb(255,226,104)',
            color: '#333',
            }
    }
  }));

const ProductDetails = () => {
    const classes = useStyles()
    return (
        <>
        { data.Products.map ((product) => {
        return (<Card className={classes.root} key={product.id}>
            <div className={classes.details}>
               <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                        {product.Title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        Price: {product.Price}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        Price: {product.Price}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        Price: {product.Price}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        Price: {product.Price}
                    </Typography>
                </CardContent>
              <div>
              <Divider/>
                <CardActions className={classes.action}>
                <Button size="small" color="primary" variant="contained" className={classes.button}>
                    {product.Button1}
                </Button>
                 </CardActions>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image={product.Image}
              title="Live from space album cover"
            />
          </Card>
       );
        })
    }  
        </>
    );
}

export default ProductDetails
