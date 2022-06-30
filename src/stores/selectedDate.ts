import { writable } from "svelte/store"

// Get the value out of storage on load.
const stored = localStorage.selectedDate
// or localStorage.getItem('selectedDate')

// Set the stored value or a sane default.
export const selectedDate = writable(stored || "")

// Anytime the store changes, update the local storage value.
selectedDate.subscribe((value) => (localStorage.selectedDate = value))
// or localStorage.setItem('selectedDate', value)
