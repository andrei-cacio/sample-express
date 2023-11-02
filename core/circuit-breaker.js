const fetch = require("node-fetch");

const CIRCUIT_STATE = {
  OPENED: "opened",
  CLOSED: "closed",
  HALF: "half",
};

class CircuitBreaker {
  request = null;
  state = CIRCUIT_STATE.CLOSED;
  failureCount = 0;
  failureThreshold = 5;
  resetAfter = 50000;
  timeout = 5000;

  constructor(request, options) {
    this.state = CIRCUIT_STATE.CLOSED; // allowing requests to go through by default
    this.failureCount = 0;
    this.request = request;
    // allow request to go through after the circuit has been opened for resetAfter seconds
    // open the circuit again if failure is observed, close the circuit otherwise
    this.resetAfter = Date.now();
    if (options) {
      this.failureThreshold = options.failureThreshold;
      this.timeout = options.timeout;
    } else {
      this.failureThreshold = 5; // in ms
      this.timeout = 5000; // in ms
    }
  }

  async fire() {
    if (this.state === CIRCUIT_STATE.OPENED) {
      if (this.resetAfter <= Date.now()) {
        this.state = CIRCUIT_STATE.HALF;
      } else {
        throw new Error(
          "Circuit is in open state right now. Please try again later.",
        );
      }
    }
    try {
      const response = await fetch(this.request);
      if (response.status === 200) return this.success(response);
      return this.failure(response);
    } catch (err) {
      return this.failure(err.message);
    }
  }

  success(data) {
    this.failureCount = 0;
    if (this.state === CIRCUIT_STATE.HALF) {
      this.state = CIRCUIT_STATE.CLOSED;
    }
    return data;
  }

  failure(data) {
    this.failureCount += 1;
    if (
      this.state === CIRCUIT_STATE.HALF ||
      this.failureCount >= this.failureThreshold
    ) {
      this.state = CIRCUIT_STATE.OPENED;
      this.resetAfter = Date.now() + this.timeout;
    }
    return data;
  }
}

module.exports = CircuitBreaker;
