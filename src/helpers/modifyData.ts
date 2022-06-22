export const modifyData = (
  id: number,
  category: string,
  time: string,
  userArr: User[]
) => {
  const data: any = {
    id: id,
    category: category,
    time: time,
    users: userArr,
  }

  return data
}
