export const makeTurkishDate = (date) => {
  const indexOfSpace = date.indexOf(" ");
  const indexOfG = date.indexOf("G");
  const englishTime = date.slice(indexOfSpace + 1, indexOfG - 4);
  const secondSpace = englishTime.indexOf(" ");
  const englishMonth = englishTime.slice(0, secondSpace);
  const restOfDate = englishTime.slice(indexOfSpace, date.length);

  let turkishMonth = "";
  if (englishMonth === "Jan") turkishMonth = "Ocak";
  if (englishMonth === "Feb") turkishMonth = "şubat";
  if (englishMonth === "Mar") turkishMonth = "Mart";
  if (englishMonth === "Apr") turkishMonth = "Nisan";
  if (englishMonth === "May") turkishMonth = "Mayıs";
  if (englishMonth === "June") turkishMonth = "Haziran";
  if (englishMonth === "July") turkishMonth = "Temmuz";
  if (englishMonth === "Aug") turkishMonth = "Ağustos";
  if (englishMonth === "Sept") turkishMonth = "Eylül";
  if (englishMonth === "Oct") turkishMonth = "Ekim";
  if (englishMonth === "Nov") turkishMonth = "Kasım";
  if (englishMonth === "Dec") turkishMonth = "Aralık";
  console.log(turkishMonth);
  return turkishMonth + restOfDate;
};
