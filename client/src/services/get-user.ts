export default function getUser() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);
  
    if (user && user.userId) {
        return { 
            userId: user.userId,
            username: user.username,
        };
    } else {
        return null;
    }
}