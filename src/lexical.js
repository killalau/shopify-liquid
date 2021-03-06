// quote related
var singleQuoted = /'[^']*'/;
var doubleQuoted = /"[^"]*"/;
var quoteBalanced = new RegExp(`(?:${singleQuoted.source}|${doubleQuoted.source}|[^'"])*`);

var number = /(?:-?\d+\.?\d*|\.?\d+)/;
var bool = /true|false/;
var identifier = /[a-zA-Z_$][a-zA-Z_$0-9]*/;
var subscript = /\[\d+\]/;

var quoted = new RegExp(`(?:${singleQuoted.source}|${doubleQuoted.source})`);
var literal = new RegExp(`(?:${quoted.source}|${bool.source}|${number.source})`);
var variable = new RegExp(`${identifier.source}(?:\\.${identifier.source}|${subscript.source})*`);

// range related
var rangeLimit = new RegExp(`(?:${variable.source}|${number.source})`);
var range = new RegExp(`\\(${rangeLimit.source}\\.\\.${rangeLimit.source}\\)`);
var rangeCapture = new RegExp(`\\((${rangeLimit.source})\\.\\.(${rangeLimit.source})\\)`);

var value = new RegExp(`(?:${literal.source}|${variable.source}|${range.source})`);

// hash related
var hash = new RegExp(`(?:${identifier.source})\\s*:\\s*(?:${value.source})`);
var hashCapture = new RegExp(`(${identifier.source})\\s*:\\s*(${value.source})`, 'g');

var tagLine = new RegExp(`^\\s*(${identifier.source})\\s*(.*)\\s*$`);
var literalLine = new RegExp(`^${literal.source}$`, 'i');
var variableLine = new RegExp(`^${variable.source}$`);
var numberLine = new RegExp(`^${number.source}$`);
var boolLine = new RegExp(`^${bool.source}$`, 'i');
var quotedLine = new RegExp(`^${quoted.source}$`);
var rangeLine = new RegExp(`^${rangeCapture.source}$`);

// filter related
var valueList = new RegExp(`${value.source}(\\s*,\\s*${value.source})*`);
var filter = new RegExp(`${identifier.source}(?:\\s*:\\s*${valueList.source})?`, 'g');
var filterCapture = new RegExp(`(${identifier.source})(?:\\s*:\\s*(${valueList.source}))?`);
var filterLine = new RegExp(`^${filterCapture.source}$`);

var operators = [
    /\s+or\s+/,
    /\s+and\s+/,
    /==|!=|<=|>=|<|>|\s+contains\s+/
];

function isLiteral(str) {
    return literalLine.test(str);
}

function isRange(str) {
    return rangeLine.test(str);
}

function isVariable(str) {
    return variableLine.test(str);
}

function parseLiteral(str) {
    var res;
    if (res = str.match(numberLine)) {
        return Number(str);
    }
    if (res = str.match(boolLine)) {
        return str.toLowerCase() === 'true';
    }
    if (res = str.match(quotedLine)) {
        return str.slice(1, -1);
    }
}

module.exports = {
    quoted, number, bool, literal, filter,
    hash, hashCapture,
    range, rangeCapture, 
    identifier, value, quoteBalanced, operators,
    quotedLine, numberLine, boolLine, rangeLine, literalLine, filterLine, tagLine,
    isLiteral, isVariable, parseLiteral, isRange
};
