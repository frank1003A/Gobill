import clientPromise from "../../../lib/mongodb";

export default async function updateWaybillById(req,res) {
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
}