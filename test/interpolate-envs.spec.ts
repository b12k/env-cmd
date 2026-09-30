import { assert } from 'chai'
import { interpolateEnvs } from '../src/interpolate-envs.js'

describe('interpolateEnvs', (): void => {
  const envs = {
    notvar: 'this is not used',
    dollar: 'money',
    PING: 'PONG',
    IP1: '127.0.0.1',
    EMPTY: '',
  }
  const args = [
    'notvar',
    '{{dollar}}',
    '\\{{notvar}}',
    '-4',
    '{{PING}}',
    '{{IP1}}',
    '\\{{IP1}}',
    '{{NONEXIST}}',
    '{{NONEXIST:-fallback}}',
    '{{PING:-fallback}}',
    '{{EMPTY:-fallback}}',
    '\\{{NONEXIST:-fallback}}',
  ]
  const argsExpanded = [
    'notvar',
    'money',
    '\\{{notvar}}',
    '-4',
    'PONG',
    '127.0.0.1',
    '\\{{IP1}}',
    '{{NONEXIST}}',
    'fallback',
    'PONG',
    'fallback',
    '\\{{NONEXIST:-fallback}}',
  ]

  it('should interpolate environment variables in args', (): void => {
    const res = args.map(arg => interpolateEnvs(arg, envs))
    assert.sameOrderedMembers(res, argsExpanded)
  })

  it('should leave empty env var values as is without a default value', (): void => {
    assert.equal(interpolateEnvs('{{EMPTY}}', envs), '')
  })

  it('should use the default value if env var is missing', (): void => {
    assert.equal(interpolateEnvs('{{NONEXIST:-fallback}}', envs), 'fallback')
  })

  it('should use the default value if env var is empty', (): void => {
    assert.equal(interpolateEnvs('{{EMPTY:-fallback}}', envs), 'fallback')
  })

  it('should use the env var value if it is set and not empty', (): void => {
    assert.equal(interpolateEnvs('{{PING:-fallback}}', envs), 'PONG')
  })

  it('should allow an empty default value', (): void => {
    assert.equal(interpolateEnvs('{{NONEXIST:-}}', envs), '')
  })

  it('should keep colons in the default value', (): void => {
    assert.equal(interpolateEnvs('{{HOST:-http://localhost:3000}}', envs), 'http://localhost:3000')
  })
})
