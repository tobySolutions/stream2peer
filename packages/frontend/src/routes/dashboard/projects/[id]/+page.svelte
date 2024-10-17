<script lang="ts">
  import { page } from '$app/stores';
  import LivestreamList from "../../../../lib/components/LivestreamList.svelte";

  let activeTab = 'upcoming';

  const projectId = $page.params.id;
</script>

<div class="container">
  <h1>Project {projectId}</h1>

  <div class="button-container">
    <button class="primary-button" on:click={() => alert('Schedule new livestream')}>
      Schedule New Livestream
    </button>
  </div>

  <div class="tabs">
    <button
      class:active={activeTab === 'upcoming'}
      on:click={() => activeTab = 'upcoming'}
    >
      Upcoming Livestreams
    </button>
    <button
      class:active={activeTab === 'past'}
      on:click={() => activeTab = 'past'}
    >
      Past Livestreams
    </button>
  </div>

  {#if activeTab === 'upcoming'}
    <LivestreamList type="upcoming" {projectId} />
  {:else}
    <LivestreamList type="past" {projectId} />
  {/if}
</div>

<style lang="scss">
  @import '../../../../styles/styles.scss';

 h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  .button-container {
    margin-bottom: 1rem;
  }

  .primary-button {
    @include button($primary-color);
  }

  .tabs {
    display: flex;
    margin-bottom: 1rem;

    button {
      padding: 0.5rem 1rem;
      background-color: $surface-color;
      color: $text-color;
      border: 1px solid $border-color;
      cursor: pointer;

      &.active {
        background-color: $hover-color;
      }

      &:first-child {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }

      &:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }
    }
  }
</style>