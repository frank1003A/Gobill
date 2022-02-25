import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";


export default async function handler(req, res) {
    try {
        const query = req.query
        const client = await clientPromise;
        const db = client.db("Gobill");
        let waybill = await db.collection("Waybill").findOne({_id: new ObjectId(query.waybill_id)})
       res.status(200).json(waybill) 
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

/**
 export default async function handler(req,res) {
    const query = req.query;
    const client = await clientPromise;
    const db = client.db("Gobill");
    let waybill = await db.collection("Waybill").findOne({_id: new ObjectId(query)})
    console.log(waybill)
    res.json(waybill)
}
 */