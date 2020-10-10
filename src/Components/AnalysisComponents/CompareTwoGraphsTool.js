import React, {useContext} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { AppContext } from "../../Store/AppContextProvider.js";
import {useHistory} from "react-router-dom";
import CompareTwoGraphsVisualisation from "../Main/CompareTwoGraphsVisualisation";
import SubsetVisualisation from "../Main/SubsetVisualisation";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginBottom: 10,
        border: "1px solid red"
    }
}));

function CompareTwoGraphsTool(props){
    const { state, dispatch } = useContext(AppContext);
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return(
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.root}
            spacing={2}
        >
                <Button
                    variant="contained" color="primary" onClick={handleClickOpen}
                    endIcon={<LocationSearchingIcon/>}
                    disabled={state.dataSet === null}
                >
                    Compare Two Graphs
                </Button>
                <Dialog
                    open={open}
                    fullWidth={true}
                    maxWidth="xl"
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Compare two graphs:"}</DialogTitle>
                    <DialogContent>
                            <CompareTwoGraphsVisualisation />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
        </Grid>
    );

}

export default CompareTwoGraphsTool;
