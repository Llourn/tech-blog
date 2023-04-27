module.exports = {
  with_auth: (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  },
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  truncate_txt: (text) => {
    const target = text.length < 100 ? text.length : 100;
    return text.slice(0, target) + '...';
  },
};
