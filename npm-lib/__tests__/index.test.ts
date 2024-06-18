import { sayHello } from '..'

test('HiTemplate sayHello', () => {
    expect(sayHello('World')).toBe('Hello World')
})
