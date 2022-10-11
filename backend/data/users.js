import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@demo.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Mike kelly',
        email: 'mikekelly@demo.com',
        password: bcrypt.hashSync('123456', 10),
    }

];

export default users;