export  function getLocalUser() {
    const userStr = localStorage.getItem('userLego');
    if (!userStr) return null;
    return JSON.parse(userStr);
}

export default getLocalUser;


