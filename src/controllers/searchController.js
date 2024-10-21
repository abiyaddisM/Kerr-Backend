const pool = require("../database")

exports.searchUser = async (req, res) => {
    try{
        const {search} = req.query
        const query = "CALL sp_SearchUser(?)"
        const [rows] = await pool.query(query, [search])
        res.status(200).send({data: rows[0]})
    }
    catch (e) {
        res.status(500).send({message: "error"})
    }
}


exports.searchJob = async (req, res) => {
    try{
        const {search} = req.query
        const query = "CALL sp_SearchJob(?)"
        const [rows] = await pool.query(query, [search])
        res.status(200).send({data: rows[0]})
    }
    catch (e) {
        res.status(500).send({message: "error"})
    }
}


exports.searchPost = async (req, res) => {
    try{
        const {search} = req.query
        const query = "CALL sp_SearchPost(?)"
        const [rows] = await pool.query(query, [search])
        res.status(200).send({data: rows[0]})
    }
    catch (e) {
        res.status(500).send({message: "error"})
    }
}