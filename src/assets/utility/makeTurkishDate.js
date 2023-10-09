import { formatDateTime } from ".././utility/bluetoothConnection";
export const makeTurkishDate = (date, ifYear = true) => {
  if (!isNaN(+date)) {
    if (date.length > 12) {
      return formatDateTime(date);
    } else {
      return 0;
    }
  }

  const indexOfSpace = date.indexOf(" ");
  const indexOfG = date.indexOf("G");
  const englishTime = date.slice(indexOfSpace + 1, indexOfG - 4);
  const secondSpace = englishTime.indexOf(" ");
  const englishMonth = englishTime.slice(0, secondSpace);
  const restOfDate = englishTime.slice(indexOfSpace, date.length);
  const day = restOfDate.slice(1, 3);
  const year = restOfDate.slice(4, 8);
  const clock = restOfDate.slice(9, 14);

  let turkishMonth = "";
  if (englishMonth === "Jan") turkishMonth = "Ocak";
  if (englishMonth === "Feb") turkishMonth = "şubat";
  if (englishMonth === "Mar") turkishMonth = "Mart";
  if (englishMonth === "Apr") turkishMonth = "Nisan";
  if (englishMonth === "May") turkishMonth = "Mayıs";
  if (englishMonth === "June" || englishMonth === "Jun")
    turkishMonth = "Haziran";
  if (englishMonth === "July" || englishMonth === "Jul")
    turkishMonth = "Temmuz";
  if (englishMonth === "Aug") turkishMonth = "Ağustos";
  if (englishMonth === "Sept" || englishMonth === "Sep") turkishMonth = "Eylül";
  if (englishMonth === "Oct") turkishMonth = "Ekim";
  if (englishMonth === "Nov") turkishMonth = "Kasım";
  if (englishMonth === "Dec") turkishMonth = "Aralık";

  if (ifYear) {
    return `${day} ${turkishMonth} ${year}  ${clock}`;
  } else {
    return `${day} ${turkishMonth} ${clock}`;
  }
};
