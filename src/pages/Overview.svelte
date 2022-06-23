<script lang="ts">
  import { onMount } from "svelte"
  import { Link, useNavigate } from "svelte-navigator"
  import ErrorAlert from "../components/alerts/ErrorAlert.svelte"
  import Button from "../components/buttons/Button.svelte"
  import NextButton from "../components/buttons/NextButton.svelte"
  import PrevButton from "../components/buttons/PrevButton.svelte"
  import { formatDate } from "../helpers/formatDate"
  import { getLastEl } from "../helpers/handleArr"
  import { modifyData } from "../helpers/modifyData"
  import { isRequiredFieldValidCheck } from "../lib/Validation"

  const navigate = useNavigate()

  let events: Event[] = []
  let event: Event
  let categories: string[] = []

  let users: User[] = []

  let selected = ""
  let selectedCategory = ""
  let selectedTime = ""
  let registeredUsers: User[] = []

  let isError = false

  let table: Event[] = []
  let firstField1x1: Event
  let firstField1x2: Event
  let firstField1x3: Event
  let secondField2x1: Event
  let secondField2x2: Event
  let secondField2x3: Event
  let thirdField3x1: Event
  let thirdField3x2: Event
  let thirdField3x3: Event

  let eveningGroup: User[] = []
  let afternoonGroup: User[] = []
  let nightGroup: User[] = []

  let firstCategoryAfternoonGroup: User[] = []
  let firstCategoryEveningGroup: User[] = []
  let firstCategoryNightGroup: User[] = []

  let secondCategoryAfternoonGroup: User[] = []
  let secondCategoryEveningGroup: User[] = []
  let secondCategoryNightGroup: User[] = []

  let thirdCategoryAfternoonGroup: User[] = []
  let thirdCategoryEveningGroup: User[] = []
  let thirdCategoryNightGroup: User[] = []

  onMount(async () => {
    const response = await fetch("http://localhost:8080/api/events")
    if (response.ok) {
      const data = await response.json()
      console.group("🎭 events")
      console.table(data)
      events = data.map((el: Event) => formatDate(el.date.slice(0, 10)))
      event = data[data.length - 1]
      console.log("upcoming event:", event)
      users = event.users
      console.log("registered users for upcoming event:", users)
      tableMatrix(users)
      console.groupEnd()
    } else {
      console.error("There was an error!")
    }
  })

  onMount(async () => {
    const response = await fetch("http://localhost:8080/api/categories")
    if (response.ok) {
      const data = await response.json()
      categories = data.map((el: Category) => el.categoryName)
    } else {
      console.error("There was an error!")
    }
  })

  let tableMatrix = (data: User[]) => {
    // ################################################
    // group allocation: afternoon, evening, night
    // ################################################
    console.group("🌺 group allocation")
    afternoonGroup = data.filter((el: User) => el.preferredTime === "afternoon")
    if (afternoonGroup.length > 0) {
      console.log("🌞 afternoonGroup", afternoonGroup)
    }
    eveningGroup = data.filter((el: User) => el.preferredTime === "evening")
    if (eveningGroup.length > 0) {
      console.log("🌙 eveningGroup", eveningGroup)
    }
    nightGroup = data.filter((el: User) => el.preferredTime === "night")
    if (nightGroup.length > 0) {
      console.log("⭐ nightGroup", nightGroup)
    }
    console.groupEnd()
  }

  $: {
    console.group("🌼 categories x groups")
    // ################################################
    // 1. category x group
    // ################################################
    firstCategoryAfternoonGroup = afternoonGroup.filter(
      (el: User) => el.category === categories[0]
    )
    if (firstCategoryAfternoonGroup.length > 0) {
      console.log("1️⃣ x 🌞", firstCategoryAfternoonGroup)
    }

    firstCategoryEveningGroup = eveningGroup.filter(
      (el: User) => el.category === categories[0]
    )
    if (firstCategoryEveningGroup.length > 0) {
      console.log("1️⃣ x 🌙", firstCategoryEveningGroup)
    }
    firstCategoryNightGroup = nightGroup.filter(
      (el: User) => el.category === categories[0]
    )
    if (firstCategoryNightGroup.length > 0) {
      console.log("1️⃣ x ⭐", firstCategoryNightGroup)
    }
    // ################################################
    // 2. category x group
    // ################################################
    secondCategoryAfternoonGroup = afternoonGroup.filter(
      (el: User) => el.category === categories[1]
    )
    if (secondCategoryAfternoonGroup.length > 0) {
      console.log("2️⃣ x 🌞", secondCategoryAfternoonGroup)
    }
    secondCategoryEveningGroup = eveningGroup.filter(
      (el: User) => el.category === categories[1]
    )
    if (secondCategoryEveningGroup.length > 0) {
      console.log("2️⃣ x 🌙", secondCategoryEveningGroup)
    }
    secondCategoryNightGroup = nightGroup.filter(
      (el: User) => el.category === categories[1]
    )
    if (secondCategoryNightGroup.length > 0) {
      console.log("2️⃣ x ⭐", secondCategoryNightGroup)
    }
    // ################################################
    // 3. category x group
    // ################################################
    thirdCategoryAfternoonGroup = afternoonGroup.filter(
      (el: User) => el.category === categories[2]
    )
    if (thirdCategoryAfternoonGroup.length > 0) {
      console.log("3️⃣ x 🌞", thirdCategoryAfternoonGroup)
    }
    thirdCategoryEveningGroup = eveningGroup.filter(
      (el: User) => el.category === categories[2]
    )
    if (thirdCategoryEveningGroup.length > 0) {
      console.log("3️⃣ x 🌙", thirdCategoryEveningGroup)
    }
    thirdCategoryNightGroup = nightGroup.filter(
      (el: User) => el.category === categories[2]
    )
    if (thirdCategoryNightGroup.length > 0) {
      console.log("3️⃣ x ⭐", thirdCategoryNightGroup)
    }
    console.groupEnd()
  }

  const saveUser = (registeredUsers: User[], selectedTime: string) => {
    const promises = []

    registeredUsers.forEach((el: User) => {
      const url = `http://localhost:8080/api/users/${el.id}`
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedTime: selectedTime,
        }),
      }

      const promise = fetch(url, options).then((res) => res.json())
      promises.push(promise)
      console.log("user promises", promises)
    })

    return Promise.all(promises)
  }

  const saveEvent = async (selectedCategory: string, selectedTime: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          time: selectedTime,
        }),
      })

      if (res.ok && res.status == 200) {
        const data = await res.json()
        console.log("Saved event successfully!", data)
      }
    } catch (error) {
      console.error("There was an error!", error)
    }
  }

  $: {
    let isSelected = false
    let isDisabled = false

    firstField1x1 = modifyData(
      1,
      categories[0],
      "afternoon",
      firstCategoryAfternoonGroup,
      isSelected,
      isDisabled
    )
    firstField1x2 = modifyData(
      2,
      categories[0],
      "evening",
      firstCategoryEveningGroup,
      isSelected,
      isDisabled
    )
    firstField1x3 = modifyData(
      3,
      categories[0],
      "night",
      firstCategoryNightGroup,
      isSelected,
      isDisabled
    )
    // ################################################
    secondField2x1 = modifyData(
      4,
      categories[1],
      "afternoon",
      secondCategoryAfternoonGroup,
      isSelected,
      isDisabled
    )
    secondField2x2 = modifyData(
      5,
      categories[1],
      "evening",
      secondCategoryEveningGroup,
      isSelected,
      isDisabled
    )
    secondField2x3 = modifyData(
      6,
      categories[1],
      "night",
      secondCategoryNightGroup,
      isSelected,
      isDisabled
    )
    // ################################################
    thirdField3x1 = modifyData(
      7,
      categories[2],
      "afternoon",
      thirdCategoryAfternoonGroup,
      isSelected,
      isDisabled
    )
    thirdField3x2 = modifyData(
      8,
      categories[2],
      "evening",
      thirdCategoryEveningGroup,
      isSelected,
      isDisabled
    )
    thirdField3x3 = modifyData(
      9,
      categories[2],
      "night",
      thirdCategoryNightGroup,
      isSelected,
      isDisabled
    )

    table.push(
      firstField1x1,
      firstField1x2,
      firstField1x3,
      secondField2x1,
      secondField2x2,
      secondField2x3,
      thirdField3x1,
      thirdField3x2,
      thirdField3x3
    )

    if (selected.length > 0) {
      table.map((el) => {
        if (el.id === +selected[0]) {
          selectedCategory = el.category
          selectedTime = el.time
          registeredUsers = el.users

          el.selected = !isSelected
          el.disabled = isDisabled
        } else {
          el.disabled = !isDisabled
        }
      })
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (
      isRequiredFieldValidCheck(selectedCategory) &&
      isRequiredFieldValidCheck(selectedTime) &&
      registeredUsers.length > 1
    ) {
      saveEvent(selectedCategory, selectedTime)
      saveUser(registeredUsers, selectedTime).then(() => {
        navigate("/events")
      })
      console.group("🌟 PUT save event")
      console.log("selected event:", selected)
      console.groupEnd()
    } else {
      console.log("❗ Invalid form")
      isError = true
      setTimeout(() => {
        isError = false
      }, 5000)
    }
  }
</script>

{#if isError}
  <ErrorAlert Error_Message="You haven't selected a get-together event" />
{/if}
<section class="card_layout">
  <article class="card">
    <div>
      <form on:submit|preventDefault={handleSubmit}>
        <!-- svelte-ignore a11y-no-redundant-roles -->
        <table
          class="table-container"
          width="100%"
          role="table"
          aria-label="Categories"
        >
          <caption>Overview: {getLastEl(events)}</caption>
          <thead>
            <tr class="flex-table header" role="rowgroup">
              <th scope="col" class="flex-row first" role="columnheader"
                >Time</th
              >
              {#each categories as category}
                <th class="flex-row" role="columnheader">{category}</th>
              {/each}
            </tr>
          </thead>

          <tbody>
            <tr class="flex-table row" role="rowgroup">
              <td class="flex-row first" role="cell">Afternoon</td>

              <td class="flex-row" role="cell">
                <div class="checkbox">
                  {#if firstField1x1.users.length > 1}
                    <label>
                      <input
                        type="checkbox"
                        bind:group={selected}
                        value={firstField1x1.id}
                        disabled={firstField1x1.selected === false &&
                          firstField1x1.disabled === true}
                      />
                    </label>
                  {/if}
                  <div>
                    {#each firstField1x1.users as user (user.id)}
                      <div class="name_card">
                        {user.name}
                      </div>
                    {/each}
                  </div>
                  <div />
                </div>
              </td>
              <td class="flex-row" role="cell">
                <div class="checkbox">
                  {#if secondField2x1.users.length > 1}
                    <label>
                      <input
                        type="checkbox"
                        bind:group={selected}
                        value={secondField2x1.id}
                        disabled={secondField2x1.selected === false &&
                          secondField2x1.disabled === true}
                      />
                    </label>
                  {/if}
                  <div>
                    {#each secondField2x1.users as user (user.id)}
                      <div class="name_card">
                        {user.name}
                      </div>
                    {/each}
                  </div>
                  <div />
                </div>
              </td>
              <td class="flex-row" role="cell">
                <div class="checkbox">
                  {#if thirdField3x1.users.length > 1}
                    <label>
                      <input
                        type="checkbox"
                        bind:group={selected}
                        value={thirdField3x1.id}
                        disabled={thirdField3x1.selected === false &&
                          thirdField3x1.disabled === true}
                      />
                    </label>
                  {/if}
                  <div>
                    {#each thirdField3x1.users as user (user.id)}
                      <div class="name_card">
                        {user.name}
                      </div>
                    {/each}
                  </div>
                  <div />
                </div>
              </td>
            </tr>

            <tr class="flex-table row" role="rowgroup">
              <td class="flex-row first" role="cell">Evening</td>
              <td class="flex-row" role="cell">
                <div class="checkbox">
                  {#if firstField1x2.users.length > 1}
                    <label>
                      <input
                        type="checkbox"
                        bind:group={selected}
                        value={firstField1x2.id}
                        disabled={firstField1x2.selected === false &&
                          firstField1x2.disabled === true}
                      />
                    </label>
                  {/if}
                  <div>
                    {#each firstField1x2.users as user (user.id)}
                      <div class="name_card">
                        {user.name}
                      </div>
                    {/each}
                  </div>
                  <div />
                </div>
              </td>
              <td class="flex-row" role="cell">
                <div class="checkbox">
                  {#if secondField2x2.users.length > 1}
                    <label>
                      <input
                        type="checkbox"
                        bind:group={selected}
                        value={secondField2x2.id}
                        disabled={secondField2x2.selected === false &&
                          secondField2x2.disabled === true}
                      />
                    </label>
                  {/if}
                  <div>
                    {#each secondField2x2.users as user (user.id)}
                      <div class="name_card">
                        {user.name}
                      </div>
                    {/each}
                  </div>
                  <div />
                </div>
              </td>
              <td class="flex-row" role="cell">
                <div class="checkbox">
                  {#if thirdField3x2.users.length > 1}
                    <label>
                      <input
                        type="checkbox"
                        bind:group={selected}
                        value={thirdField3x2.id}
                        disabled={thirdField3x2.selected === false &&
                          thirdField3x2.disabled === true}
                      />
                    </label>
                  {/if}
                  <div>
                    {#each thirdField3x2.users as user (user.id)}
                      <div class="name_card">
                        {user.name}
                      </div>
                    {/each}
                  </div>
                  <div />
                </div>
              </td>
            </tr>

            <tr>
              <td class="flex-row rowspan first" rowspan="4">Night</td>
              <td class="flex-row" role="cell">
                <div class="checkbox">
                  {#if firstField1x3.users.length > 1}
                    <label>
                      <input
                        type="checkbox"
                        bind:group={selected}
                        value={firstField1x3.id}
                        disabled={firstField1x3.selected === false &&
                          firstField1x3.disabled === true}
                      />
                    </label>
                  {/if}
                  <div>
                    {#each firstField1x3.users as user (user.id)}
                      <div class="name_card">
                        {user.name}
                      </div>
                    {/each}
                  </div>
                  <div />
                </div>
              </td>
              <td class="flex-row" role="cell">
                <div class="checkbox">
                  {#if secondField2x3.users.length > 1}
                    <label>
                      <input
                        type="checkbox"
                        bind:group={selected}
                        value={secondField2x3.id}
                        disabled={secondField2x3.selected === false &&
                          secondField2x3.disabled === true}
                      />
                    </label>
                  {/if}
                  <div>
                    {#each secondField2x3.users as user (user.id)}
                      <div class="name_card">
                        {user.name}
                      </div>
                    {/each}
                  </div>
                  <div />
                </div>
              </td>
              <td class="flex-row" role="cell">
                <div class="checkbox">
                  {#if thirdField3x3.users.length > 1}
                    <label>
                      <input
                        type="checkbox"
                        bind:group={selected}
                        value={thirdField3x3.id}
                        disabled={thirdField3x3.selected === false &&
                          thirdField3x3.disabled === true}
                      />
                    </label>
                  {/if}
                  <div>
                    {#each thirdField3x3.users as user (user.id)}
                      <div class="name_card">
                        {user.name}
                      </div>
                    {/each}
                  </div>
                  <div />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="btn-container">
          <Button type="submit" disabled={null} CTA_Name="Save" />
        </div>
      </form>

      <Link to="/home" style="text-decoration: none">
        <PrevButton CTA_Next_Page="Home" />
      </Link>
      <Link to="/events" style="text-decoration: none">
        <NextButton CTA_Next_Page="Events" />
      </Link>
    </div>
  </article>
</section>

<style>
  caption {
    /*  display: none; */
    font-size: 1.5em;
    margin: 0 0 0.75em;
  }

  div {
    box-sizing: border-box;
  }

  .table-container {
    margin: 1em auto;
    width: 90%;
    max-width: 40rem;
    border-collapse: collapse;
  }

  td {
    border: 1px solid var(--light-grey);
    padding: 0.5em;
  }

  th {
    background: var(--primary-color);
    color: var(--white);
    padding: 0.5em;
    border: 1px solid var(--primary-color);
  }

  .flex-row {
    width: 25%;
  }

  .flex-row {
    text-align: left;
  }

  .checkbox {
    display: flex;
    flex-direction: column;
  }

  label {
    display: flex;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 767px) {
    th,
    td {
      width: auto;
      display: block;
      border: 0;
    }

    th {
      border-left: solid 1px var(--primary-color);
      border-right: solid 1px var(--primary-color);
      border-bottom: solid 1px var(--primary-color);
    }

    td {
      border-left: solid 1px var(--light-grey);
      border-right: solid 1px var(--light-grey);
      border-bottom: solid 1px var(--light-grey);
    }

    .flex-row {
      width: 100%;
    }
  }

  .name_card {
    font-size: 0.85rem;
    min-width: 6rem;
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
  }
</style>
