<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import ErrorCircleSvg from "../svg/ErrorCircleSvg.svelte"

  export let Error_Message: string
</script>

<div class="container" in:fly={{ y: -200, duration: 2000 }} out:fade>
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
    position: absolute;
    z-index: 200;
  }

  .error_alert {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 21rem;
    background-color: var(--white);
    border-left: 5px solid var(--error);
    border-radius: 0.25rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    overflow: hidden;
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
