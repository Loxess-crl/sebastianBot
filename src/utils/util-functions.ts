import { Colors } from 'discord.js';
import { months } from '../constants/months';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min
  );
};

export const formatDate = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const convertDateToString = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const day =
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month} del ${year}`;
};

export const getRandomColor = () => {
  const random = getRandomNumber(0, Object.values(Colors).length - 1);
  const color = Object.values(Colors)[random];
  return color;
};
