import { log } from '../lib/log.helper';

describe('Log Helper', () => {
  describe('When log is NOT in debug mode', () => {
    test('should not log anything', () => {
      const spy = jest.spyOn(console, 'log');

      log(false, 'test log');

      expect(console.log).not.toBeCalled();

      spy.mockRestore();
    });
  });

  describe('When log is debug mode', () => {
    test('should log the message', () => {
      const spy = jest.spyOn(console, 'log');

      log(true, 'test log');

      expect(console.log).toBeCalledWith('test log');

      spy.mockRestore();
    });

    test('if has more than one message should log the messages', () => {
      const spy = jest.spyOn(console, 'log');

      log(true, 'test log', 'test log 2');

      expect(console.log).toBeCalledWith('test log', 'test log 2');

      spy.mockRestore();
    });
  });
});
