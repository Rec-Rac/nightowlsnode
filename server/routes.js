const express = require('express');
const path = require('path');
const controller = require('./controller.js');

module.exports = (app) => {
  // PROFILE ROUTES
  app.use('/data/:id', controller.checkAuth, express.static(path.join(__dirname, '../public')));
  app.use('/profile/:id', controller.checkAuth, express.static(path.join(__dirname, '../public')));
  app.use('/profile/', controller.checkAuth, express.static(path.join(__dirname, '../public')));

  // RESULTS ROUTES
  app.get('/search', controller.search);

//chat routes
  app.get('/messages/all', controller.getAllMessages)
  app.get('/messages/:userId/:ownerId', controller.getMessages)
  app.post('/messages', controller.postMessage)

  // AUTH ROUTES
  app.use('/login', express.static(path.join(__dirname, '/public')));
  app.use('/signup', express.static(path.join(__dirname, '/public')));
  app.get('/logout', controller.handleLogout);
  app.post('/login', controller.handleLogin);
  app.post('/signup', controller.handleSignup);
  app.get('/checkSession', controller.checkSession, (req, res) => {
    res.status(200).json({
      status: 'Login successful!',
    });
  });

  // API ROUTES
  app.get('/api/profile/:id', controller.checkAuth, controller.getProfile);
  app.get('/api/userItems/:userId', controller.checkAuth, controller.getUserItems);
  app.get('/api/borrowedItems/:userId', controller.checkAuth, controller.getBorrowedItems);
  app.get('/api/userTransactions/:userId', controller.checkAuth, controller.getTransactions);
  app.post('/api/items', controller.checkAuth, controller.addItems);
  app.put('/api/items/:id', controller.checkAuth, controller.returnItem);
  app.put('/api/ratings', controller.updateRating);
  app.post('/api/updateUser', controller.updateUser);
  app.post('/api/borrow', controller.borrow);
};


// const app = require('../index.js');
// // const http = require('http');
// const Mailgun = require('mailgun-js');
// // eventually move this to private
// const apiKey = 'MAILGUN-API-KEY';
// const domain = YOUR-DOMAIN.com';
// const fromWho = your@email.com';
