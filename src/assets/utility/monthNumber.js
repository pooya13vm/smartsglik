export const monthNumberMaker = (time) => {
  const firstSpace = time.indexOf(" ");
  const secondSpace = time.indexOf(" ", firstSpace + 1);
  const month = time.slice(firstSpace, secondSpace).trim();

  if (month === "Jan") return 1;
  if (month === "Feb") return 2;
  if (month === "Mar") return 3;
  if (month === "Apr") return 4;
  if (month === "May") return 5;
  if (month === "Jun") return 6;
  if (month === "Jul") return 7;
  if (month === "Aug") return 8;
  if (month === "Sep") return 9;
  if (month === "Oct") return 10;
  if (month === "Nov") return 11;
  if (month === "Dec") return 12;
};
