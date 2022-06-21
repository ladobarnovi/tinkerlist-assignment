<template>
  <div class="search-input" ref="el">
    <div class="input-wrapper">
      <input
        @focus="isFocused = true"
        :class="{ isFocused }"
        type="text"
        placeholder="Search"
        v-model="keyword"
        ref="input"
      >
      <MaterialIcon class="lens" name="search" />
      <MaterialIcon v-if="keyword.length > 0" class="clear" name="close" @click="clearInput"/>
    </div>
    <ul v-if="isFocused" class="suggestions">
      <li @click="currentLocation">
        <MaterialIcon name="my_location" />
        Current Location
      </li>
      <li v-for="(s, index) in suggestions" :key="index" @click="redirect({ placeId: s.place_id, name: s.description })">
        <p>{{ s.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import axios from 'axios'
import MaterialIcon from '@/components/MaterialIcon.vue'
import { useMaps } from '@/hooks/useMaps'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SearchInput',
  components: { MaterialIcon },
  setup () {
    const el = ref()
    const input = ref<HTMLInputElement>()

    const keyword = ref('')
    const isFocused = ref(false)
    const suggestions = ref<google.maps.places.AutocompletePrediction[]>([])

    const { push } = useRouter()
    const { getPlaceByCoords } = useMaps()

    function currentLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords

          getPlaceByCoords(latitude, longitude).then(r => {
            redirect({
              placeId: r.place_id,
              name: r.formatted_address
            })
          })
        })
      }
    }

    onMounted(async () => {
      document.addEventListener('click', documentClickHandler)
    })
    onUnmounted(() => { document.removeEventListener('click', documentClickHandler) })

    function documentClickHandler (event: MouseEvent) {
      if (!event.composedPath().includes(el.value)) {
        isFocused.value = false
      }
    }

    function clearInput () {
      keyword.value = ''
      input.value?.focus()
    }

    function redirect (data: {
      placeId: string,
      name: string
    }) {
      isFocused.value = false
      keyword.value = data.name
      push(`/weather/${data.placeId}`)
    }

    watch(keyword, (kw: string) => {
      if (kw.length === 0) {
        suggestions.value = []
        return
      }

      const acs = new google.maps.places.AutocompleteService()
      acs.getPlacePredictions({ input: kw }, (r) => {
        if (r) {
          suggestions.value = r
        } else {
          suggestions.value = []
        }
      })
    })

    return {
      keyword,
      isFocused,
      suggestions,
      currentLocation,
      clearInput,
      redirect,
      el,
      input
    }
  }
})
</script>

<style scoped lang="scss">
.search-input {
  position: relative;
  max-width: 768px;
  margin: auto;

  .input-wrapper {
    position: relative;

    input {
      width: 100%;
      height: 40px;
      background-color: white;
      border-radius: 4px;
      outline: none;
      border: 1px solid rgba(0, 0, 0, 0.3);
      font-size: 16px;
      font-family: inherit;
      box-sizing: border-box;
      padding: 0 40px;

      &.isFocused {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &.lens {
        left: 8px;
        pointer-events: none;
      }

      &.clear {
        right: 8px;
        cursor: pointer;
      }
    }
  }

  .suggestions {
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: white;
    position: absolute;
    z-index: 10;
    top: 100%;
    left: 0;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.01);
      }

      .icon {
        margin-right: 8px;
      }

      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
