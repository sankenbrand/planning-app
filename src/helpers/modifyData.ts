export const modifyData = (
  id: number,
  category: string,
  time: string,
  userArr: User[],
  isSelected: boolean,
  isDisabled: boolean
) => {
  const data: any = {
    id: id,
    category: category,
    time: time,
    users: userArr,
    selected: isSelected,
    disabled: isDisabled,
  }

  return data
}
