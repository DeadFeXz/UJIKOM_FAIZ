import user from "../models/usermodels";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await user.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await user.findByPk(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const admin = await user.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await user.findByPk(req.params.id);
    if (admin) {
      await admin.update(req.body);
      res.json(admin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await user.findByPk(req.params.id);
    if (admin) {
      await admin.destroy();
      res.json({ message: "Admin deleted" });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  
};



// ... existing code ...

export const registerAdmin = async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const admin = await user.create({
        username,
        password: hashedPassword, // Simpan hashed password
        email
      });
  
      res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ message: error.message });
    }
  };
  
  export const loginAdmin = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('Received login data:', { username }); // Don't log passwords
  
      const admin = await user.findOne({ where: { username } });
  
      if (!admin) {
        console.log('Admin not found');
        return res.status(404).json({ message: "Admin not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordValid) {
        console.log('Invalid password');
        return res.status(400).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign({ id: admin.id_admin }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
  
      console.log('Login successful');
      res.json({ token, username: admin.username, email: admin.email });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: error.message });
    }
  };