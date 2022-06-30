<script lang="ts">
  import { onMount } from "svelte"
  import { Link } from "svelte-navigator"
  import NextButton from "../components/buttons/NextButton.svelte"
  import PrevButton from "../components/buttons/PrevButton.svelte"
  import { formatDate } from "../helpers/formatDate"

  let event: Event
  let date: string
  let time: string
  let activity: string
  let users: string[] = []

  onMount(async () => {
    const response = await fetch("http://localhost:8080/api/events")
    if (response.ok) {
      const data = await response.json()
      event = data[data.length - 1]
      console.log("upcoming event:", event)
      date = formatDate(event.date.slice(0, 10))
      time = event.time
      activity = event.category
      users = event.users
        .filter((el) => el.selectedTime !== null)
        .map((el) => el.name)
      console.log("users", users)
    } else {
      console.error("There was an error!")
    }
  })
</script>

<section class="card_layout">
  <article class="card">
    <article class="card_left_side">
      <img
        src="src/assets/illustrations/announcement.svg"
        width="80%"
        alt="Announcement Illustration"
      />
    </article>
    <article>
      <h1>Event Announcement</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac dui
        iaculis, condimentum sapien ac, interdum libero.
      </p>
      <p>This is the next upcoming event:</p>
      <div class="table">
        <div class="header">When?</div>
        <div>{date}</div>
        <div class="header">Time?</div>
        <div>{time === "night" ? "At" : "In the"} {time}</div>
        <div class="header">What?</div>
        <div>{activity}</div>
        <div class="header">Who?</div>
        <div>{users.join(", ")}</div>
      </div>

      <Link to="/home" style="text-decoration: none">
        <PrevButton CTA_Next_Page="Home" />
      </Link>
      <Link to="/" style="text-decoration: none">
        <NextButton CTA_Next_Page="Intro" />
      </Link>
    </article>
  </article>
</section>

<style>
  p {
    margin-bottom: 1rem;
  }

  .table {
    display: grid;
    grid-template-columns: 5rem 1fr;
  }

  .header {
    font-weight: bold;
  }
</style>
