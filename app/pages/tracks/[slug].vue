<script setup lang="ts">
import { tracks } from '~/utils/tracks';

const route = useRoute();
if (typeof route.params.slug !== 'string')
  throw createError({ statusCode: 404, statusMessage: 'Tracker not found', fatal: true });
const track = tracks[route.params.slug];
if (!track)
  throw createError({ statusCode: 404, statusMessage: 'Tracker not found', fatal: true });

useHead({ title: `${track.title} · AI Consensus Tracker` });
</script>

<template>
  <UContainer class="max-w-4xl py-12 sm:py-16">
    <header class="text-center">
      <UButton
        to="/"
        label="All tracks"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="ghost"
        size="xs"
      />
      <h1 class="mt-4 text-3xl sm:text-4xl font-black text-balance">
        {{ track.title }}
      </h1>
      <p class="mt-3 text-muted">
        {{ track.description }}
      </p>
      <ULink :to="track.source" target="_blank" active>
        <UIcon name="i-lucide-external-link" class="align-text-top" />
        Source
      </ULink>
    </header>

    <PollBar
      :track
      :yes-label="track.yesLabel"
      :no-label="track.noLabel"
      class="mt-12"
    />

    <section class="mt-14">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold">
          The map
        </h2>
        <div class="flex gap-4 text-xs text-muted">
          <span class="flex items-center gap-1.5">
            <span class="size-2.5 rounded-full bg-primary" /> {{ track.yesLabel }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="size-2.5 rounded-full bg-inverted/50" /> {{ track.noLabel }}
          </span>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <EntityTile
          v-for="(yes, name) in track.participants"
          :key="name"
          :entry="track.subject === 'companies' ? companies.get(name)! : products.get(name)!"
          :yes
          :yes-label="track.yesLabel"
          :no-label="track.noLabel"
        />
      </div>
    </section>
  </UContainer>
</template>
