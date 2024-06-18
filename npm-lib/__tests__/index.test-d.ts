import { expectType } from 'tsd'
import { sayHello } from '..'

expectType<string>(sayHello('cat'))
