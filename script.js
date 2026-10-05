const events = [
    { id: 1, name: "Welcome Back Picnic", category: "social", attendance: 180, capacity: 200, status: "completed" },
    { id: 2, name: "Resume Workshop", category: "career", attendance: 45, capacity: 50, status: "completed" },
    { id: 3, name: "Intro to Javascript Day", category: "academic", attendance: 30, capacity: 40, status: "completed" },
    { id: 4, name: "Career Fair", category: "career", attendance: 320, capacity: 300, status: "completed" },
    { id: 5, name: "Open Mic Night", category: "social", attendance: 60, capacity: 100, status: "scheduled" },
    { id: 6, name: "How to Study", category: "academic", attendance: 0, capacity: 35, status: "cancelled" },
    { id: 7, name: "Alumni Panel", category: "career", attendance: 0, capacity: 80, status: "scheduled" },
    { id: 8, name: "Anime Day", category: "social", attendance: 25, capacity: 30, status: "completed" },
    { id: 9, name: "Virtual Guest Lecture", category: "academic", attendance: 75, capacity: 0, status: "completed" },
    { id: 10, name: "IT club", category: "academic", attendance: 22, capacity: 25, status: "completed" },
    { id: 11, name: "Skateboarding Event", category: "social", attendance: 0, capacity: 400, status: "scheduled" },
    { id: 12, name: "Interview Practice Day", category: "career", attendance: 38, capacity: 40, status: "completed" },
    { id: 13, name: "Art contest", category: "arts", attendance: 52, capacity: 60, status: "completed" },
    { id: 14, name: "Spring Guitar Concert", category: "arts", attendance: 0, capacity: 250, status: "cancelled" }
];
function fillRate(attendance, capacity) {
    if (capacity === 0) {
        return null;
    }

    return attendance / capacity;
}
function findById(list, id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return list[i];
        }
    }

    return null;
}
function totalAttendance(list) {
    let total = 0;

    for (let i = 0; i < list.length; i++) {
        total = total + list[i].attendance;
    }

    return total;
}
function countByCategory(list) {
    let counts = {};

    for (let i = 0; i < list.length; i++) {
        let category = list[i].category;

        if (counts[category] === undefined) {
            counts[category] = 0;
        }

        counts[category]++;
    }

    return counts;
}
function averageFillRate(list) {
    let total = 0;
    let count = 0;

    for (let i = 0; i < list.length; i++) {
        let rate = fillRate(
            list[i].attendance,
            list[i].capacity
        );

        if (rate !== null) {
            total = total + rate;
            count++;
        }
    }

    if (count === 0) {
        return null;
    }

    return total / count;
}
function anyOverCapacity(list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].attendance > list[i].capacity) {
            return true;
        }
    }

    return false;
}
function allHaveCapacity(list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].capacity === 0) {
            return false;
        }
    }

    return true;
}
function buildReport(list, status, category) {
    let selected = [];

    for (let i = 0; i < list.length; i++) {

        if (status !== "" && list[i].status !== status) {
            continue;
        }

        if (category !== "" && list[i].category !== category) {
            continue;
        }

        selected.push(list[i]);
    }

    if (selected.length === 0) {
        return {
            isEmpty: true,
            count: 0,
            events: []
        };
    }

    return {
        isEmpty: false,
        count: selected.length,
        totalAttendance: totalAttendance(selected),
        averageFillRate: averageFillRate(selected),
        anyOverCapacity: anyOverCapacity(selected),
        events: selected
    };
}
let passed = 0;
let total = 0;

function test(name, expected, actual) {
    total++;

    if (expected === actual) {
        passed++;
        console.log("PASS - " + name);
    } else {
        console.log("FAIL - " + name);
        console.log("Expected:", expected);
        console.log("Actual:", actual);
    }
}
let noMatch = buildReport(
    events,
    "completed",
    "nonexistent"
);

test("no matching events", true, noMatch.isEmpty);
test("no matching events count", 0, noMatch.count);
let oneMatch = buildReport(
    events,
    "cancelled",
    "arts"
);

test("one matching event", 1, oneMatch.count);
test("one matching event attendance", 0, oneMatch.totalAttendance);
test("one matching event average", 0, oneMatch.averageFillRate);
test(
    "capacity zero gives null",
    null,
    fillRate(75, 0)
);
test(
    "capacity zero skipped",
    0.5,
    averageFillRate([
        { attendance: 50, capacity: 100 },
        { attendance: 75, capacity: 0 }
    ])
);
test(
    "only capacity zero",
    null,
    averageFillRate([
        { attendance: 75, capacity: 0 }
    ])
);
let categories = countByCategory(events);

test("social category", 4, categories.social);
test("career category", 4, categories.career);
test("academic category", 4, categories.academic);
test("arts category", 2, categories.arts);
test(
    "find by id",
    "Career Fair",
    findById(events, 4).name
);
test(
    "some: any over capacity",
    true,
    anyOverCapacity(events)
);

test(
    "every: all have capacity",
    false,
    allHaveCapacity(events)
);


console.log("");
console.log(passed + " of " + total + " tests passed.");
if (typeof document !== "undefined") {

    function displayEvents() {

        let status = document.getElementById("status").value;
        let category = document.getElementById("category").value;

        let report = buildReport(events, status, category);

        let rows = document.getElementById("rows");

        rows.innerHTML = "";

        document.getElementById("summary").innerHTML =
            "Events: " + report.count +
            " | Total attendance: " +
            report.totalAttendance;


        for (let i = 0; i < report.events.length; i++) {

            let event = report.events[i];

            let rate = fillRate(
                event.attendance,
                event.capacity
            );

            let fill = "N/A";

            if (rate !== null) {
                fill = (rate * 100).toFixed(1) + "%";
            }

            let row = document.createElement("tr");

            row.innerHTML =
                "<td>" + event.name + "</td>" +
                "<td>" + event.category + "</td>" +
                "<td>" + event.status + "</td>" +
                "<td>" + event.attendance + "</td>" +
                "<td>" + event.capacity + "</td>" +
                "<td>" + fill + "</td>";

            rows.appendChild(row);
        }
    }


   
    displayEvents();


    
    document.getElementById("status").addEventListener(
        "change",
        displayEvents
    );
    document.getElementById("category").addEventListener(
        "change",
        displayEvents
    );
}