import React from 'react';
import { connect } from "react-redux";
import { loadUser } from "../actions/authActions";
import gray from './resources/gray.jpg';
import red from './resources/red.jpg'
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: "1%",
    },
  });

class GridImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: [gray, red, gray, red, gray, gray]
        }
    }
    render() {
        const { classes } = this.props;
        return(
            <div className="Gallery">
                <div className={classes.root}>
                    <Grid container spacing={24}>
                    {
                        this.state.imgSrc.map(item => {
                            return  <Grid item xs={12} sm={6}> <img className="img-grid" src={item}></img></Grid>
                        })
                        
                    }
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.error
  });
  
  export default connect(
    mapStateToProps,
  )(withStyles(styles)(GridImages));
  