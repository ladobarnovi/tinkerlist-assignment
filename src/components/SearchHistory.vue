<template>
  <div class="search-history">
    <p v-if="searchHistory.length === 0">No Search History</p>
    <template v-else>
      <button class="clear-history" @click="clearHistory">
        <span>Clear History</span>
        <MaterialIcon name="delete" />
      </button>
      <div class="grid-container">
        <SearchHistoryCard v-for="place of searchHistory" :place="place" :key="place.place_id" />
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useHistory } from '@/hooks/useHistory'
import SearchHistoryCard from '@/components/SearchHistoryCard'
import MaterialIcon from '@/components/MaterialIcon'

export default defineComponent({
  name: 'SearchHistory',
  components: { MaterialIcon, SearchHistoryCard },
  setup () {
    const { searchHistory, clearHistory } = useHistory()

    return {
      searchHistory,
      clearHistory
    }
  }
})
</script>

<style scoped lang="scss">
.search-history {
  max-width: 768px;
  margin: auto;

  p {
    font-size: 24px;
    margin-bottom: 8px;
    text-align: center;
    font-weight: 700;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }

  .clear-history {
    margin-bottom: 16px;
    margin-left: auto;
    display: flex;
    align-items: center;

    span {
      font-weight: 700;
      margin-right: 4px;
    }
  }

  @media (min-width: 768px) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
