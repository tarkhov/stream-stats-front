<template>
  <p>You are logging in, please wait.</p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@websanova/vue-auth'
import { useRouter } from 'vue-router'

onMounted(() => {
  console.log('onMounted')
  const params = (new URL(window.document.location.href)).searchParams
  const token = params.get('token')
  console.log('token', token)
  if (token) {
    const auth = useAuth()
    auth.token('auth_token_default', token, false)
    const router = useRouter()
    router.push({ name: 'home' })
  }
  /*try {
    await auth.fetch()
    console.log('auth.user', auth.user())
  } catch (e) {
    console.log(e)
  }*/
})
</script>
