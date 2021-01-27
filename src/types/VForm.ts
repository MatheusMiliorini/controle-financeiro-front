export type VForm = Vue & { submit: () => void, validate: () => Promise<boolean> }
