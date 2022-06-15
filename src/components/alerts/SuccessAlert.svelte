<script lang="ts">
  import CheckCircleSvg from "../svg/CheckCircleSvg.svelte"
  export let Success_Message: string
</script>

<div class="container">
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
  }

  .success_alert {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 21rem;
    background-color: var(--white);
    border-left: 5px solid var(--success);
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    overflow: hidden;
    z-index: 50;
    position: relative;
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
