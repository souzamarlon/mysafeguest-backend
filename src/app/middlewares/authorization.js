export default function adminAuthorization(adminAccess) {
  return (req, res, next) => {
    const { admin } = req;

    try {
      if (admin === adminAccess) {
        return next(); // access is allowed, so continue on the next middleware
      }
      return res.status(403).json({ message: 'Forbidden' }); // user is forbidden
    } catch (err) {
      return res
        .status(401)
        .json({ message: 'Error validating your authorization.' });
    }
  };
}
