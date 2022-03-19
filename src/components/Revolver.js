import React, { useEffect } from 'react'
import { Fit, Layout, useRive, useStateMachineInput } from 'rive-react'

const Revolver = ({ shoot }) => {
    const STATE_MACHINE_NAME = 'RevolverCycle'
    const triggerWithout = 'shootWithout'
    const triggerArmed = 'shootArmed'
    const params = {
        src: 'revolver.riv',
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
        shoot.current = (bullet) => {
            if (bullet) {
                shootArmed.fire()
            } else {
                shootWithout.fire()
            }
        }
    }, [shootWithout, shootArmed])

    return <RiveComponent style={{ height: '350px' }} />
}
export default Revolver
