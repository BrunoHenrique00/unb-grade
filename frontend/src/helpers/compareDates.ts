export function isDatesEquals(date1: Date, date2: Date): boolean {
    const firstDate = new Date(date1)
    const secondDate = new Date(date2)

    firstDate.setMilliseconds(0)
    secondDate.setMilliseconds(0)



    if (firstDate.getHours() === secondDate.getHours() && firstDate.getMinutes() === secondDate.getMinutes()) {
        return true
    } 
    return false
}