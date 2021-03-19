/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const createEmployeeRecord = function([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [], 
        timeOutEvents: []
    };
}

const createEmployeeRecords = function(records) {
    return records.map(record => createEmployeeRecord(record));
}

const createTimeInEvent = function(date) {
    const { newDate, newHour } = parseDate(date)
    this.timeInEvents.push({type: "TimeIn", hour: newHour, date: newDate})
    return this
}

const createTimeOutEvent = function(date) {
    const { newDate, newHour } = parseDate(date)
    this.timeOutEvents.push({type: "TimeOut", hour: newHour, date: newDate})
    return this
}

const hoursWorkedOnDate = function(date) {
    const { newDate } = parseDate(date)
    const startHour = this.timeInEvents.find((x) => x.date === newDate).hour
    const endHour = this.timeOutEvents.find((x) => x.date === newDate).hour
    return (endHour - startHour)/100
}

const parseDate = function(date) {
   return {
       newDate: date.split(" ")[0],
       newHour: parseInt(date.split(" ")[1])
   };
}

const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(record => record.firstName === firstName)
}

function calculatePayroll(records) {
    return records.map(record => allWagesFor.call(record)).reduce((x, sum) => sum += x)
}
