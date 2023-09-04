function timestampConverter(timestamp, timezone) {
    const nd = new Date(timestamp * 1000 + (timezone * 1000))
    return nd;
}

// Example usage:
var timestamp = 1693843760; // Replace with your Unix timestamp
var timezone = 28800;
var time = timestampConverter(timestamp, timezone);
console.log(time);