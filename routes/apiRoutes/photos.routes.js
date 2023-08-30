import express from 'express';
const router = express.Router();
router.get('/photos/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    // Connect to MongoDB Atlas
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection('images');

    // Find the image document by ID
    const imageDocument = await collection.findOne({ _id: ObjectId(imageId) });

    if (!imageDocument) {
      res.status(404).send('Image not found');
      return;
    }

    // Set appropriate headers for the image response
    res.setHeader('Content-Type', imageDocument.contentType);
    res.send(imageDocument.data);

    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
export default router;