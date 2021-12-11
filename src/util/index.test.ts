import { formatKey } from './';

describe('util test suits', () => {
  it('test formatKey', () => {
    expect(formatKey('mission_name')).toBe('Mission Name');
  });
});
