const User = require("../model/User")

const addUser = async (req, res) => {
  const { rfid, user_id, expired_time } = req.body

  try {
    const newUser = new User({ rfid, user_id, expired_time })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" })
  const user = await User.findOne({ _id: req.params.id }).exec()
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` })
  }
  res.json(user)
}

module.exports = { getUser, addUser }
