const key =
  "prNExrxXRNQUwIRw3u1ZT0iZgPTE66XkB48laLqkPYPgVM6CEowrarmGHpsQ3RVDFY";
const zipCode = 85138;
const radius = 30;
const units = "miles";
const format = "json";

const callAPI = () => {
  fetch(
    `https://www.zipcodeapi.com/rest/${key}/radius.${format}/${zipCode}/${radius}/${units}`,
    {}
  ).then((data) => {
    console.log(data);
  });
};

export default callAPI;
