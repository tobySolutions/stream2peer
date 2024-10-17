<script lang="ts">
  import { page } from '$app/stores';
  import LivestreamDetails from '$lib/components/LivestreamDetails.svelte';

  const livestreamId = parseInt($page.params.livestreamId);
</script>

<div class="container">
  <LivestreamDetails {livestreamId} />
</div>