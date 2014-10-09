/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Booking = require('../api/incheck/incheck.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
Booking.find({}).remove(function(){
  Booking.create({
    number: 'RX1231412',
    active: true,
    bookedBy: {
      name: 'Test Testsson',
      email: 'test.testsson@test.com',
      username: 'testsson1'
    },
    bookedAt: new Date(2014,8,8),
    tickets:
    [
    {
      type:'datorplats',
      price: 180
    },
    {
      type:'datorskjuts',
      price: 20
    }
    ],
    total: 200,
    isPaid: false,
    isCheckedIn: false
  },
  {
    number: 'RX4893412',
    active: true,
    bookedBy: {
      name: 'Test Testsson2',
      email: 'test.testsson2@test.com',
      username: 'testsson2'
    },
    bookedAt: new Date(2014,9,8),
    tickets:
    [
    {
      type:'datorplats',
      price:180
    }
    ],
    total: 180,
    isPaid: true,
    isCheckedIn: false
  },
  {
    number: 'RX5738412',
    active: true,
    bookedBy: {
      name: 'Test Testsson3',
      email: 'test.testsson3@test.com',
      username: 'testsson3'
    },
    bookedAt: new Date(2014,10,8),
    tickets:
    [
    {
      type:'datorplats',
      price: 180
    },
    {
      type:'datorskjuts',
      price: 20
    }
    ],
    total: 200,
    isPaid: true,
    isCheckedIn: false
  }
  )
})
