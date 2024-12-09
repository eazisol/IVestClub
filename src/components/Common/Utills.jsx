export const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle empty or undefined input

  const date = new Date(dateString);
  const year = date.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed

  return `${month}-${day}-${year}`;
};

export const formatDateToDDMMYYYY = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

// Converts from DD-MM-YYYY to YYYY-MM-DD format for displaying in MUI TextField
export const formatDateToYYYYMMDD = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};

export const formatdateHeading = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return formattedDate; // Output: 6/10/2024
};
