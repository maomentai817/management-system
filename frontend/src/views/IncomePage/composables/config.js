import { useMemberStore, useConsumeStore } from '@/stores'

export const useIncomeData = () => {
  const memberStore = useMemberStore()
  const consumeStore = useConsumeStore()

  const memOptions = memberStore.members.map((item) => {
    return {
      value: item.name,
      label: item.name
    }
  })

  const tagOptions = consumeStore.tags.map((item) => {
    return {
      value: item,
      label: item
    }
  })
  return {
    memOptions,
    tagOptions
  }
}
