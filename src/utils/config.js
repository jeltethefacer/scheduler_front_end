export const config = () => {
    if(process.env.NODE_ENV === "development") {
        return {
            url : "http://localhost:3001"
        }
    }
    return {
        url: ""
    }
}
