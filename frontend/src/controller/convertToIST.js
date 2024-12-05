import { DateTime } from "luxon";

/**
 * Converts a given ISO 8601 timestamp to Indian Standard Time (IST).
 * 
 * @param {string} isoTimestamp - The ISO 8601 timestamp (e.g., "2024-11-27T06:39:10.516Z").
 * @returns {string} - The converted time in IST as a formatted string (e.g., "2024-11-27 12:09:10").
 */
export default function convertToIST(isoTimestamp) {
  try {
    // Parse the ISO timestamp and set the timezone to UTC
    const utcDateTime = DateTime.fromISO(isoTimestamp, { zone: 'utc' });
    
    // Convert the UTC time to IST (Asia/Kolkata timezone)
    const istDateTime = utcDateTime.setZone('Asia/Kolkata');
    
    // Format the IST time as a readable string
    return istDateTime.toFormat('dd MMM yyyy, hh:mm:ss a');
  } catch (error) {
    console.error("Invalid ISO 8601 timestamp:", error.message);
    return null; // Return null if the input timestamp is invalid
  }
}

// Example usage:
// const isoTimestamp = "2024-11-27T06:39:10.516Z";
// const istTime = convertToIST(isoTimestamp);
// console.log("Converted IST Time:", istTime);
