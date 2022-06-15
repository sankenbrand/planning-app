<script lang="ts">
  import { onMount } from "svelte"
  import { isRequiredFieldValidCheck } from "../lib/Validation"
  import Button from "./buttons/Button.svelte"
  import IconButton from "./buttons/IconButton.svelte"
  import MinusSvg from "./svg/MinusSvg.svelte"
  import PlusSvg from "./svg/PlusSvg.svelte"

  export let close: any

  let categoryName = ""
  let categoryOptions: Category[]

  let isError = false

  onMount(async () => {
    const response = await fetch("http://localhost:8080/api/categories")

    if (response.ok) {
      const data = await response.json()
      categoryOptions = data
      console.log("category options", categoryOptions)
    } else {
      console.error("There was an error!")
    }
  })

  const addCategory = async (categoryName: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: categoryName,
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

  // TODO: add items

  const deleteCategory = (id: number) => {
    fetch(`http://localhost:8080/api/categories/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
  }

  const deleteItem = (id: number) => {
    categoryOptions = categoryOptions.filter(
      (item) => item.categoryId !== Number(id)
    )
  }

  const handleSubmit = () => {
    if (isRequiredFieldValidCheck(categoryName)) {
      if (categoryOptions.length < 4) {
        addCategory(categoryName)
        console.group("🌟 POST category form")
        console.log("categoryName: " + categoryName)
        console.groupEnd()

        categoryName = ""
      } else {
        isError = true
        setTimeout(() => {
          isError = false
        }, 5000)
      }
    } else {
      console.log("Invalid form")
    }
  }
</script>

<section>
  <h3>Categories</h3>
  {#if isError}
    <span class="error-message">* Max 4 categories can be set</span>
  {/if}
  <form class="task-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <input
        type="text"
        name="name"
        placeholder="Add a new category..."
        bind:value={categoryName}
      />
      <IconButton type="submit"><PlusSvg /></IconButton>
    </div>
  </form>
  {#if categoryOptions === undefined}
    Loading category options...
  {:else}
    {#each categoryOptions as category (category.categoryId)}
      <p class="card-category">
        {category.categoryName}
        <button
          type="button"
          on:click={() => {
            console.log("deleted category with id:", category.categoryId)
            deleteCategory(category.categoryId)
            deleteItem(category.categoryId)
          }}
        >
          <MinusSvg />
        </button>
      </p>
    {/each}
  {/if}
  <div class="btn-container">
    <Button type="button" disabled={""} CTA_Name="Close" on:click={close} />
  </div>
</section>

<style>
  input {
    width: 15rem;
    padding: 0.5rem;
  }

  .card-category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgb(141, 141, 141);
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
  }

  .form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
  }

  button {
    background-color: transparent;
    border: none;
  }
</style>
