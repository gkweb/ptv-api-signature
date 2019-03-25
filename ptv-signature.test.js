const ptvSig = require('./dist/bundle.js')
const DEV_ID = '1111111'
const DEV_KEY = 'abcde-1234-5678-9101-ffffffffffff'

test('Generates valid HMAC HEX that is reproducable on multiple runs', () => {
  const reqPath = `/v3/search/balaclava?devid=${DEV_ID}&route_types=0`
  const sig = ptvSig.genSignature(reqPath, DEV_KEY)
  const sig2 = ptvSig.genSignature(reqPath, DEV_KEY)
  expect(sig).toBe(sig2)
})

test('pathWithSig - Signature to be in path after run AND have generated params', () => {
  const reqPathNoParams = `/v3/search/balaclava`
  const reqPathWithParams = `/v3/search/balaclava?route_types=0&devid=${DEV_ID}`
  const sig = ptvSig.genSignature(`${reqPathWithParams}`, DEV_KEY)
  const run = ptvSig.pathWithSig(reqPathNoParams, [{ name: 'route_types', value: 0 }], DEV_ID, DEV_KEY)
  const sigRegex = new RegExp(`(${sig})`)
  expect(sigRegex.test(run)).toBe(true)
})

test('pathWithSig - Params appended correctly when params are baked into the path - IE: No duplicate ? appended. If "?" is present every additional param shouuld be &something=blah&foo=bar', () => {
  const reqPathWithParamBaked = `/v3/search/balaclava?foo=bar`
  const run = ptvSig.pathWithSig(reqPathWithParamBaked, [{ name: 'route_types', value: 0 }], DEV_ID, DEV_KEY)
  const hasMoreThanOneCharOccurence = (run.split('?').length > 2)
  expect(hasMoreThanOneCharOccurence).toBe(false)
})
