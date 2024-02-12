export const formatDate = (date: string) => {
  const newDate: Date = new Date(date);

  const year: number = newDate.getFullYear();
  const month: number = newDate.getMonth();
  const day: number = newDate.getDate();
  const hour: number = newDate.getHours();
  const minutes: number = newDate.getMinutes();
  const seconds: number = newDate.getSeconds();

  const result: string = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  } ${hour < 10 ? "0" + hour : hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return result;
};
