const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");
const bcrypt = require('bcryptjs');
//add admin
const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    try {
        let existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin Already Exists" })
        }
        let admin;

        //hashing
        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        admin = new Admin({ email, password: hashedPassword });
        admin = await admin.save();

        if (!admin) {
            return res.status(400).json({ message: "Unable to create admin" });
        }

        return res.status(201).json({ message: "Admin Created", admin: admin })
    }
    catch (err) {
        return console.log(err);
    }

}


//asdmin login
const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email && email.trim() === "" &&
        !password && password.trim() === "") {
        return res.status(400).json({ message: "Invalid Inputs" })
    }
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email })

        if (!existingAdmin) {
            return res.status(400).json({ message: "Admin not found" })
        }
        const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" })
        }
        const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        return res.status(200).json({ message: "Authentication Successful", token, id: existingAdmin._id });
    }
    catch (err) {
        return console.log(err);
    }
}




//get admin

const getAdmins = async (req, res) => {
    let admins;
    try {
        admins = await Admin.find();
    }
    catch (e) {
        return res.send(e.message);
    }
    if (!admins) {
        return res.status(400).json({ message: "cannot get admin" });
    }
    return res.status(200).json({ admins });
}


//get admin by id

const getAdminByID = async (req, res, next) => {
    const id = req.params.id;
    let admin;
    try {
        admin = await Admin.findById(id)
            .populate("addedMovies");

        if (!admin) {
            return console.log("Cannot find Admin");
        }
        return res.status(200).json({ admin })
    } catch (err) {
        return console.log(err);
    }

};

module.exports = { addAdmin, adminLogin, getAdmins, getAdminByID }


