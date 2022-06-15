<script lang="ts">
  import { Link } from "svelte-navigator"
  import Button from "../components/buttons/Button.svelte"
  import ArrowRightSvg from "../components/svg/ArrowRightSVG.svelte"
</script>

<section class="card_layout">
  <article class="card">
    <article class="card_left_side">
      <img
        src="src/assets/illustrations/events.svg"
        width="80%"
        alt="Calendar Illustration"
      />
    </article>
    <article>
      <h1>Let's plan!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac dui
        iaculis, condimentum sapien ac, interdum libero.
      </p>
      <Link to="/home" style="text-decoration: none">
        <Button type="button" CTA_Name="Get started">
          <ArrowRightSvg />
        </Button>
      </Link>
    </article>
  </article>
</section>

<style>
  p {
    margin-bottom: 2rem;
  }
</style>
