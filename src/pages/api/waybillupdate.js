import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function updateWaybillById(req,res) {
  if (req.method === "PATCH") {
    try {
      const query = req.query;
      console.log(query);
      const body = req.body;
      console.log(body)
      const client = await clientPromise;
      const db = client.db("Gobill");
      let updatedWaybill = await db.collection("Waybill").updateOne({_id : new  ObjectId(query.waybill_id)}, {$set: body})
      console.log(updatedWaybill);
      res.status(200).json(updatedWaybill);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log(err)
    }
  }

  if (req.method === "DELETE") {
    try {
      const query = req.query;
      console.log(query);
      const client = await clientPromise;
      const db = client.db("Gobill");
      let deletedWaybill = await db.collection("Waybill").deleteOne({_id : new  ObjectId(query.waybill_id)})
      console.log(deletedWaybill);
      res.status(200).json(deletedWaybill);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log(err)
    }
  }
}

/*
const id = { _id: req.query};
    const body = req.body
    try {
        const client = await clientPromise;
        const db = client.db("Gobill");
        let waybill = await db.collection("Waybill")
        const updatedWaybill = await waybill.updateOne(id, {$set: body});
        console.log(updatedWaybill)
        res.status(200).json(updatedWaybill);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
*/