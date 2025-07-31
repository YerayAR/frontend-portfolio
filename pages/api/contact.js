export default function handler(req, res) {
  if (req.method === 'POST') {
    // Here you would integrate with an email service
    console.log('Message received:', req.body)
    return res.status(200).json({ success: true })
  }
  res.status(405).end()
}
