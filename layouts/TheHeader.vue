<template>
  <header class="fixed top-0 left-0 w-full h-16 bg-surface border-b border-border z-50">
    <div class="container mx-auto flex items-center justify-between h-full px-md max-w-app">
      <div class="w-1/3">
        <NuxtLink to="/" class="flex items-baseline gap-sm font-semibold text-text-main">
          <span class="text-xl">🛡️</span>
          <span>Insurance Wizard</span>
        </NuxtLink>
      </div>

      <div class="w-1/3">
        <div class="flex items-center gap-sm">
          <div v-if="isInsuranceWizard" class="shrink-0">{{ currentStep }} / {{ totalSteps }}</div>
          <UProgress
            v-if="currentStep"
            v-model="progress"
            class="flex-1"
            color="primary"
            size="sm"
            animation="none"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const route = useRoute();

const isInsuranceWizard = computed(() => route.path.startsWith('/insurance'));

const currentStep = computed(() => route.meta.step || null);

const totalSteps = computed(() => route.meta.totalSteps || null);

const progress = computed(() => {
  if (!currentStep.value) return 0;
  return (currentStep.value / totalSteps.value) * 100;
});
</script>
