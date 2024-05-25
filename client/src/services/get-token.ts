export default function getToken() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);
  
    if (user && user.accessToken) {
        return user.accessToken;
    } else {
        return null;
    }
}