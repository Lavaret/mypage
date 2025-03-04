import { shallowMount, config } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FinanceList from "@/components/finance/FinanceList.vue";
import TableHeaderComponent from "@/components/finance/TableHeaderComponent.vue";

config.global.plugins = [TableHeaderComponent]

describe("FinanceList.vue", () => {
    it("renders the initial transactions", () => {
        const wrapper = shallowMount(FinanceList);
        expect(wrapper).toBeTruthy()
    });
});