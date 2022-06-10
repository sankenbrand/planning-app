<script>
  export let CTA_Name
  export let type
</script>

<button {type} class="btn-primary">
  {CTA_Name}
  <slot />
</button>

<style>
  .btn-primary {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    min-width: 10rem;
    border-radius: 0.5rem;
    background-color: #3a54aa;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    padding: 0.5rem 0;
  }
</style>
