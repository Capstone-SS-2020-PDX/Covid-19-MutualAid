export const prettifyDate = dateToMakePretty => {
    var prettyDate = dateToMakePretty.slice(0,10)
    var prettyDate = prettyDate.split("-").reverse().join("-");

    var day = prettyDate.slice(0,2);
    var month = prettyDate.slice(3,5);
    var year = prettyDate.slice(6,10);

    switch(month) {
        case '01':
            prettyDate = "Jan. " + day + ", " + year;
            break;
        case '02':
            prettyDate = "Feb. " + day + ", " + year;
            break;
        case '03':
            prettyDate = "Mar. " + day + ", " + year;
            break;
        case '04':
            prettyDate = "Apr. " + day + ", " + year;
            break;
        case '05':
            prettyDate = "May " + day + ", " + year;
            break;
        case '06':
            prettyDate = "June " + day + ", " + year;
            break;
        case '07':
            prettyDate = "July " + day + ", " + year;
            break;
        case '08':
            prettyDate = "Aug. " + day + ", " + year;
            break;
        case '09':
            prettyDate = "Sept. " + day + ", " + year;
            break;
        case '10':
            prettyDate = "Oct. " + day + ", " + year;
            break;
        case '11':
            prettyDate = "Nov. " + day + ", " + year;
            break;
        case '12':
            prettyDate = "Dec. " + day + ", " + year;
            break;
    }

    return prettyDate;
}
