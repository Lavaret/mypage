import { shallowMount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FinanceList from "@/components/finance/FinanceList.vue";
import TableHeaderComponent from "@/components/finance/TableHeaderComponent.vue";
import { transactionStore } from "@/store/transactionStore";

config.global.plugins = [TableHeaderComponent]

const transactions = transactionStore()

transactions.data = [
    {
        id: 1,
        description: 'Test transaction 0',
        created_at: new Date(),
        amount: -100
    },
    {
        id: 2,
        description: 'Test transaction 1',
        created_at: new Date(),
        amount: 200
    }
]

let wrapper;
describe("FinanceList.vue", () => {
    beforeEach(() => {
        wrapper = shallowMount(FinanceList);
    })
    it("renders component", () => {
        expect(wrapper).toBeTruthy()
    });

    it("shows transactions from store", () => {
        const displayedTransaction = wrapper.findAll('[data-test="transaction-row"]')
        expect(displayedTransaction).toHaveLength(transactions.current.length)
    });

    it("changes color of amount", () => {
        transactions.data[0].amount = -50
        transactions.data[1].amount = 50

        const displayedTransaction = wrapper.findAll('[data-test="transaction-row"]')

        const firstAmountElement = displayedTransaction[0].find('[data-test="amount"]')
        const secondAmountElement = displayedTransaction[1].find('[data-test="amount"]')

        expect(firstAmountElement.classes()).toContain('text-red-600')
        expect(secondAmountElement.classes()).toContain('text-green-600')
    });
});