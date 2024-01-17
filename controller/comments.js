const connection = require('../config/connection');

exports.getComments = async (req, res) => {

    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM comments');
        res.status(200).json({
            message: 'Comments  get successfully',
            data: rows,   
             });
    } catch (err) {
        console.error('Error executing MySQL query:', err.message);
        res.status(500).json({
            error: 'Error executing MySQL query',
            message: err.message,
        });
    }
};

exports.addComments = async (req, res) => {
    try {
        const {post_id,name,email,body} = req.body
        const [result] = await connection.promise().query(
            'INSERT INTO comments (post_id,name,email,body) VALUES (?,?,?,?)',
            [post_id,name,email,body]
        );
        res.status(201).json({
            message: 'Comments created successfully',
        });
    } catch (err) {
        console.error('Error executing MySQL query:', err.message);
        res.status(500).json({
            error: 'Error executing MySQL query',
            message: err.message,
        });
    }
};

exports.getCommentbyid = async (req, res) => {
    try {
        const { id } = req.body
        const [rows] = await connection.promise().query('SELECT * from comments where id = ?', [id]);

        res.status(200).json({
            message: 'Comments get successfully',
            data: rows[0],
        })
    } catch (err) {
        console.error('Error executing MySQL query:', err.message);
        res.status(500).json({
            error: 'Error executing MySQL query',
            message: err.message,
        });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const {id,name,email,body} = req.body
        const [result] = await connection.promise().query(
            'UPDATE comments SET name = ?,email=?, body = ? WHERE id = ?',
            [name,email,body,id]
        );
        if (result.affectedRows > 0) {
            res.status(201).json({
                message: 'Comments updated successfully',
            });
        } else {
            res.status(404).json({
                error: 'Comments not found',
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


exports.deleteComment = async (req, res) => {
    const { id } = req.body;
    try {
        // Assuming you have a table named 'users' with a column 'user_id'
        const [result] = await connection.promise().query('DELETE FROM comments WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(201).json({
                message: 'Comments deleted successfully',
            });
        } else {
            res.status(404).json({
                error: 'Comments not found',
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
