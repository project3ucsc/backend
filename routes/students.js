const express = require("express")
const Router = express.Router()

const Student = require('./../models/Student')

// return all student documents
Router.get('/', async (req,res)=>{
    try {
        const students = await  Student.find();
        res.json(students)

    } catch (error) {
        res.json({err: error});
        
    }
    

})

// return student of given id
Router.get('/:studentId',async (req,res)=>{
    try {
        const student = await Student.findById(req.params.studentId)
        res.json(student)

    } catch (error) {
        res.json({err: error})
    }
})


// add new student document
Router.post('/',async (req,res)=>{
    // console.log(req.body);
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    })

    try {
        const savedstudent = await student.save();
        res.json(savedstudent);
        
    } catch (error) {
        res.json({err: error});
    }

})



// delete student of given id
Router.delete('/:studentId',async (req,res)=>{
    try {
        const deletedstudent = await Student.remove({_id: req.params.studentId})
        res.json(deletedstudent)

    } catch (error) {
        res.json({err: error})
    }
})


// update student of given id
Router.patch('/:studentId',async (req,res)=>{
    try {
        const updatedstudent = await Student.updateOne(
            {_id: req.params.studentId},
            { $set: {title: req.body.title} 
        })
        res.json(updatedstudent)

    } catch (error) {
        res.json({err: error})
    }
})


module.exports = Router