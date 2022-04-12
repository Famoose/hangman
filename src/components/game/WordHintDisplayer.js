import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import React from "react";

const WordHintDisplayer = (props) => {
    const displayKeyIfGuessed = (key) => {
        return props.keysUsed.includes(key) ? key : '_'
    }

    return (
        <Box
            m={5}
            sx={{display: 'flex', justifyContent: 'space-evenly'}}
            fullWidth
        >
            {props.word.split('').map((key, index) => (
                <Typography component="h1" key={index} variant='h3'>
                    {displayKeyIfGuessed(key)}
                </Typography>
            ))}
        </Box>
    )
}
WordHintDisplayer.propTypes = {
    word: PropTypes.string,
    keysUsed: PropTypes.array,
}

export default WordHintDisplayer;