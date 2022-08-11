import { convertTemplateFile } from '..'

describe('mse-translator', () => {
  it('should transform single level template file', async () => {
    let res = await convertTemplateFile(
      require.resolve('./data/one-level'),
      '/tmp/mse/data/one.json',
    )
    expect(res).toBeTruthy()
  })
  it('should transform two level template file', async () => {
    let res = await convertTemplateFile(
      require.resolve('./data/two-level'),
      '/tmp/mse/data/two.json',
    )
    expect(res).toBeTruthy()
  })

  it('should transform style template file', async () => {
    let res = await convertTemplateFile(
      require.resolve('./data/style'),
      '/tmp/mse/data/style.json',
    )
    expect(res).toBeTruthy()
  })

  it('should transform card_fields template file', async () => {
    let res = await convertTemplateFile(
      require.resolve('./data/card_fields'),
      '/tmp/mse/data/card_fields.json',
    )
    expect(res).toBeTruthy()
  })
})
