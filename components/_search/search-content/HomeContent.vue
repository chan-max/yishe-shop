<template>
  <div class="home-content">
    <div class="home-placeholder">
      <div class="placeholder-content">
        <v-icon class="placeholder-icon" size="64" color="var(--text-tertiary)">
          mdi-home-outline
        </v-icon>
        <h2 class="placeholder-title">Welcome Home</h2>
        <p class="placeholder-description">
          This is the home page content. You can add your dashboard, statistics, or any other home-related content here.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home content component
// Add your home page logic here
</script>

<style scoped>
.home-content {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-placeholder {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}

.placeholder-content {
  .placeholder-icon {
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }
  
  .placeholder-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  .placeholder-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}
</style>
