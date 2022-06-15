<script>
  export let type
</script>

<button {type} class="btn-primary">
  <slot />
</button>

<style>
  .btn-primary {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    background-color: var(--primary-color);
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    padding: 0.5rem;
  }
</style>
