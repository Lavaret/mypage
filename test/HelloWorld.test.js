import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HelloWorld from '../src/components/HelloWorld.vue';

let wrapper;
describe('HelloWorld.vue', () => {
    beforeEach(() => {
        wrapper = mount(HelloWorld);
    })
    it('renders the correct message', () => {
        expect(wrapper.text()).toContain('👋');
    });
});