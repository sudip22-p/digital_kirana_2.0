const checkToken = (token) => {
    console.log(document.cookie)
    if(token === document.cookie){
        return true;
    }
    return false;
}

export default checkToken;