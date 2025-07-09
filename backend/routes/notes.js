import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import NoteModel from '../models/Note.js';
import { body, validationResult } from 'express-validator';

const router = express.Router()

// Route 1: Get all notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await NoteModel.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: add a note using: POST "/api/notes/addnotes". Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be at least 5 characters').isLength({min: 5}),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;   
        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.array() }); // Return validation errors if any
        }

        const note = new NoteModel({
            title,
            description,
            tag,
            user: req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

// Route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a new note object
    const newNote = {};         
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }
    // Find the note to be updated and update it
    let note = await NoteModel.findById(req.params.id);
    if(!note) {
        return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await NoteModel.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});
})

// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    // Find the note to be deleted and delete it
    let note = await NoteModel.findById(req.params.id);
    if(!note) {
        return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await NoteModel.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted", note: note});
})

export default router;