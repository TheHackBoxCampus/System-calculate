export default {
    setItemLocalStorageForElement(name, contentLocalStorageString) {
        localStorage.setItem(name, JSON.stringify(contentLocalStorageString))
    } 
}