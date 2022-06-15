<script>
  export let CTA_Next_Page
</script>

<div type="button" class="link_next">
  {CTA_Next_Page}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="20"
    height="20"
  >
    <path
      fill-rule="evenodd"
      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
      clip-rule="evenodd"
    />
  </svg>
</div>

<style>
  .link_next {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 7rem;
    color: var(--white);
    position: absolute;
    top: 3%;
    right: 1%;
  }
</style>
