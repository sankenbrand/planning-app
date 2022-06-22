interface Category {
  categoryId: number
  categoryName: string
}

interface User {
  id: number
  name: string
  date: string
  category: string
  preferredTime: string
  selectedTime: string | null
  eventId?: number
}

interface Event {
  id: number
  date?: string
  category: string | null
  time: string | null
  users: User[]
}
