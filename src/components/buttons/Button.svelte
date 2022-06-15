<script>
  export let CTA_Name
  export let type
  export let disabled
</script>

<button {type} {disabled} class="btn-primary">
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
    background-color: var(--primary-color);
    color: var(--white);
    /*  font-weight: bold; */
    font-size: 1rem;
    border: none;
    padding: 0.5rem 0;
  }
</style>
