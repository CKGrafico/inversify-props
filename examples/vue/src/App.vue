<script setup lang="ts">
import { ref } from 'vue';
import { cid, container } from 'inversify-props';
import type { IGreeterService } from './services';

// Resolve a service from the container. GreeterService itself @inject()s
// another service (NameService) — see src/services.
const greeter = container.get<IGreeterService>(cid.IGreeterService);
const message = ref('');
</script>

<template>
  <main>
    <h1>inversify-props + Vue 3</h1>
    <p>The button resolves a service from the container that injects another service via <code>@inject()</code>.</p>
    <button @click="message = greeter.greet()">greet()</button>
    <p v-if="message">Result: {{ message }}</p>
  </main>
</template>
