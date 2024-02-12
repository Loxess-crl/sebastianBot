"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = exports.convertDateToString = exports.formatDate = exports.getRandomNumber = void 0;
const discord_js_1 = require("discord.js");
const months_1 = require("../constants/months");
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
};
exports.getRandomNumber = getRandomNumber;
const formatDate = (date) => {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
exports.formatDate = formatDate;
const convertDateToString = (date) => {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    const month = months_1.months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} de ${month} del ${year}`;
};
exports.convertDateToString = convertDateToString;
const getRandomColor = () => {
    const random = (0, exports.getRandomNumber)(0, Object.values(discord_js_1.Colors).length - 1);
    const color = Object.values(discord_js_1.Colors)[random];
    return color;
};
exports.getRandomColor = getRandomColor;
