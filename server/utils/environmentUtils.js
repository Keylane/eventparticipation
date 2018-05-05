var ENV = {
  PROD: 'prod',
  TEST: 'test',
  DEV: 'dev'
}

function isRunningTest() {
  return process.env.NODE_ENV && process.env.NODE_ENV == ENV.TEST;
}

function isRunningProd() {
  return process.env.NODE_ENV && process.env.NODE_ENV == ENV.PROD;
}

function isRunningDev() {
  return process.env.NODE_ENV && process.env.NODE_ENV == ENV.DEV;
}

module.exports = {
  isRunningTest,
  isRunningProd,
  isRunningDev,
  ENV
}
