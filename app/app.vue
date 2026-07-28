<script setup lang="ts">
const description = 'Tracking of who backs emerging AI standards and open letters: open weights, AGENTS.md, Agent Skills, and more.';
useSeoMeta({ description });
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2 font-bold">
          <UIcon
            name="i-lucide-vote"
            class="size-5 text-primary"
          />
          AI Consensus Tracker
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
        <UButton variant="ghost" to="http://github.com/typed-sigterm/ai-consensus" target="_blank" icon="i-logos-github-icon" />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <div class="text-muted text-sm flex not-lg:flex-col justify-between px-4 lg:px-12 pb-4">
      <p>
        &copy; 2026-present
        <ULink active href="https://typed-sigterm.me/?utm_source=ai-consensus.by-ts.top&utm_medium=footer" target="_blank">
          Typed SIGTERM
        </ULink>
      </p>
      <p>
        Trademarks are the property of their respective owners.
      </p>
    </div>
  </UApp>
</template>
