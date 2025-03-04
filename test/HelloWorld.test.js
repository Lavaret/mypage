import { render, screen } from '@testing-library/vue'
import { test } from 'vitest'
import HelloWorld from '/src/components/HelloWorld.vue'

test('it should display welcome message', () => {
    render(HelloWorld)

    // assert output
    screen.getByText('Justyna');
})