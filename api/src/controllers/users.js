const {User} = require("../db")

async function getUsers(request, response){
    try {
        const users = await User.findAll();
        response.json(users)
    }catch (error){
        console.log(error)
    }
}

async function getUser(request, response){
    const { id } = request.param
    try {
        const user = await User.findByPk(id);
        response.json(user)
    }catch (error){
        console.log(error)
    }
}

async function register(request, response){
    const {first_name, last_name, username, email, password} = request.body

    try {
        let newUser = await User.create({
            first_name,
            last_name,
            username,
            email,
            password
        }, {
            fields: ['first_name', 'last_name', 'username', 'email', 'password']
        })

        if(newUser){
            response.json({
                message: 'User successfully created',
                open: true,
                error: false
            })
        }else{
            response.json({
                message: 'Error, user could not be created',
                open: true,
                error: true
            })
        }
    } catch (error){
        response.status(500).json({
            message: `An internal error has occurred ${error.message}`,
            open: true,
            error: true
        })
    }
}

module.exports = {
    getUsers,
    getUser,
    register
}