<script setup lang="ts">
import { tracks } from '~/utils/tracks';
</script>

<template>
  <UContainer class="max-w-4xl py-12 sm:py-16">
    <header class="text-center">
      <h1 class="text-3xl sm:text-4xl font-black text-balance">
        Where does the AI industry stand?
      </h1>
      <p class="mt-3 text-muted">
        Tracking of who backs emerging AI standards and open letters.
      </p>
    </header>

    <div class="mt-12 space-y-6">
      <UCard v-for="(track, slug) in tracks" :key="slug">
        <div class="flex items-start justify-between gap-4">
          <div>
            <ULink :to="`/tracks/${slug}`" class="text-lg font-bold text-default">
              {{ track.title }}
            </ULink>
            <p class="mt-1 text-sm text-muted">
              {{ track.description }}
            </p>
          </div>
          <UButton
            :to="`/tracks/${slug}`"
            label="View map"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            variant="subtle"
            size="sm"
            class="shrink-0"
          />
        </div>

        <PollBar
          :track
          compact
          class="mt-6"
        />
      </UCard>
    </div>
  </UContainer>
</template>
