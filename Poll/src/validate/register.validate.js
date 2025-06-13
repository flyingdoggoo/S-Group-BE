function isValidRegister(username, password)
{
    username = username.trim().toString()
    password = password.trim().toString()
    if(username.includes(" ") || password.includes(" "))
    {
        return 0
    }
    return 1
}

export default isValidRegister

