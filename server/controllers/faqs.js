const FAQ = require('../models/faq');

exports.getFAQs = function(req, res) {
  const username = req.query.username;

  FAQ.find({'faqCreatorUsername': username})
        .populate('user')
        .exec((errors, faqs) => {

    if (errors) {
      return res.status(422).send({errors});
    }
    return res.json(faqs.data);
  });
}





