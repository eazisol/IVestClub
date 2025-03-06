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

export const formatBytes = (byteString) => {
  // Convert the string to a number
  const bytes = parseFloat(byteString);

  // If it's not a valid number, return an error message
  if (isNaN(bytes) || bytes < 0) return 'Invalid size';

  if (bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const formattedSize = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));

  return `${formattedSize} ${sizes[i]}`;
};

export const timeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const secondsAgo = Math.floor((now - time) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};
const alphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'
];

// Function to pad a number to 5 digits
const padNumber = (number) => {
  return number.toString().padStart(5, '0'); // Pads with leading zeros to make it 5 digits
};

// Seed-based shuffle function
const shuffleWithSeed = (seed) => {
  const array = [...alphabet];
  let random = seed;

  for (let i = array.length - 1; i > 0; i--) {
    random = (random * 9301 + 49297) % 233280; // Simple linear congruential generator
    const j = Math.floor((random / 233280) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to generate a seed from the salt
const generateSeedFromSalt = (salt) => {
  return salt
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0); // Convert salt to a numeric seed
};

// Function to generate a random salt
const generateRandomSalt = () => {
  let salt = '';
  for (let i = 0; i < 3; i++) {
    salt += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return salt;
};

// Function to encrypt a number
export const encryptNumber = (number) => {
  number = padNumber(number); // Ensure the number is 5 digits
  const salt = generateRandomSalt(); // Generate a random salt
  const seed = generateSeedFromSalt(salt); // Generate seed from salt
  const shuffledAlphabet = shuffleWithSeed(seed); // Shuffle alphabet using seed

  let encrypted = salt; // Start with the salt
  for (let i = 0; i < number.length; i++) {
    const digit = parseInt(number[i], 10); // Parse the digit
    const encryptedDigit = shuffledAlphabet[digit]; // Map to the shuffled character
    if (encryptedDigit === undefined) {
      throw new Error(`Invalid digit '${number[i]}' in number.`);
    }
    encrypted += encryptedDigit;
  }

  console.log("Encrypted:", encrypted);
  return encrypted;
};

// Function to decrypt an encrypted number
export const decryptNumber = (encryptedNumber) => {
  console.log("number to decrypt",encryptedNumber);
  if (encryptedNumber.length !== 8) {
    throw new Error("Encrypted number must be exactly 8 characters long.");
  }

  const salt = encryptedNumber.slice(0, 3); // Extract the salt
  const encryptedDigits = encryptedNumber.slice(3); // Get the encrypted digits
  const seed = generateSeedFromSalt(salt); // Generate seed from salt
  const shuffledAlphabet = shuffleWithSeed(seed); // Shuffle alphabet using seed

  let decrypted = '';
  for (let i = 0; i < encryptedDigits.length; i++) {
    const encryptedDigit = encryptedDigits[i];
    const index = shuffledAlphabet.indexOf(encryptedDigit); // Find the index in the shuffled alphabet
    if (index === -1) {
      throw new Error(`Invalid character '${encryptedDigit}' in encrypted number.`);
    }
    decrypted += index.toString(); // Convert index back to a string digit
  }

  console.log("Decrypted:", decrypted);
  return decrypted;
};

export const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};