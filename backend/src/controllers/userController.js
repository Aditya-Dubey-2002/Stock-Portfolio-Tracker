const db = require('../config/db'); // Your DB connection logic

const getUserProfile = async (req, res) => {
  const userId = req.user.userId; // Extracted from the middleware

  try {
    const [user] = await db.query(
      'SELECT fullName, email, bio, balance, image FROM users WHERE userId ='+userId,
      [userId]
    );

    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userDetails = user[0];
    res.status(200).json({ userDetails });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

module.exports = { getUserProfile };
