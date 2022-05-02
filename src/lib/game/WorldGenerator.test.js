import {renderHook} from "@testing-library/react-hooks";
import {useWordGenerator} from "./WordGenerator";
import { LangContext } from '../LangContext'
import {WordService} from "../integration/WordService";

jest.mock('../integration/WordService')

describe('test word generator', () => {

    beforeEach(() => {
        WordService.mockImplementation(() => ({
            getWordDicts: () => Promise.resolve(['test'])
        }))
    })

    test('should init word generator', async () => {
        const wrapper = ({ children }) => <LangContext.Provider value={{lang:'de', changeLanguage: null}}>{children}</LangContext.Provider>
        const { result, waitFor } = renderHook(() => useWordGenerator(), { wrapper })

        await waitFor(() => expect(result.current.generate()).toBe('test'))
    })
})