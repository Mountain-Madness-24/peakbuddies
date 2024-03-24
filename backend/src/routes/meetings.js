const express = require('express');
const router = express.Router();
const Meeting = require('../models/meeting'); // Adjust the path as necessary
const ensureAuthenticated = require('../middleware/authCheck');

router.use(ensureAuthenticated);

/* 
    UNTESTED
*/


// GET /meetings - Returns list of meetings
router.get('/', async (req, res) => {
    try {
        const meetings = await Meeting.find({});
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

// GET /meetings/:meetingId - Returns meeting details
router.get('/:meetingId', async (req, res) => {
    try {
        console.log("Getting meeting details", req.params.meetingId)
        const meeting = await Meeting.find({ _id: req.params.meetingId });
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
        console.log("Meeting details:", meeting)
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /meetings/:meetingId - Deletes a meeting
router.delete('/:meetingId', async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndDelete(req.params.meetingId);
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
        res.json({ isSuccess: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH /meetings/:meetingId/start - Starts a meeting
router.patch('/:meetingId/start', async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, { isStarted: true }, { new: true });
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
        res.json({ isSuccess: true, isStarted: meeting.isStarted });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH /meetings/:meetingId/end - Ends a meeting
router.patch('/:meetingId/end', async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, { isFinished: true }, { new: true });
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
        res.json({ isSuccess: true, isFinished: meeting.isFinished });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
