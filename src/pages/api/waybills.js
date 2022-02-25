import clientPromise from "../../../lib/mongodb";
export default async function waybill(req, res) {
    try {
        /** */
        const client = await clientPromise;
        /** */
        const db = client.db("Gobill");
        /** */
        let waybills = await db.collection("Waybill").find()
        res.status(201).json(waybills)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

