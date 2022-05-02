export const WordService = () => {
    const getWordDicts = (lang) => {
        return fetch(`${process.env.PUBLIC_URL}/wordDicts/${lang}/words.json`)
            .then((r) => r.json())
    }
    return {getWordDicts}
}