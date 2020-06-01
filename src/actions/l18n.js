export const changeLanguage = (language) => {
    return {
        type: "CHANGE_LANGUAGE",
        data: {
            language:language
        }
    }
}