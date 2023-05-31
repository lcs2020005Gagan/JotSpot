const express=require("express")
const Notes=require("../models/Notes")
const router=express.Router()
const app =express()
let fetchuser=require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');


//fetch user
router.get('/fetchnotes', fetchuser,async(req, res) => {
    const notes=await Notes.find({user:req.id});
   res.json(notes);
  });


  //addnote
  router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1}),
   ], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


   //updatenote
  router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1}),
   ], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newNote={tag:"General"};
            if(title)
            newNote.title=title;
            if(description)
            newNote.description=description;
            if(tag)
            newNote.tag=tag;
            console.log(newNote);
            
            let note=await Notes.findById(req.params.id);
            if(!note)
            {
                res.status(498).send("Note not found");
            }
            if(note.user.toString()!==req.id)
            {
                res.status(401).send("Not authorized");
            }
            note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
            res.json(note);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


    //deletenote
  router.delete('/deletenote/:id', fetchuser, async (req, res) => {
        try {
            let note =await Notes.findById(req.params.id);
            if(!note)
            {
                res.status(498).send("Note note found");
            }
            if(note.user.toString()!==req.id)
            {
                res.status(401).send("Not authorized");
            }
            note=await Notes.findByIdAndDelete(req.params.id);
            res.json({"success":"Note was successfully deleted",note:note});
            
           
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

module.exports=router
