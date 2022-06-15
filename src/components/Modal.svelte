<script>
  export let close
</script>

<div on:click={close} class="modal">
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .modal {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    background-color: var(--white);
    width: 20em;
    max-height: 24em;
    padding: 0.5rem 2rem 2rem;
  }
</style>
