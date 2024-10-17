<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let livestream: { id: number; title: string; date: string; status: string };
  export let type: 'upcoming' | 'past';

  const dispatch = createEventDispatcher();

  function viewDetails() {
    dispatch('view', livestream.id);
  }
</script>

<div class="card">
  <h3>{livestream.title}</h3>
  <p>Date: {livestream.date}</p>
  <p>Status: {livestream.status}</p>
  <button class="primary-button" on:click={viewDetails}>
    View Details
  </button>
</div>

<style lang="scss">
  @import '../../styles/styles.scss';

 .card {
    @include card;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: $text-color;
    }

    p {
      color: $text-color-secondary;
      margin-bottom: 0.5rem;
    }
  }

  .primary-button {
    @include button($primary-color, $background-color);
  }
</style>