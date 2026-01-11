import clientPromise from '../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, password, phone, address } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const client = await clientPromise
    const db = client.db('fashionshop')

    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || '',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertedId
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
