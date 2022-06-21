import { ref } from 'vue'

export type HistoryItem = {
  id: string,
  name: string,
  lat: number,
  lng: number
}

const searchHistory = ref<HistoryItem[]>(getHistory())

function getHistory (): HistoryItem[] {
  const history = localStorage.getItem('searchHistory')

  if (
    history === null ||
    history === undefined ||
    history.length === 0
  ) {
    return []
  }

  return JSON.parse(history)
}

function setHistory (data: HistoryItem) {
  if (searchHistory.value.find(item => item.id === data.id)) return

  searchHistory.value.unshift(data)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

function deleteHistory (id: string) {
  const index = searchHistory.value.findIndex(item => item.id === id)
  if (index === undefined) return

  searchHistory.value.splice(index, 1)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

function clearHistory () {
  searchHistory.value = []
  localStorage.setItem('searchHistory', '')
}

export function useHistory () {
  return {
    searchHistory,
    setHistory,
    deleteHistory,
    clearHistory
  }
}
