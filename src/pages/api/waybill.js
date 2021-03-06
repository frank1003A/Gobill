import clientPromise from "../../../lib/mongodb";


export default async function waybill(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("Gobill");
      const waybills = await db.collection("Waybill").find({}).toArray();
      console.log(waybills);
      res.status(200).json(waybills);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      /** */
      const newWaybill = req.body;
      /** */
      const client = await clientPromise;
      /** */
      const db = client.db("Gobill");
      /** */
      let waybills = await db.collection("Waybill");
      /** */
      await waybills.insertOne(newWaybill);
      /** */
      res.status(201).json(newWaybill);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
