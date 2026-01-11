import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { id } = req.query

  try {
    const client = await clientPromise
    const db = client.db('fashionshop')

    switch (req.method) {
      case 'GET':
        const product = await db.collection('products').findOne({ _id: new ObjectId(id) })
        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' })
        }
        res.status(200).json({ success: true, data: product })
        break

      case 'PUT':
        const updateData = req.body
        const updateResult = await db.collection('products').updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        )
        res.status(200).json({ success: true, data: updateResult })
        break

      case 'DELETE':
        const deleteResult = await db.collection('products').deleteOne({ _id: new ObjectId(id) })
        res.status(200).json({ success: true, data: deleteResult })
        break

      default:
        res.status(405).json({ success: false, message: 'Method not allowed' })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
