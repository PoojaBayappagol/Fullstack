const express=require('express');
const noteModel=require('./models/note.model');
const cors=require("cors")
const path=require('path');

const app=express();

app.use(express.json());
app.use(cors())
app.use(express.static('./public'))

app.post('/notes',async(req,res)=>{
    const note=req.body;  

    await noteModel.create(note);

    res.status(201).json({
        message:'Note created successfully',
        note
    });
});


app.get('/notes',async(req,res)=>{
    const notes=await noteModel.find();
    res.status(200).json({
        message:'Notes retrieved successfully',
        notes
    });
});

app.delete('/notes/:id',async(req,res)=>{
    const id=req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message:'Note deleted successfully',
    });
});

app.patch('/notes/:id',async(req,res)=>{
    const id=req.params.id;
    const note=req.body;
    await noteModel.findByIdAndUpdate(id,note);
    res.status(200).json({
        message:'Note updated successfully',
    });
});

app.use('*name',(req,res)=>{
   res.sendFile(path.join(__dirname,'/public/index.html'))
})


module.exports=app;