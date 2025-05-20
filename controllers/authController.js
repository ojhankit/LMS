const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const User = require('../models/User')

const generateToken = (user) => {
    return jwt.sign(
        {   
            id: user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    )
}

const register = async (req,res) => {
    const schema = Joi.object({
        name: Joi.string.required(),
        email: Joi.string.required(),
        phone: Joi.string().required(),
        role: Joi.string().valid('Admin','Librarian','Member').optional()
    })

    const {e} = schema.validate(req.body)
    if (e){
        return res.status(400).json({
            message:e.details[0].message
        })
    }

    const {name,email,phone,role='Member'} = req.body

    try {
        const existingUser = await User.findOne({
            where: {email}
        })
        if (existingUser){
            return res.status(409).json({
                message:'User with this email already exist'
            })
        }

        const base = `${name.slice(0,4)}${email[0]}${phone.slice(-3)}`
        const rawPassword = base + Math.floor(Math.random() * 1000)
        const hashPassword = await bcrypt.hash(rawPassword,10)

        const newUser = await User.create( {
            name,email,phone,password:hashPassword,role,isApproved: role==='Admin'?true:false
        })
        
        // for dev only
        console.log(`password for ${name} is ${rawPassword}`)
        
        res.status(201).json({
            message: `Resgistration Succesfull ${role === 'Admin'?' ':' Waiting For Admin Approval'}`,
            generatedPassword: rawPassword
        })
    }
    
    catch(e) {
        return res.status(500).json({
            message:'Somethig went wrong'
        })
    }
}

const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' });

    if (!user.isApproved)
      return res.status(403).json({ message: 'Admin approval required' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { register, login };