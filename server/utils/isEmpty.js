const isEmpty = data =>
    (typeof data === "object" && Object.keys(data).length === 0) ||
    (typeof data === "string" && data.trim().length === 0) ||
    data == undefined;

module.exports = isEmpty;
