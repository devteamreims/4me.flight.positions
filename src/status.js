const defaultStatus = {
  status: 'normal',
  when: Date.now(),
  error: null,
};

let status = Object.assign({}, defaultStatus);

export function getStatus() {
  return status;
}

export function recoverStatus() {
  status = Object.assign({}, defaultStatus, {when: Date.now()});
  return status;
}

export function escalateStatus(error, level = 'error') {
  status = Object.assign({}, {
    error,
    when: Date.now(),
    status: level,
  });
  return status;
}
