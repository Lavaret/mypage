import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import FinanceView from '@/views/FinanceView.vue';
import { userStore } from '@/store/userStore'
import { transactionStore } from "@/store/transactionStore";

const user = userStore()
const transactions = transactionStore()
transactions.filterByDate = () => []

const mockTransaction = {
    description: 'test',
    amount: 20,
    tag: '3',
    created_at: new Date(),
}

transactions.data = []

user.loggedIn = true;
user.data = {
    id: 1
}

let wrapper;
describe('FinanceView.vue', () => {
    beforeEach(() => {
        wrapper = mount(FinanceView);
    })

    afterAll(() => {
        vi.restoreAllMocks();
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true)
    });

    it('transactions adds properly', async () => {
        vi.mock('@/composables/useDatabase', async (importOriginal) => {
            return {
                ...await importOriginal(),
                addTransaction: vi.fn
            }
        })
        const spy = vi.spyOn(wrapper.vm, 'addTransaction')

        wrapper.vm.formRef = {
            formData: mockTransaction
        }
        wrapper.vm.handleFormSubmit()
        wrapper.vm.addTransaction()

        expect(spy).toHaveBeenCalled();
    });
});