export default function Date({ createDate }) {
  let data = createDate.createdAt;

  let year = data.substr(0, 4);
  let month = data.substr(5, 2);
  let date = data.substr(8, 2);

  let resultDate = `${year}.${month}.${date}`;
  return resultDate;
}
