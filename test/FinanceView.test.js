import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import FinanceView from '@/views/FinanceView.vue';
import { userStore } from '@/store/userStore'
import { transactionStore } from "@/store/transactionStore";

const user = userStore()
const transactions = transactionStore()
transactions.filterByDate = () => []

transactions.data = []

user.loggedIn = true;
user.data = {
    id: 1
}

const mockTransaction = {
    description: 'test',
    amount: 20,
    tag: '3',
    created_at: new Date(),
}

let wrapper;
describe('FinanceView.vue', () => {
    beforeAll(() => {
        vi.doMock('@/composables/useDatabase', () => {
            return {
                addTransaction: vi.fn().mockReturnValue(mockTransaction),
            };
        });
    })

    beforeEach(() => {
        wrapper = mount(FinanceView);
    })

    afterAll(() => {
        vi.restoreAllMocks();
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true)
    });

    it.skip('transactions adds properly', () => {
        wrapper.vm.formRef = {}
        wrapper.vm.handleFormSubmit()

        const data = addTransaction(mockTransaction)

        expect(transactions.data).toStrictEqual([
            mockTransaction
        ])
    });
});