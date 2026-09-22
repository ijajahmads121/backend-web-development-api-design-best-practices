function sendList(res, rows, meta) {
  return res.status(200).json({ data: rows, meta });
}

function sendCreated(res, payload) {
  return res.status(201).json({ data: payload });
}

function sendOk(res, payload) {
  return res.status(200).json({ data: payload });
}

function sendError(res, status, { code, message, details } = {}) {
  const error = {
    code: code || defaultCodeForStatus(status),
    message: message || defaultMessageForStatus(status)
  };

  if (details !== undefined) error.details = details;
  return res.status(status).json({ error });
}

function defaultCodeForStatus(status) {
  if (status === 400) return 'BAD_REQUEST';
  if (status === 404) return 'NOT_FOUND';
  if (status === 500) return 'INTERNAL_ERROR';
  return 'REQUEST_ERROR';
}

function defaultMessageForStatus(status) {
  if (status === 400) return 'Bad request';
  if (status === 404) return 'Resource not found';
  if (status === 500) return 'Something went wrong';
  return 'Request failed';
}

module.exports = {
  sendList,
  sendCreated,
  sendOk,
  sendError,
  defaultCodeForStatus,
  defaultMessageForStatus
};
