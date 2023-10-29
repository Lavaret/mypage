import { render } from '@testing-library/vue'
import { test } from 'vitest'
import HelloWorld from '../src/components/HelloWorld.vue'

test('it should display welcome message', () => {
    const { getByText } = render(HelloWorld)

    // assert output
    getByText('Hi, I\'m Justyna');
})