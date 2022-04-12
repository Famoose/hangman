import {Grid} from "@mui/material";
import {USABLE_KEYS} from "../../lib/game/GameController";
import Button from "@mui/material/Button";
import * as PropTypes from "prop-types";
import React from "react";

const Keys = (props) => {
    return (
        <Grid
            container
            spacing={{xs: 1, md: 1, sm: 1}}
            columns={{xs: 5, sm: 6, md: 13}}
        >
            {USABLE_KEYS.map((key) => (
                <Grid item xs={1} sm={1} md={1} key={key}>
                    <Button
                        variant="text"
                        onClick={() => {
                            props.guessKey(key)
                        }}
                        disabled={props.keysUsed.includes(key)}
                    >
                        {key}
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

Keys.propTypes = {
    keysUsed: PropTypes.array,
    guessKey: PropTypes.func,
}

export default Keys