export default {
    getCurrentDateTime() {
        const currentDateTime = new Date();
        const day = currentDateTime.getDate();
        const month = currentDateTime.getMonth() + 1;
        const year = currentDateTime.getFullYear();
        const hours = currentDateTime.getHours();
        const minutes = currentDateTime.getMinutes();

        let dayAsString = day + "";
        if (day < 10) {
            dayAsString = "0" + day;
        }
        let monthAsString = month + "";
        if (month < 10) {
            monthAsString = "0" + month;
        }
        let hoursAsString = hours + "";
        if (hours < 10) {
            hoursAsString = "0" + hours;
        }
        let minutesAsString = minutes + "";
        if (minutes < 10) {
            minutesAsString = "0" + minutes;
        }

        let due = {
            date: '',
            time: ''
        };
        due.date = year + "-" + monthAsString + "-" + dayAsString;
        due.time = hoursAsString + ":" + minutesAsString;

        return due;
    }
}