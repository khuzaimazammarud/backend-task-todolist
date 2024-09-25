import connectMongo from '../../../lib/mongodb';
import Todo from '../../../models/Todo';

// POST Method Handler
async function POST(req, res) {
  await connectMongo();

  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// GET Method Handler
async function GET(req, res) {
  await connectMongo();

  try {
    const todos = await Todo.find({});
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// Main API Route Handler
export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    return POST(req, res);
  } else if (method === 'GET') {
    return GET(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
