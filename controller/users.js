const connection = require('../config/connection');
function transformData(originalData) {
    return originalData.map(user => ({
        id: user.user_id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: {
            street: user.street,
            suite: user.suite,
            city: user.city,
            zipcode: user.zipcode,
            geo: {
                lat: user.lat,
                lng: user.lng
            }
        },
        phone: user.phone,
        website: user.website,
        company: {
            name: user.company_name,
            catchPhrase: user.catchPhrase,
            bs: user.bs
        }
    }));
}
exports.getUser = async (req, res) => {

    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM users');
        const transformedRows = transformData(rows);
        res.status(200).json({
            message: 'Users  get successfully',
            data: transformedRows,   
             });
    } catch (err) {
        console.error('Error executing MySQL query:', err.message);
        res.status(500).json({
            error: 'Error executing MySQL query',
            message: err.message,
        });
    }
};

exports.addUsers = async (req, res) => {
    try {
        const { name, username, email, phone, website,street,suite,city,zipcode,lat,lng,company_name,catchPhrase,bs } = req.body
        const [result] = await connection.promise().query(
            'INSERT INTO users (name, username,email,phone,website,street,suite,city,zipcode,lat,lng,company_name,catchPhrase,bs) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [name, username, email, phone, website,street,suite,city,zipcode,lat,lng,company_name,catchPhrase,bs]
        );
        res.status(201).json({
            message: 'Post created successfully',

            postId: result.insertId,
        });
    } catch (err) {
        console.error('Error executing MySQL query:', err.message);
        res.status(500).json({
            error: 'Error executing MySQL query',
            message: err.message,
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.body
        const [rows] = await connection.promise().query('SELECT * from users where user_id = ?', [id]);
        const transformedRows = transformData(rows);

        res.status(200).json({
            message: 'Users get successfully',
            data: transformedRows[0],
        })
    } catch (err) {
        console.error('Error executing MySQL query:', err.message);
        res.status(500).json({
            error: 'Error executing MySQL query',
            message: err.message,
        });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const { name, username, email, phone, website,street,suite,city,zipcode,lat,lng,company_name,catchPhrase,bs,user_id } = req.body
        const [result] = await connection.promise().query(
            'UPDATE users SET name = ?, username = ?,email = ?,phone = ?,website = ? WHERE user_id = ?',
            [name, username, email, phone, website,street,suite,city,zipcode,lat,lng,company_name,catchPhrase,bs,user_id]
        );
        if (result.affectedRows > 0) {
            res.status(201).json({
                message: 'Post updated successfully',
            });
        } else {
            res.status(404).json({
                error: 'Post not found',
            });
        }
    } catch (err) {
        console.error('Error executing MySQL query:', err.message);
        res.status(500).json({
            error: 'Error executing MySQL query',
            message: err.message,
        });
    }
};


exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        // Assuming you have a table named 'users' with a column 'user_id'
        const [result] = await connection.promise().query('DELETE FROM users WHERE user_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(201).json({
                message: 'User deleted successfully',
            });
        } else {
            res.status(404).json({
                error: 'User not found',
            });
        }
    } catch (err) {
        console.error('Error executing MySQL query:', err.message);
        res.status(500).json({
            error: 'Error executing MySQL query',
            message: err.message,
        });
    }
};
