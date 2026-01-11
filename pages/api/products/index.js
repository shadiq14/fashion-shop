import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('fashionshop')

    switch (req.method) {
      case 'GET':
        const products = await db.collection('products').find({}).toArray()
        res.status(200).json({ success: true, data: products })
        break

      case 'POST':
        const product = req.body
        const result = await db.collection('products').insertOne({
          ...product,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        res.status(201).json({ success: true, data: result })
        break

      default:
        res.status(405).json({ success: false, message: 'Method not allowed' })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
