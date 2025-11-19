import express from 'express';

const router = express.Router();

router.get('/test-session', (req, res) => {
     res.json({
          message: "Test Session route is working",
     });
});

export default router;