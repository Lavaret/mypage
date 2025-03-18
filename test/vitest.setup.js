import { config } from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'

config.global.plugins = [createTestingPinia()]
config.global.root = document.body