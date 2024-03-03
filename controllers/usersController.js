const User = require('../model/User')

const addUser = async (req, res) => {
  const { rfid, user_id, expired_time } = req.body

  try {
    const newUser = new User({ rfid, user_id, expired_time })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { rfid, user_id, expired_time } = req.body

  try {
    // Find the user by ID and update the fields
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { rfid, user_id, expired_time },
      { new: true } // Returns the updated document
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getUser = async (req, res) => {
  if (!req?.params?.rfid) {
    return res.status(400).json({ message: 'RFID required' })
  }

  const rfid = req.params.rfid

  try {
    const user = await User.findOne({ rfid }).exec()

    if (!user) {
      return res
        .status(204)
        .json({ message: `User with RFID ${rfid} not found` })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getAllUser = async (req, res) => {
  const users = await User.find().lean()

  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }

  res.status(200).json({ data: users })
}

module.exports = { getUser, addUser, getAllUser, updateUser }
