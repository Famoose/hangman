import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import React from "react";

const WordHintDisplayer = (props) => {
    const displayKeyIfGuessed = (key) => {
        return props.keysUsed.includes(key) ? key : '_'
    }

    const getTextSize = (word) => {
        if(word.length < 7){
            return 'h2'
        }
        if(word.length < 13){
            return 'h3'
        }
        if(word.length < 19){
            return 'h4'
        }
        return 'h5'
    }

    return (
        <Box
            mb={5}
            sx={{display: 'flex', justifyContent: 'space-evenly'}}
            fullWidth
        >
            {props.word && props.word.split('').map((key, index) => (
                <Typography component="h1" key={index} variant={getTextSize(props.word)}>
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