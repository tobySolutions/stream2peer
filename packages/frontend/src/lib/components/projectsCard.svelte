<script lang="ts">
  export let project: { id: number; name: string; description: string };
</script>

<a href="/dashboard/projects/{project.id}" class="card">
  <h2>{project.name}</h2>
  <p>{project.description}</p>
</a>

<style lang="scss">
  .card {
    display: block;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
    }
  }
</style>