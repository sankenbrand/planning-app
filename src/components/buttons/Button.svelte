<script lang="ts">
  export let buttonClass: string = "btn-primary"
  export let CTA_Name: string
  export let type: string
  export let disabled: boolean = false
</script>

<button {type} {disabled} class={buttonClass}>
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
    font-size: 1rem;
    border: none;
    padding: 0.5rem 0;
  }
</style>
