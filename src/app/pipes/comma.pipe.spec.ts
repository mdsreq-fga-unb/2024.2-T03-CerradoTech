import { CommaPipe } from './comma.pipe';

describe('CommaPipe', () => {
  it('create an instance', () => {
    const pipe = new CommaPipe();
    expect(pipe).toBeTruthy();
  });
});
