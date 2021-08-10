const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


// route add (form)
router.get('/add', (req, res) => {
  res.render('add')
});

// rota detalhe da vaga
router.get('/view/:id', (req, res) => {
  Job.findOne({
    where: {id: req.params.id}
  })
  .then(job => {
    res.render('view', {
      job
    });
  }).catch(err => console.log(err));
});

// rota add job via post (form)
router.post('/add', (req, res) => {
  let {title, salary, company, description, email, new_job} = req.body;

 // insert db
 Job.create({
   title,
   description,
   salary,
   company,
   email,
   new_job
 })
 .then(() => res.redirect('/'))
 .catch(err => console.log(err));
});

module.exports = router;