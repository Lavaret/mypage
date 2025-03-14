import { mount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FinanceList from "@/components/finance/FinanceList.vue";
import MenuComponent from "@/components/menu/MenuComponent";
import MenuItemComponent from "@/components/menu/MenuItemComponent";
import { transactionStore } from "@/store/transactionStore";

config.global.components = [
    MenuComponent,
    MenuItemComponent,
]

config.global.stubs =  {
    teleport: true
}

const transactions = transactionStore()

transactions.data = [
    {
        id: 1,
        description: 'Test transaction 0',
        created_at: new Date(),
        amount: -100,
        TransactionTag: [
            {
                Tags: {
                    name: 'Tag'
                }
            }
        ]
    },
    {
        id: 2,
        description: 'Test transaction 1',
        created_at: new Date(),
        amount: 200,
        TransactionTag: []
    }
]

let wrapper;
describe("FinanceList.vue", () => {
    beforeEach(() => {
        wrapper = mount(FinanceList, {
            attachTo: document.body
        });
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

    it("has column tags", () => {
        expect(wrapper.vm.columnsTitles).toContain('Tags')
    })

    it('displays tag if tag is present in transaction', () => {
        const tagsCells = wrapper.findAll('[data-test="tag"]')
        expect(tagsCells).toHaveLength(2)

        for (let i = 0; i < 2; i++) {
            const tags = transactions.data[i].TransactionTag
            if (tags.length) {
                expect(tagsCells[i].text()).toContain(tags[0].Tags.name)
            }
        }
    })

    it('shows edit menu item', async () => {
        const actionButton = wrapper.find('[data-test="action-button"]')
        expect(actionButton.exists()).toBe(true)

        await actionButton.trigger('click')

        const menuItems = wrapper.findAll('[role="menuitem"]')
        expect(menuItems.some((item) => item.element.textContent.includes('Edit'))).toBe(true)
    })

    it('shows modal after clicking edit and gets edited transaction', async () => {
        wrapper.vm.handleEditTransaction(1)
        expect(wrapper.vm.showModal).toBe(true)

        expect(wrapper.vm.editedTransaction.id).toBe(1)
    })
});