const User = require('../models/users');
const Meetup = require('../models/meetups');
const FAQ = require('../models/faq');
const Thread = require('../models/threads');
const Post = require('../models/posts');
const Category = require('../models/categories');
const passport = require('passport');

// We were just debugging in this lecture (:

exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}

exports.getCurrentUser = function (req, res) {
  const user = req.user;

  if(!user) {
    return res.sendStatus(422);
  }

  // For Session Auth!
  // return res.json(user);
  return res.json(user.toAuthJSON());
};

exports.register = function(req, res) {
  const registerData = req.body

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
        message: 'Email is required'
      }
    })
  }

  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
        message: 'Password is required'
      }
    })
  }

  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: 'is not the same as confirmation password',
        message: 'Password is not the same as confirmation password'
      }
    })
  }

  const user = new User(registerData);

  return user.save((errors, savedUser) => {
    if (errors) {
      return res.status(422).json({errors})
    }

    return res.json(savedUser)
  })
}

exports.login = function (req, res, next) {
  const { email, password } = req.body

  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
        message: 'Email is required'
      }
    })
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
        message: 'Password is required'
      }
    })
  }

  return passport.authenticate('local', (err, passportUser) => {
    if (err) {
      return next(err)
    }

    if (passportUser) {
      // Only For Session Auth!!!
      // req.login(passportUser, function (err) {
      //   if (err) { next(err); }

      //   return res.json(passportUser)
      // });

      return res.json(passportUser.toAuthJSON())

    } else {
      return res.status(422).send({errors: {
        'message': 'Invalid password or email'
      }})
    }

  })(req, res, next)
}

exports.logout = function (req, res) {
  req.logout()
  return res.json({status: 'Session destroyed!'})
}

// @facet
// Processes multiple aggregation pipelines within a single stage on the same set of input documents.
// Each sub-pipeline has its own field in the output document where its results are stored as an array of documents.


// meetups: find all of the meetups where meetupCreator is loggedIn user
//          find only 5 meetups
//          sort meetups by newest ones

// meetupsCount: find all of the meetups where meetupCreator is loggedIn user
//               don't return data but count of all meetups

function fetchMeetupsByUserQuery (userId) {
  return Meetup.aggregate([
    { "$facet": {
      "meetups": [
        { "$match": {"meetupCreator": userId}},
        { "$limit": 5 },
        { "$sort": {"createdAt": -1} }
      ],
      "meetupsCount": [
        { "$match": {"meetupCreator": userId}},
        { "$count": "count" }
      ]
    }}
  ])
  .exec()
  .then(results => {
    return new Promise((resolve) => {
      Category.populate(results[0].meetups, {path: 'category'})
      .then(pMeetups => {
        if (pMeetups && pMeetups.length > 0) {
          resolve({data: pMeetups, count: results[0].meetupsCount[0].count});
        } else {
          resolve({data: results[0].meetups, count: 0})
        }
      })
    })
  })
}

function fetchThreadsByUserQuery (userId) {
  return Thread.aggregate([
      { "$facet": {
        "threads": [
          { "$match": {"user": userId}},
          { "$limit": 5 },
          { "$sort": {"createdAt": -1} }
        ],
        "threadsCount": [
          { "$match": {"user": userId}},
          { "$count": "count" }
        ]
      }}
    ])
  .exec()
  .then(results => {
    const threads = results[0].threads;
    if (threads && threads.length > 0) {
      return {data: threads, count: results[0].threadsCount[0].count}
    }

    return {data: threads, count: 0}
  })
}

function fetchPostByUserQuery (userId) {
  return Post.aggregate([
      { "$facet": {
        "posts": [
          { "$match": {"user": userId}},
          { "$limit": 5 },
          { "$sort": {"createdAt": -1} }
        ],
        "postsCount": [
          { "$match": {"user": userId}},
          { "$count": "count" }
        ]
      }}
    ])
  .exec()
  .then(results => {
    const posts = results[0].posts;
    if (posts && posts.length > 0) {
      return {data: results[0].posts, count: results[0].postsCount[0].count}
    }

    return {data: results[0].posts, count: 0}
   }
)}

