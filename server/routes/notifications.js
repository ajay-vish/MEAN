const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Notification.getNotificationByUId(id, (err,notification) => {
      if(err) throw err;
      else{
        res.json({
            notification : notification
        });
      }
    });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    Notification.read(id, (err, notification) => {
      if(err) throw err;
      else{
        if(notification){
          res.json({
              success:true,
              notification: notification
          });
        }else{
          res.json({
              success:false,
              err: err
          });
        }
      }
    });
});

module.exports = router;