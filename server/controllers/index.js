/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/


let User = require('../models/user');
let passport = require('passport');
const jwt = require('jsonwebtoken');

let DB = require('../config/db');

// // define User Model instance
// let userModel = require('../models/user');
// let User = userModel.User;

function getErrorMessage(err) {
  console.log("===> Error: " + err);
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

// exports.home = function(req, res, next) {
//   res.render('index', { 
//     title: 'Home', 
//     username: req.user ? req.user.username : ''
//   });
// };

// Display the Login page
// module.exports.displayLoginPage = (req, res, next) => {
//   //check if user is already logged in
//   if(!req.user)
//   {
//     res.render('auth/login',
//     {
//       title: "login",
//       messages: req.flash('loginMessage'),
//       username: req.user ? req.user.username : ''
//     })
//   }
//   else
//   {
//     return res.redirect('/incident/list');
//   }
// }

// Process the Login page

module.exports.processLoginPage = (req, res, next) => {

  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.json({ success: false, message: err || info.message});
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, DB.SecretOrKey);

            return res.json({ success: true, token: token });
          }
        );
      } catch (error) {
        // return next(error);
        console.log(error);
        return res.json({ success: false, message: error});
      }
    }
  )(req, res, next);

  // passport.authenticate('local',
  // (err, user, info) => {
  //   // server err
  //   if(err)
  //   {
  //     return next(err);
  //   }
  //   // if user login error
  //   if(!user)
  //   {
  //     req.flash('loginMessage', 'Authentication Error');
  //     return res.redirect('/login');
  //   }
  //   req.login(user, (err) => {
  //     //server error
  //     if(err)
  //     {
  //       return next(err);
  //     }

  //     const payload = 
  //     {
  //       id: user._id,
  //       username: user.username,
  //       email: user.email
  //     }

  //     const authToken = jwt.sign(payload, DB.Secret, {
  //       expiresIn: 604800
  //     });

  //     return res.json({success: true, msg: "User Logged In Successfully!", user: {
  //       id: user._id,
  //       username: user.username,
  //       email: user.email
  //     }, token: authToken});
      

  //     // return res.redirect('/incident/list')
  //   });
  // })(req, res, next);    
}

// Display the Register page
// module.exports.displayRegisterPage = (req, res, next) => {
//   //if user is not logged in
//   if(!req.user)
//   {
//     res.render('auth/register',
//     {
//       title: 'Register',
//       messages: req.flash('registerMessage'),
//       username: req.user ? req.user.username : ''
//     });
//   }
//   else
//   {
//     return res.redirect('/');
//   }
// }

// Processes the Register page

module.exports.processRegisterPage = (req, res, next) => {

  let user = new User(req.body);
    user.provider = 'local';
    console.log(user);

    user.save((err) => {
      if (err) {
        let message = getErrorMessage(err);

        return res.json({success: false, message: message});
      }
      return res.json({success: true, message: 'User created successfully!'});
    });

  // //instantiate user object
  // let newUser = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   userType: req.body.userType
  // });

  // User.register(newUser, req.body.password, (err) => {
  //   if (err)
  //   {
  //     console.log("Error: Inserting New User");
  //     if(err.name == "UserExistsError")
  //     {
  //       req.flash(
  //       'registerMessage',
  //       'Registration Error: User Already Exists!'
  //       );
  //       console.log('Error: User Already Exists')
  //     }
  //     return res.render('auth/register', 
  //     {
  //       title: 'Register',
  //       messages: req.flash('registerMessage'),
        
  //       username: req.user ? req.user.username : ''
  //     });
  //   }
  //   else
  //   {
  //     return res.json({success: true, msg: 'User Registered Successfully!'});

  //     // if no error, registration successful
  //     // return passport.authenticate('local')(req, res, () => {
  //     //   //redirect to /login
  //     //   res.redirect('/')
  //     // });
  //   }
  // });
}


// Gets user account and renders the modify form using the settings.ejs template
module.exports.displaySettingsPage = (req, res, next) => {
  let id = req.params.id;
  console.log('ID: ' + id);

  User.findById(id, (err, settingsToEdit) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //show the edit view
      res.render('auth/settings', 
      {
        title: 'Account Modification', 
        user: settingsToEdit, 
        username: req.user ? req.user.username : ''
      })
      console.log(settingsToEdit);
    }
  });
}

// Processes the data submitted from the settings form to update a user account

module.exports.processSettingsPage = (req, res, next) => {
  let id = req.params.id

  let updatedSettings = Settings({
    _id: req.body.id,
    username: req.body.username,
    email: req.body.email
  });

  Settings.updateOne({_id: id}, updatedSettings, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/');
    }
  });
}

// Performs Logout
// module.exports.performLogout = (req, res, next) => {
//   req.logout();
//   res.redirect('/');
//   res.json({success: true, msg: 'User Successfully Logged Out!'})
// }