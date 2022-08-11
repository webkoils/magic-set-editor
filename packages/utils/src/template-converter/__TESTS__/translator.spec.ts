import { convertTemplateFile } from '../converter';

describe('mse-translator', () => {
  it('should transform single level template file', async () => {
    let res = await convertTemplateFile(
      require.resolve('./one-level'),
      '/tmp/mse/data/one.json'
    );
    console.log(res);
    expect(res).toBeTruthy();
  });
  it('should transform two level template file', async () => {
    let res = await convertTemplateFile(
      require.resolve('./two-level'),
      '/tmp/mse/data/two.json'
    );
    console.log(res);
    expect(res).toBeTruthy();
  });

  it('should transform style template file', async () => {
    let res = await convertTemplateFile(
      require.resolve('./style'),
      '/tmp/mse/data/style.json'
    );
    console.log(res);
    expect(res).toBeTruthy();
  });
});
