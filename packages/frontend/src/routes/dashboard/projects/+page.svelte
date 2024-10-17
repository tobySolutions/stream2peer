<script>
    import "../styles/dashboard.scss"
    import ProjectsCard from "$lib/components/projectsCard.svelte";

      const projects = [
    { id: 1, name: 'Project A', description: 'Description for Project A' },
    { id: 2, name: 'Project B', description: 'Description for Project B' },
    { id: 3, name: 'Project C', description: 'Description for Project C' },
  ];
</script>

<div class="dashboard-header">
    <div>
        <p class="header-text">Projects</p>
        <p class="header-subtext">Manage Your Projects</p>
    </div>
    <div class="project-btn">
        <button>
        Add new project
        </button>
    </div>
   
</div>

<div class="grid">
    {#each projects as project}
      <ProjectsCard {project} />
    {/each}
  </div>



<style lang="scss">
    .project-btn {
        button {
            padding: 5px 10px;
            border-radius: 6px;
            cursor: pointer;
            background-color: #a7a6a6;
            color: black;
        }

    }
</style>