<script lang="ts">
  export let livestreamId: number;

  // Mock data - replace with actual API call
  const livestream = {
    id: livestreamId,
    title: 'Livestream Title',
    date: '2023-05-15',
    status: 'Scheduled',
    shareUrl: 'https://example.com/livestream/123',
  };

  function deleteLivestream() {
    if (confirm('Are you sure you want to delete this livestream?')) {
      // Implement delete logic here
      alert('Livestream deleted');
    }
  }
</script>

<div class="card">
  <h2>{livestream.title}</h2>
  <p>Date: {livestream.date}</p>
  <p>Status: {livestream.status}</p>
  <p>Share URL: <a href={livestream.shareUrl}>{livestream.shareUrl}</a></p>
  <div class="button-container">
    <button class="primary-button" on:click={() => alert('Edit livestream')}>
      Edit Livestream
    </button>
    <button class="danger-button" on:click={deleteLivestream}>
      Delete Livestream
    </button>
  </div>
</div>

<style lang="scss">
  @import '../../styles//styles.scss';

 .card {
    @include card;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: $text-color;
    }

    p {
      margin-bottom: 0.5rem;
      color: $text-color-secondary;
    }

    a {
      color: $secondary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .primary-button {
    @include button($primary-color, $background-color);
  }

  .danger-button {
    @include button($danger-color, $background-color);
  }
</style>