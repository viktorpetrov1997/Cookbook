function storeUserData(data) 
{
    const id = data._id;
    const accessToken = data.accessToken;
    const email = data.email;

    sessionStorage.setItem("userData", JSON.stringify({ id, accessToken, email }));
}

function getUserData()
{
    return JSON.parse(sessionStorage.getItem("userData"));
}

function getUserId()
{
    return getUserData()?.id;
}

function getAccessToken()
{
    return getUserData()?.accessToken;
}

function getUserEmail() 
{
    return getUserData()?.email;
}

function clearUserData() 
{
    sessionStorage.removeItem("userData");
}

export const userUtils =
{
    storeUserData,
    getUserData,
    getUserId,
    getAccessToken,
    getUserEmail,
    clearUserData
}