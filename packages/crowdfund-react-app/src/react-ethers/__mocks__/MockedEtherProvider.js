/* eslint-disable class-methods-use-this */

export default class MockedProvider {
  constructor(url) {
    this.connection = { url };
  }

  on() {}

  off() {}
}
