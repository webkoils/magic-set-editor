import { transformTemplateFile } from '../transformers';

describe('mse-transformer', () => {
  it('should transform template file', async () => {
    let res = await transformTemplateFile(
      require.resolve('./card_fields'),
      '/tmp/mse/data'
    );
    console.log(res.children[0].children[0], res.children[0]);
    expect(res).toBeTruthy();
  });
});
