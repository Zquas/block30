const BASE_URL = "https://strangers-things.herokuapp.com/api/2305-ftb-pt-web-pt";

export async function registerUser(user){
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    console.log(data);
    return data;
}