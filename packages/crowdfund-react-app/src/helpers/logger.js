global.logHistory = [];
global.logger = {};

const LOG_LEVEL = process.env.REACT_APP_LOG_LEVEL || 'info';
const LOG_TIMESTAMPS = process.env.REACT_APP_LOG_TIMESTAMPS === 'true';

const logLevels = ['info', 'warning', 'error'];

const shouldLog = (logLevel) =>
  logLevels.indexOf(LOG_LEVEL) <= logLevels.indexOf(logLevel);

const log = (logLevel, ...args) => {
  if (shouldLog(logLevel)) {
    const logArgs = LOG_TIMESTAMPS ? [new Date(), ...args] : args;

    global.logHistory.push(
      `[${logLevel.toUpperCase()}] ${new Date()} ${args.join(' ')}`
    );

    // eslint-disable-next-line no-console
    console[logLevel](...logArgs);
  }
};

logLevels.forEach((logLevel) => {
  global.logger[logLevel] = (...args) => log(logLevel, ...args);
});

global.printLogs = () => {
  global.document.getElementById('logs').textContent =
    global.logHistory.join('\n');
};

export default global.logger;
