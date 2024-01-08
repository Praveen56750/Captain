const privilege = {
    'GET': 'read',
    'POST': 'write',
    'PUT': 'update',
    'PATCH': 'update',
    'DELETE': 'delete'
}

const isAdmin = async (req, res, next) => {
    const { role, privileges } = req.user

    const hasPrivilege = privileges.includes(privilege[req.method])

    if (role === 'admin' && hasPrivilege)
        next();
    else
        return res.status(401).json({ status: "failure", message: "Access denined you didn't have permission to access this end point" })
}

const isUserOrAdmin = async (req, res, next) => {
    const { id, role, privileges } = req.user

    const { id: userId } = req.params

    const hasPrivilege = privileges.includes(privilege[req.method])

    if ((role === 'admin' || role === 'user') && hasPrivilege) {
        if (role === 'user' && id !== userId) {
            return res.status(401).json({ status: "failure", message: "Access denined you didn't have permission to access this end point" })
        }
        next();
    }
    else
        return res.status(401).json({ status: "failure", message: "Access denined you didn't have permission to access this end point" })
}


module.exports = { isAdmin, isUserOrAdmin }