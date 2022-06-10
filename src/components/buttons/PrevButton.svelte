<script>
  export let CTA_Next_Page
</script>

<div type="button" class="link_prev">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="20"
    height="20"
  >
    <path
      fill-rule="evenodd"
      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
      clip-rule="evenodd"
    />
  </svg>
  {CTA_Next_Page}
</div>

<style>
  .link_prev {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 7rem;
    color: #fff;
    position: absolute;
    top: 3%;
    left: 0;
  }
</style>
