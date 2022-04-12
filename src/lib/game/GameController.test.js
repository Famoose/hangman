import {act, renderHook} from '@testing-library/react-hooks'
import {USABLE_KEYS, useGameController} from './GameController'
import * as randomWords from 'random-words'

jest.mock('random-words')

describe('test Game Controller', () => {
    beforeEach(() => {
        randomWords.default.mockImplementation(() => 'testword')
    })

    test('should init GameController', () => {
        const {result} = renderHook(() => useGameController())
        expect(result.current.word).toBe('testword')
        expect(result.current.round).toBe(0)
        expect(result.current.points).toBe(0)
        expect(result.current.keysUsed).toStrictEqual([])
        expect(result.current.guessKey).toBeDefined()
        expect(result.current.isGameOver).toBeFalsy()
    })

    test('should guessKey wrong key', () => {
        const shootCallback = jest.fn(() => {
        })
        const {result} = renderHook(() => useGameController(shootCallback))
        act(() => {
            result.current.guessKey('a')
        })
        expect(result.current.word).toBe('testword')
        expect(result.current.keysUsed).toContain('a')
        expect(shootCallback).toHaveBeenCalledTimes(1)
    })

    test('should guessKey right key', () => {
        const shootCallback = jest.fn(() => {
        })
        const {result} = renderHook(() => useGameController(shootCallback))
        act(() => {
            result.current.guessKey('t')
        })
        expect(result.current.word).toBe('testword')
        expect(result.current.keysUsed).toContain('t')
        expect(shootCallback).toHaveBeenCalledTimes(0)
        expect(result.current.isGameOver).toBeFalsy()

    })

    test('should guessKey once', () => {
        const shootCallback = jest.fn(() => {
        })
        const {result} = renderHook(() => useGameController(shootCallback))
        act(() => {
            result.current.guessKey('a')
        })
        act(() => {
            result.current.guessKey('a')
        })

        expect(result.current.word).toBe('testword')
        expect(result.current.keysUsed).toContain('a')
        expect(shootCallback).toHaveBeenCalledTimes(1)
    })

    test('should finish one round', () => {
        const shootCallback = jest.fn(() => {
        })
        const {result} = renderHook(() => useGameController(shootCallback))
        let usedKeys = []
        for (
            let i = 0;
            i < USABLE_KEYS.length && !result.current.isGameOver;
            i++
        ) {
            act(() => {
                result.current.guessKey(USABLE_KEYS[i])
            })
            usedKeys.push(USABLE_KEYS[i])
        }
        expect(result.current.keysUsed.length).toBe(26)
        expect(result.current.round).toBe(0)
        const wrongKeysUsed = usedKeys.filter(
            (k) => !'testword'.includes(k)
        ).length
        expect(shootCallback).toHaveBeenCalledTimes(wrongKeysUsed)
        expect(result.current.isGameOver).toBeTruthy()
    })

    test('should guess word', () => {
        const shootCallback = jest.fn(() => {
        })
        const {result} = renderHook(() => useGameController(shootCallback))
        const keysToUse = 'testword'.split('')
        let usedKeys = []
        for (let i = 0; i < keysToUse.length; i++) {
            act(() => {
                result.current.guessKey(keysToUse[i])
            })
            usedKeys.push(keysToUse[i])
        }
        expect(result.current.keysUsed).toStrictEqual([])
        expect(result.current.round).toBe(1)
        expect(result.current.points).toBe(keysToUse.length)
        expect(shootCallback).toHaveBeenCalledTimes(0)
        expect(result.current.isGameOver).toBeFalsy()
    })
})
