const express = require('express');
const xss = require('xss');
// const { v4: uuid } = require('uuid');
const ComplimentsService = require('./compliments-service');
const complimentsRouter = express.Router();

const bodyParser = express.json();

const serializeCompliment = compliment => ({
  id: compliment.id,
  content: compliment.content,
});

complimentsRouter.route('/').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  ComplimentsService.getAllCompliments(knexInstance)
    .then(compliments => {
      res.json(compliments.map(compliment => serializeCompliment(compliment)));
    })
    .catch(next);
});

complimentsRouter
  .route('/:id')
  .all((req, res, next) => {
    console.log('id', req.params.id);
    const knexInstance = req.app.get('db');
    ComplimentsService.getComplimentById(knexInstance, req.params.id)
      .then(compliment => {
        if (!compliment) {
          return res.status(404).json({
            error: { message: `Fresh out of compliments at this location` },
          });
        }
        res.compliment = compliment;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeCompliment(res.compliment));
  });

module.exports = complimentsRouter;
