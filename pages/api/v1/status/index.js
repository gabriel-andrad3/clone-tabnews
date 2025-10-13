function status(req, res) {
  res.status(200).send({ status: 'testezão utf-8' });
}

export default status;