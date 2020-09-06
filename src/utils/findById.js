//returns undefined if the element does not exist otherwise returns the element
export const findById = (id, elements) =>{
    id = Number(id)
    if(!elements) {
        return undefined
    }

    const element = elements.find(element => {
        if("id" in element) {
            return element.id === id 
        }
        return false;
    })
    return element
}  