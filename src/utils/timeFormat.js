function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
}

export const formatDateForCard = (startDate, endDate) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    
    if (toDateString(startDate) === toDateString(endDate)) {
        return `${pad(startDate.getHours())}:${pad(startDate.getMinutes())}-${pad(endDate.getHours())}:${pad(endDate.getMinutes())} ${months[startDate.getMonth()]}, ${startDate.getDate()} ${startDate.getFullYear()}`
    }

    if(startDate.getFullYear() === endDate.getFullYear()) {
        return `${months[startDate.getMonth()]}, ${startDate.getDate()} ${pad(startDate.getHours())}:${pad(startDate.getMinutes())}-${months[endDate.getMonth()]}, ${endDate.getDate()} ${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`
    }
    return `${months[startDate.getMonth()]}, ${startDate.getDate()} ${startDate.getFullYear()}, ${pad(startDate.getHours())}:${pad(startDate.getMinutes())}-${months[endDate.getMonth()]}, ${endDate.getDate()} ${endDate.getFullYear()}, ${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`
}

export const toDateString = (date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export const toTimeString = (date) => {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}