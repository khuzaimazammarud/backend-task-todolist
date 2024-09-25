import connectMongo from "../../../lib/mongodb";
import Todo from "../../../models/Todo";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await connectMongo();

  if (method === "DELETE") {
    try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
