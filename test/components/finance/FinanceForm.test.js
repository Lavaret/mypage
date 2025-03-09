import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import FinanceForm from '@/components/finance/FinanceForm.vue';

let wrapper;
const inputsSelectors = {
    description: '[data-test="input-description"]',
    date: '[data-test="input-date"]',
    amount: '[data-test="input-amount"]',
    tag: '[data-test="input-tag"]',
}

describe('Finance Form', () => {
    beforeEach(() => {
        wrapper = mount(FinanceForm);
    })
    it('renders input description', () => {
        const input = wrapper.find(inputsSelectors.description)
        expect(input.exists()).toBe(true)
    });

    it('renders input date', () => {
        const input = wrapper.find(inputsSelectors.date)
        expect(input.exists()).toBe(true)
        expect(input.element.type).toContain('datetime')
    });

    it('renders input amount', () => {
        const input = wrapper.find(inputsSelectors.amount)
        expect(input.exists()).toBe(true)
        expect(input.element.type).toBe('number')
    });

    it('renders input tag', () => {
        const input = wrapper.find(inputsSelectors.tag)
        expect(input.exists()).toBe(true)
    });

    it('reflects changes from form in form data', () => {
        const now = '2025-03-09T16:05:59.508Z'
        wrapper.find(inputsSelectors.tag).setValue('savings')
        wrapper.find(inputsSelectors.amount).setValue(150)
        wrapper.find(inputsSelectors.description).setValue('test')
        wrapper.vm.formData.created_at = now

        expect(wrapper.vm.formData).toStrictEqual({
            description: 'test',
            amount: 150,
            tag: 'savings',
            created_at: now
        })
    })
});