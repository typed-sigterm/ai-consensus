<script setup lang="ts">
import type { TrackData } from '~/utils/tracks';

const props = defineProps<{
  track: TrackData
  compact?: boolean
}>();

const yes = ref(0), no = ref(0), pct = ref(Number.NaN);
watch(() => props.track, () => {
  for (const p of Object.entries(props.track.participants)) {
    if (p[1])
      yes.value++;
    else
      no.value++;
  }
  pct.value = yes.value / (yes.value + no.value) * 100;
}, { immediate: true });
</script>

<template>
  <div>
    <div class="flex items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-primary">
          {{ track.yesLabel }}
        </p>
        <p
          class="font-black tabular-nums"
          :class="compact ? 'text-3xl' : 'text-5xl sm:text-6xl'"
        >
          {{ yes }}
        </p>
      </div>

      <div class="text-right">
        <p class="text-xs font-semibold uppercase tracking-widest text-amber-500">
          {{ track.noLabel }}
        </p>
        <p
          class="font-black tabular-nums"
          :class="compact ? 'text-3xl' : 'text-5xl sm:text-6xl'"
        >
          {{ no }}
        </p>
      </div>
    </div>

    <div
      class="relative mt-3 overflow-hidden rounded-full bg-amber-400/90"
      :class="compact ? 'h-2.5' : 'h-4'"
    >
      <div
        class="h-full bg-primary transition-[width] duration-700"
        :style="{ width: `${pct}%` }"
      />
      <div
        class="absolute inset-y-0 left-1/2 w-0.5 bg-white dark:bg-neutral-900"
        title="50% majority"
      />
    </div>

    <div class="mt-2 flex justify-between text-sm font-semibold tabular-nums">
      <span class="text-primary">{{ pct.toFixed(1) }}%</span>
      <span class="text-amber-500">{{ (100 - pct).toFixed(1) }}%</span>
    </div>
  </div>
</template>
