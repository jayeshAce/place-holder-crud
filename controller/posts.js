const connection = require('../config/connection');

exports.getPost = async (req, res) => {

    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM posts');
        res.status(200).json({
            message: 'Post  get successfully',
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

exports.addPosts = async (req, res) => {
    try {
        const {user_id,title,body} = req.body
        const [result] = await connection.promise().query(
            'INSERT INTO posts (user_id,title,body) VALUES (?,?,?)',
            [user_id,title,body]
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

exports.getPostbyid = async (req, res) => {
    try {
        const { id } = req.body
        const [rows] = await connection.promise().query('SELECT * from posts where post_id = ?', [id]);

        res.status(200).json({
            message: 'Post get successfully',
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

exports.updatePostById = async (req, res) => {
    try {
        const {title,body,id} = req.body
        const [result] = await connection.promise().query(
            'UPDATE posts SET title = ?, body = ? WHERE post_id = ?',
            [title,body,id]
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


exports.deletePost = async (req, res) => {
    const { id } = req.body;
    try {
        // Assuming you have a table named 'users' with a column 'user_id'
        const [result] = await connection.promise().query('DELETE FROM posts WHERE post_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(201).json({
                message: 'Post deleted successfully',
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
