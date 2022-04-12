import React from "react";

import {useEffect} from "react";
import {collection, collectionGroup, limit, orderBy, query} from "firebase/firestore";
import {db} from "../../lib/FirebaseApp";
import {useCollection} from "react-firebase-hooks/firestore";
import PropTypes from "prop-types";
import {Container, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {Trans} from "react-i18next";

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
    }, [topTenWorldWide])

    useEffect(() => {
    }, [topTenPersonal])

    return <Container component='section' maxWidth='lg'>
        <Typography component='h3' variant='h4' sx={{textAlign: 'center'}}>
            <Trans>home.ranking</Trans>
        </Typography>
        <Stack justifyContent='center' direction={{xs: 'column', md: 'row'}}>
            <Container>
                <Typography component='h3' variant='h6' sx={{textAlign: 'center'}}>
                    <Trans>home.worldWide</Trans>
                </Typography>
                <ScoreBoardTable topTenDocs={topTenWorldWide}/>
            </Container>
            <Container>
                <Typography component='h3' variant='h6' sx={{textAlign: 'center'}}>
                    <Trans>home.personal</Trans>
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