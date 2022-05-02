import {useTranslation} from "react-i18next";
import {useLanguageState} from "./UseLanguageState";
import {act, renderHook} from '@testing-library/react-hooks'

jest.mock('react-i18next')

describe('test use language state', () => {
    beforeEach(() => {
        useTranslation.mockImplementation(() => ({
            i18n: {
                changeLanguage: jest.fn(() => Promise.resolve(() => {}))
            }
        }))
    })

    test('should return default language', () => {
        const { result } = renderHook(() => useLanguageState())
        expect(result.current.lang).toStrictEqual('en')
    })

    test('should change language', () => {
        const { result } = renderHook(() => useLanguageState())
        act(() => {
            result.current.changeLanguage('de')
        });
        expect(result.current.lang).toStrictEqual('de')
    })
})
