<script lang="ts">
  import ErrorCircleSvg from "../svg/ErrorCircleSvg.svelte"
  export let Error_Message: string
</script>

<div class="container">
  <section class="error_alert">
    <ErrorCircleSvg />
    <div class="error_text">
      <span>Error!</span>
      <span class="error_description">{Error_Message}</span>
    </div>
  </section>
</div>

<style>
  .container {
    display: flex;
    justify-content: flex-end;
  }

  .error_alert {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 21rem;
    background-color: var(--white);
    border-left: 5px solid var(--error);
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    overflow: hidden;
    z-index: 50;
    position: relative;
  }

  .error_text {
    display: flex;
    flex-direction: column;
  }

  .error_description {
    font-size: 0.85rem;
    font-weight: normal;
  }
</style>
