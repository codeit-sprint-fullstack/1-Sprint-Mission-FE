export default function CreateDate({ createDate }) {
  let data = createDate.createdAt;

  const newDate = new Date(data);

  let year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let date = newDate.getDate();

  if (month <= 10) {
    month = '0' + month;
  }

  if (date <= 10) {
    date = '0' + date;
  }

  let resultDate = `${year}.${month}.${date}`;

  return resultDate;
}
