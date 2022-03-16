import { useAuthState } from 'react-firebase-hooks/auth'
import { renderHook } from '@testing-library/react-hooks'
import { useUserData } from './UserDataState'

jest.mock('react-firebase-hooks/auth')
jest.mock('./FirebaseApp')
jest.mock('firebase/firestore')

test('should fetch and return userdata', () => {
    useAuthState.mockImplementation(() => [{ uid: 'test' }, () => {}])
    const { result } = renderHook(() => useUserData())
    expect(result.current.user).toStrictEqual({ uid: 'test' })
    expect(useAuthState).toHaveBeenCalledTimes(1)
})
