<script lang="ts">
  import LivestreamCard from "./LivestreamCard.svelte";
  export let type: 'upcoming' | 'past';
  export let projectId: string;

  // Mock data - replace with actual API calls
  const livestreams = [
    { id: 1, title: 'Livestream 1', date: '2023-05-15', status: 'Scheduled' },
    { id: 2, title: 'Livestream 2', date: '2023-05-20', status: 'Live' },
    { id: 3, title: 'Livestream 3', date: '2023-05-25', status: 'Ended' },
  ];
</script>

<div class="grid">
  {#each livestreams as livestream}
    <LivestreamCard {livestream} {type} />
  {/each}
</div>