function fetchFAQsByUserQuery (userId)  {
  return FAQ.aggregate([
    { "$facet": {
      "faqs": [
        { "$match": {"faqCreator": userId}},
        { "$limit": 50 },
        { "$sort": {"createdAt": -1} }
      ],
      "faqsCount": [
        { "$match": {"faqCreator": userId}},
        { "$count": "count" }
      ]
    }}
  ])
  .exec()
  .then(results => {

    const faqs = results[0].faqs;
    if (faqs && faqs.length > 0) {
      return {data: results[0].faqs, count: results[0].faqsCount[0].count}
    }

    return {data: results[0].faqs, count: 0}
   })
}

function fetchFAQsByUsernameQuery (username)  {
  let bio = null;
  let avatar = null;
  User.findOne({username: username}, function(err, document) {
    if (document) {
      bio = document.info;
      avatar = document.avatar;
    } else {
      console.log("No user found.")
      return;
    }
  });
    return FAQ.aggregate([
      { "$facet": {
        "faqs": [
          { "$match": {"faqCreatorUsername": username}},
          { "$limit": 50 },
          { "$sort": {"createdAt": -1} }
        ],
        "faqsCount": [
          { "$match": {"faqCreatorUsername": username}},
          { "$count": "count" }
        ],
      }}
    ])
    .exec()
    .then(results => {

      const faqs = results[0].faqs;

      if (faqs && faqs.length > 0) {
        return {data: results[0].faqs, count: results[0].faqsCount[0].count, bio: bio, avatar: avatar}
      }

      return {data: results[0].faqs, count: 0, avatar: 'https://api.adorable.io/avatars/150/freqasked.png', bio: 'Nothing here...'}
    })
}
exports.getUserActivity = function (req, res) {
  const userId = req.user._id;

  Promise.all(
    [fetchMeetupsByUserQuery(userId),
     fetchThreadsByUserQuery(userId),
     fetchPostByUserQuery(userId),
     fetchFAQsByUserQuery(userId)
    ])
    // Writing [] to get data from the array

    .then(([meetups, threads, posts, faqs]) => res.json({meetups, threads, posts, faqs}))
    .catch(err => {
      console.log(err)
      res.status(422).send({err})
      })
}

exports.getUsernamePage = function (req, res) {
  Promise.all(
    [
      fetchMeetupsByUserQuery(req.params.username),
     fetchThreadsByUserQuery(req.params.username),
     fetchPostByUserQuery(req.params.username),
     fetchFAQsByUsernameQuery(req.params.username),
    ])
    // Writing [] to get data from the array
    .then(([meetups, threads, posts, faqs]) => res.json({meetups, threads, posts, faqs}))
    .catch(err => {
      console.log(err)
      res.status(422).send({err})
      })
}

exports.addQuestion = function(req, res) {
  const faqData = req.body;
  const user = req.body.user;
  const userId = req.params.id;
  const faq = new FAQ(faqData);
  faq.faqCreator = user._id;
  faq.question = faqData.question;
  faq.answer = faqData.answer;
  faq.faqCreatorUsername = user.username;
  faq.faqCreatorName = user.name;

  if (user._id === userId) {
  faq.save((errors, createdFAQ) => {
    if (errors) {
      return res.status(422).send({errors});
    }
    return res.json(createdFAQ)
  });
  } else {
    return res.status(422).send({errors: 'Authorization Error!'})
  }
}

exports.deleteQuestion = function(req) {
  const faqData = req.body
  const user = req.user;

    if (user.id === faqData.faqCreator) {
      FAQ.findByIdAndRemove (faqData._id, (err, data) => err ? console.log(err) : console.log(null, data));
    }
}

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const user = req.user;

  if (user.id === userId) {
    // new: bool - true to return the modified document rather than the original. defaults to false
    User.findByIdAndUpdate(userId, { $set: userData}, { new: true }, (errors, updatedUser) => {
      if (errors) return res.status(422).send({errors});

      return res.json(updatedUser);
    });
  } else {
    return res.status(422).send({errors: 'Authorization Error!'})
  }

}