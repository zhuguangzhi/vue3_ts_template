<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {ref} from "vue";
const vitePort = ref(import.meta.env.VITE_PORT);
console.log('vitePort',vitePort)
</script>

<template>
  <router-view/>
</template>

