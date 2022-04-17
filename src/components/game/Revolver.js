import React, { useEffect } from 'react'
import { Fit, Layout, useRive, useStateMachineInput } from 'rive-react'
import PropTypes from 'prop-types'
import { Container } from '@mui/material'

const Revolver = (props) => {
    const STATE_MACHINE_NAME = 'RevolverCycle'
    const triggerWithout = 'shootWithout'
    const triggerArmed = 'shootArmed'
    const params = {
        src: process.env.PUBLIC_URL + '/revolver.riv',
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true,
        artboard: 'revolver',
        layout: new Layout({ fit: Fit.FitHeight }),
    }
    const { RiveComponent, rive } = useRive(params)
    const shootWithout = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        triggerWithout
    )
    const shootArmed = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        triggerArmed
    )

    useEffect(() => {
        props.shoot.current = (bullet) => {
            if (bullet) {
                if (shootArmed) {
                    shootArmed.fire()
                }
            } else {
                if (shootWithout) {
                    shootWithout.fire()
                }
            }
        }
    }, [shootWithout, shootArmed])

    return (
        <Container
            sx={{
                mt: { xs: -5, md: 0 },
                height: { xs: '200px', sm: '250px', md: '300px', lg: '350px' },
            }}
        >
            <RiveComponent />
        </Container>
    )
}

Revolver.propTypes = {
    shoot: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }),
    ]),
}
export default Revolver
