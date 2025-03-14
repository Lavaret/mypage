import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import FinanceForm from '@/components/finance/FinanceForm.vue';

let wrapper;
const inputsSelectors = {
    description: '[data-test="input-description"]',
    date: '[data-test="input-date"]',
    amount: '[data-test="input-amount"]',
    tag: '[data-test="input-tag"]',
}
const now = '2025-03-08T11:10:08.446+00:00'

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
        wrapper.find(inputsSelectors.amount).setValue(150)
        wrapper.find(inputsSelectors.description).setValue('test')
        wrapper.vm.formData.created_at = now
        wrapper.vm.formData.tags = [{ name: 'savings' }]

        expect(wrapper.vm.formData).toStrictEqual({
            description: 'test',
            amount: 150,
            tags:  [{ name: 'savings' }],
            created_at: now
        })
    })
});

const transactionMock = {
    id: 1,
    amount: 100,
    created_at: now,
    description: 'Test transaction',
    TransactionTag: [{
        Tags: {
            name: 'tag'
        }
    }]
}

describe('Edit form', () => {
    beforeEach(() => {
        wrapper = shallowMount(FinanceForm, {
            props: {
                savedData: transactionMock
            }
        });
    })

    it('shows properly saved transaction in the form', () => {
        expect(wrapper.vm.formData).toStrictEqual({
            description: 'Test transaction',
            amount: 100,
            tags:  [{ name: 'tag' }],
            created_at: '2025-03-08T11:10:08'
        })
    })
})