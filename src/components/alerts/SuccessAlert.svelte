<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import CheckCircleSvg from "../svg/CheckCircleSvg.svelte"

  export let Success_Message: string
</script>

<div class="container" in:fly={{ y: -200, duration: 2000 }} out:fade>
  <section class="success_alert">
    <CheckCircleSvg />
    <div class="success_text">
      <span>Success!</span>
      <span class="success_description">{Success_Message}</span>
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

  .success_alert {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 21rem;
    background-color: var(--white);
    border-left: 5px solid var(--success);
    border-radius: 0.25rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    overflow: hidden;
  }

  .success_text {
    display: flex;
    flex-direction: column;
  }

  .success_description {
    font-size: 0.85rem;
    font-weight: normal;
  }
</style>
