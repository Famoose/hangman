import React, {useEffect} from 'react'
import {Fit, Layout, useRive, useStateMachineInput} from 'rive-react'
import PropTypes from 'prop-types'

const Revolver = (props) => {
    const STATE_MACHINE_NAME = 'RevolverCycle'
    const triggerWithout = 'shootWithout'
    const triggerArmed = 'shootArmed'
    const params = {
        src: '../revolver.riv',
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true,
        artboard: 'revolver',
        layout: new Layout({fit: Fit.FitHeight}),
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
                shootArmed.fire()
            } else {
                shootWithout.fire()
            }
        }
    }, [shootWithout, shootArmed])

    return <RiveComponent style={{height: '320px'}}/>
}

Revolver.propTypes = {
    shoot: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
}
export default Revolver
