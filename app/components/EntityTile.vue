<script setup lang="ts">
import type { Entity } from '#shared/utils/data';

defineProps<{
  entry: Entity
  yes: boolean
  yesLabel: string
  noLabel: string
}>();
</script>

<template>
  <ULink
    :href="entry.url"
    :target="entry.url ? '_blank' : undefined"
    :title="`${entry.name}: ${yes ? yesLabel : noLabel}`"
    class="aspect-video rounded-lg transition"
    :class="[
      entry.url && 'hover:scale-[1.03] hover:shadow-md',
      entry.logo
        ? 'overflow-hidden bg-white'
        : 'flex flex-col items-center justify-center px-2',
      yes
        ? 'ring ring-primary/40 bg-primary/5'
        : 'border border-dashed border-accented bg-elevated/50',
    ]"
  >
    <img
      v-if="entry.logo"
      :src="entry.logo"
      :alt="entry.name"
      loading="lazy"
      class="size-full object-cover"
      :class="!yes && 'grayscale opacity-60'"
    >
    <template v-else>
      <span
        class="text-center text-xl"
        :class="yes ? 'text-highlighted' : 'text-muted'"
      >{{ entry.name }}</span>
      <span
        v-if="entry.by"
        class="mt-0.5 text-center text-xs text-dimmed"
      >by {{ entry.by }}</span>
    </template>
  </ULink>
</template>
