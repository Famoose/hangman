import { render } from '@testing-library/react'
import { UserContext } from '../src/lib/UserContext'

export const contextRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
        renderOptions
    )
}
