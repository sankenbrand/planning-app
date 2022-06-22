<script lang="ts">
  import { onMount } from "svelte"
  import { Link } from "svelte-navigator"
  import ErrorAlert from "../components/alerts/ErrorAlert.svelte"
  import SuccessAlert from "../components/alerts/SuccessAlert.svelte"
  import Button from "../components/buttons/Button.svelte"
  import NextButton from "../components/buttons/NextButton.svelte"
  import PrevButton from "../components/buttons/PrevButton.svelte"
  import { formatDate, getUTCDate } from "../helpers/formatDate"
  import { isFormValid } from "../lib/Validation"

  let name = ""
  let selectedCategory = ""
  let categoryOptions: string[]
  let selectedTime = ""

  let events: Event[]
  let event: Event
  let date: string

  let isSubmitting = false
  let isError = false

  function onChange(event: { currentTarget: { value: string } }) {
    selectedTime = event.currentTarget.value
  }

  onMount(async () => {
    const response = await fetch("http://localhost:8080/api/events")

    if (response.ok) {
      console.group("🌈 fetch events")
      const data = await response.json()
      events = data
      console.log("all events", events)
      event = events[events.length - 1]
      console.log("upcoming event", event)
      date = formatDate(event.date.slice(0, 10))
      console.log("event date", date)
    } else {
      console.error("There was an error!")
    }
    console.groupEnd()
  })

  onMount(async () => {
    const response = await fetch("http://localhost:8080/api/categories")
    if (response.ok) {
      const data = await response.json()
      categoryOptions = data.map((el: Category) => el.categoryName)
    } else {
      console.error("There was an error!")
    }
  })

  const addUser = async (
    name: string,
    date: string,
    selectedCategory: string,
    selectedTime: string
  ) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/events/${event.id}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            date: date,
            category: selectedCategory,
            preferredTime: selectedTime,
          }),
        }
      )

      if (res.ok && res.status == 200) {
        const data = await res.json()
        console.log(data)
        return data
      }
    } catch (error) {
      console.error("There was an error!", error)
    }
  }

  const resetForm = () => {
    name = ""
    selectedCategory = ""
    selectedTime = ""
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (isFormValid(name, selectedCategory, selectedTime)) {
      addUser(name, getUTCDate(event.date), selectedCategory, selectedTime)
      console.group("🌟 POST user form")
      console.log("name: " + name)
      console.log("date: " + event.date)
      console.log("category: " + selectedCategory)
      console.log("preferredTime: " + selectedTime)
      console.groupEnd()
      isSubmitting = true
      setTimeout(() => {
        isSubmitting = false
      }, 5000)
      isError = false
      resetForm()
    } else {
      console.log("❗ Invalid form")
      isError = true
      setTimeout(() => {
        isError = false
      }, 5000)
    }
  }
</script>

{#if isSubmitting}
  <SuccessAlert Success_Message="You have submitted your information" />
{/if}
{#if isError}
  <ErrorAlert Error_Message="All fields are required" />
{/if}
<section class="card_layout">
  <article class="card">
    <article class="card_left_side">
      <img
        src="src/assets/illustrations/booking.svg"
        width="80%"
        alt="Booking Illustration"
      />
    </article>
    <article>
      <h1>Survey: {date}</h1>
      <p>Please fill out the following form.</p>
      <form class="task-form" on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <label for="name" class="label">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Type your name"
            bind:value={name}
          />
        </div>
        <div class="form-group">
          <label for="selectedCategory" class="label">Category</label>
          <select bind:value={selectedCategory}>
            {#if categoryOptions === undefined}
              Loading category options...
            {:else}
              {#each categoryOptions as value}<option {value}>{value}</option
                >{/each}
            {/if}
          </select>
        </div>

        <div class="form-group">
          <label for="selectedTime" class="label">Preferred time</label>
          <div>
            <label>
              <input
                on:change={onChange}
                type="radio"
                name="preferredTime"
                value="afternoon"
              />
              Afternoon
            </label>

            <label>
              <input
                on:change={onChange}
                type="radio"
                name="preferredTime"
                value="evening"
              />
              Evening
            </label>

            <label>
              <input
                on:change={onChange}
                type="radio"
                name="preferredTime"
                value="night"
              />
              Night
            </label>
          </div>
        </div>

        <div class="btn-container">
          <Button type="submit" disabled={isError} CTA_Name="Submit" />
        </div>
      </form>

      <Link to="/home" style="text-decoration: none">
        <PrevButton CTA_Next_Page="Home" />
      </Link>
      <Link to="/overview" style="text-decoration: none">
        <NextButton CTA_Next_Page="Overview" />
      </Link>
    </article>
  </article>
</section>

<style>
  input,
  select {
    padding: 0.45rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .label {
    font-weight: bold;
    /*   margin-bottom: 0.25rem; */
  }

  .btn-container {
    display: flex;
    justify-content: center;
  }
</style>
