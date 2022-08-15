<template>
  <div class="home">
    <div v-if="streams">
      <img alt="Vue logo" src="../assets/logo.png">
      <h3>Total amount of streams per game</h3>
      <Vue3EasyDataTable v-if="streams.amountPerGame" :headers="headers.amountPerGame" :items="streams.amountPerGame" :rows-per-page="10">
        <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
          <button :disabled="isFirstPage" @click="prevPage">prev page</button>
          <button :disabled="isLastPage" @click="nextPage">next page</button>
        </template>
      </Vue3EasyDataTable>
      
      <h3>Highest viewer count stream per game</h3>
      <Vue3EasyDataTable v-if="streams.maxViewsPerGame" :headers="headers.maxViewsPerGame" :items="streams.maxViewsPerGame" :rows-per-page="10">
        <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
          <button :disabled="isFirstPage" @click="prevPage">prev page</button>
          <button :disabled="isLastPage" @click="nextPage">next page</button>
        </template>
      </Vue3EasyDataTable>

      <h3>Median amount of viewers for all streams: {{ streams.avgViews }}</h3>

      <h3>Streams with an odd number of viewers</h3>
      <Vue3EasyDataTable v-if="streams.oddViews" :headers="headers.oddViews" :items="streams.oddViews" :rows-per-page="10">
        <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
          <button :disabled="isFirstPage" @click="prevPage">prev page</button>
          <button :disabled="isLastPage" @click="nextPage">next page</button>
        </template>
      </Vue3EasyDataTable>

      <h3>Streams with an even number of viewers</h3>
      <Vue3EasyDataTable v-if="streams.evenViews" :headers="headers.evenViews" :items="streams.evenViews" :rows-per-page="10">
        <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
          <button :disabled="isFirstPage" @click="prevPage">prev page</button>
          <button :disabled="isLastPage" @click="nextPage">next page</button>
        </template>
      </Vue3EasyDataTable>

      <h3>List of top 100 streams that can be sorted asc & desc</h3>
      <Vue3EasyDataTable v-if="streams.top100" :headers="headers.top100" :items="streams.top100" :rows-per-page="10">
        <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
          <button :disabled="isFirstPage" @click="prevPage">prev page</button>
          <button :disabled="isLastPage" @click="nextPage">next page</button>
        </template>
      </Vue3EasyDataTable>

      <h3>Streams with the same amount of viewers</h3>
      <Vue3EasyDataTable v-if="streams.sameViews" :headers="headers.sameViews" :items="streams.sameViews" :rows-per-page="10">
        <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
          <button :disabled="isFirstPage" @click="prevPage">prev page</button>
          <button :disabled="isLastPage" @click="nextPage">next page</button>
        </template>
      </Vue3EasyDataTable>
    </div>
    <div v-else>
      <a href="http://localhost:8000/auth/redirect">Login with Twitch</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import type { Ref } from 'vue'
import useHttp from '@/http/useHttp'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import type { Header, Item } from "vue3-easy-data-table"

interface Streams {
  amountPerGame: object[]
  maxViewsPerGame: object[]
  avgViews: string
  oddViews: object[]
  evenViews: object[]
  top100: object[]
  sameViews: object[]
}
const streams: Ref<Streams | null> = shallowRef(null)
const headers: object = {
  amountPerGame: [
    { text: "Game name", value: "game_name" },
    { text: "Amount", value: "amount"}
  ],
  maxViewsPerGame: [
    { text: "Game name", value: "game_name" },
    { text: "User name", value: "user_name" },
    { text: "Viewer count", value: "viewer_count" },
  ],
  oddViews: [
    { text: "Game name", value: "game_name" },
    { text: "User name", value: "user_name" },
    { text: "Viewer count", value: "viewer_count" },
  ],
  evenViews: [
    { text: "Game name", value: "game_name" },
    { text: "User name", value: "user_name" },
    { text: "Viewer count", value: "viewer_count" },
  ],
  top100: [
    { text: "Game name", value: "game_name", sortable: true },
    { text: "User name", value: "user_name", sortable: true },
    { text: "Viewer count", value: "viewer_count", sortable: true },
  ],
  sameViews: [
    { text: "Game name", value: "game_name" },
    { text: "User name", value: "user_name" },
    { text: "Viewer count", value: "viewer_count" },
  ]
}

// https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch
onMounted(async () => {
  const http: any = useHttp()
  const { data } = await http.get('/streams')
  streams.value = data
})
</script>

<style>
.vue3-easy-data-table {
  width: 60%;
  margin: 0 auto 50px;
}

th .header {
  justify-content: center;
}
</style>
