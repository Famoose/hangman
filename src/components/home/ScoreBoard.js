import React from "react";

import {useEffect} from "react";
import {collection, collectionGroup, limit, orderBy, query} from "firebase/firestore";
import {db} from "../../lib/FirebaseApp";
import {useCollection} from "react-firebase-hooks/firestore";
import PropTypes from "prop-types";
import {Container, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";

function ScoreBoardTable(props) {
    return <TableContainer component="aside">
        <Table aria-label="top ten world wide">
            <TableBody>
                {props.topTenDocs && props.topTenDocs.docs.map((doc, i) => (
                    <TableRow key={doc.id} sx={{'td': {border: 0}}}>
                        <TableCell>
                            {++i}.
                        </TableCell>
                        <TableCell>
                            {doc.data().points}
                        </TableCell>
                        <TableCell>
                            {doc.data().username}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
}

ScoreBoardTable.propTypes = {
    topTenDocs: PropTypes.any
};
const ScoreBoard = (props) => {

    //topTenWorldWide
    const refScoresWorldWide = collectionGroup(db, 'scores')
    const topTenWorldWideQuery = query(refScoresWorldWide, orderBy("points", 'desc'), limit(10));
    const [topTenWorldWide] = useCollection(topTenWorldWideQuery);

    //topTenPersonal
    const refScoresPersonal = collection(db, 'users', props.user.uid, 'scores')
    const topTenPersonalQuery = query(refScoresPersonal, orderBy("points", 'desc'), limit(10))
    const [topTenPersonal] = useCollection(topTenPersonalQuery);

    useEffect(async () => {
        console.log(topTenWorldWide)
    }, [topTenWorldWide])

    useEffect(() => {
        console.log(topTenPersonal)
    }, [topTenPersonal])

    return <Container component='section' maxWidth='lg'>
        <Typography component='h3' variant='h4' sx={{textAlign: 'center'}}>
            Ranking
        </Typography>
        <Stack justifyContent='center' direction={{xs: 'column', md: 'row'}}>
            <Container>
                <Typography component='h3' variant='h6' sx={{textAlign: 'center'}}>
                    World wide
                </Typography>
                <ScoreBoardTable topTenDocs={topTenWorldWide}/>
            </Container>
            <Container>
                <Typography component='h3' variant='h6' sx={{textAlign: 'center'}}>
                    Personal
                </Typography>
                <ScoreBoardTable topTenDocs={topTenPersonal}/>
            </Container>
        </Stack>
    </Container>;
};

ScoreBoard.propTypes = {
    user: PropTypes.any
}

export default ScoreBoard