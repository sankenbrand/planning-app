<script lang="ts">
  import { Link, useNavigate } from "svelte-navigator"
  import Button from "../components/buttons/Button.svelte"
  import NextButton from "../components/buttons/NextButton.svelte"
  import PrevButton from "../components/buttons/PrevButton.svelte"
  import CategoryList from "../components/CategoryList.svelte"
  import Greeting from "../components/Greeting.svelte"
  import Modal from "../components/Modal.svelte"
  import CogSvg from "../components/svg/CogSvg.svelte"
  import ShareSvg from "../components/svg/ShareSvg.svelte"
  import { formatDate, getUTCDate } from "../helpers/formatDate"
  import { selectedDate } from "../stores/selectedDate"

  const navigate = useNavigate()
  const utc = getUTCDate($selectedDate)

  let disabled = true
  let showModal = false

  const open = () => {
    showModal = true
  }

  const close = () => {
    showModal = false
  }

  const addEvent = async (utc: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: utc,
        }),
      })

      if (res.ok && res.status == 200) {
        const data = await res.json()
        console.log(data)
        return data
      }
    } catch (error) {
      console.error("There was an error!", error)
    }
  }

  const handleSubmit = () => {
    if ($selectedDate !== "") {
      disabled = false
      console.group("🌟 POST event form")
      console.log("date: " + utc)
      console.groupEnd()
      addEvent($selectedDate).then(() => {
        navigate("/user-form")
      })
      disabled = true
    } else {
      console.log("Invalid form")
    }
  }
</script>

<section class="card_layout">
  <article class="card">
    <article class="card_left_side">
      <img
        src="src/assets/illustrations/datePicker.svg"
        width="80%"
        alt="Date Picker Illustration"
      />
    </article>
    <article>
      <Greeting />
      <p>
        Please select a date to start planning the next event with your friends.
      </p>
      <form on:submit|preventDefault={handleSubmit}>
        <label>
          <input type="date" bind:value={$selectedDate} />
        </label>

        <p class="home_category_settings">
          Do you want to change the category list? <span
            class="icon"
            type="button"
            on:click={open}
          >
            <CogSvg />
          </span>
        </p>

        <p style="margin-bottom: 2rem">
          Start survey for: {formatDate($selectedDate)}
        </p>

        <Button type="submit" disabled={!disabled} CTA_Name="Share">
          <ShareSvg />
        </Button>
      </form>

      <Link to="/" style="text-decoration: none">
        <PrevButton CTA_Next_Page="Intro" />
      </Link>
      <Link to="/overview" style="text-decoration: none">
        <NextButton CTA_Next_Page="Overview" />
      </Link>
    </article>
  </article>
</section>

{#if showModal}
  <Modal {close}>
    <CategoryList {close} />
  </Modal>
{/if}

<style>
  input {
    padding: 0.25rem;
  }

  .home_category_settings {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icon {
    margin-top: 0.5rem;
  }
</style>
