export interface PincodeInfo {
  city: string;
  state: string;
  estimatedDays: number;
}

export const ALL_INDIAN_STATES: string[] = [
  "Delhi NCR",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
  "Telangana",
  "West Bengal",
  "Rajasthan",
  "Punjab",
  "Haryana",
  "Madhya Pradesh",
  "Kerala",
  "Andhra Pradesh",
  "Bihar",
  "Odisha",
  "Assam",
  "Jharkhand",
  "Chhattisgarh",
  "Uttarakhand",
  "Himachal Pradesh",
  "Goa",
  "Jammu & Kashmir",
  "Chandigarh",
  "Tripura",
  "Meghalaya",
  "Manipur",
  "Nagaland",
  "Puducherry",
  "Arunachal Pradesh",
  "Mizoram",
  "Sikkim",
  "Ladakh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Andaman & Nicobar Islands",
  "Lakshadweep",
];

// Capital / Primary Hub Map when user selects a State
export const STATE_PRIMARY_HUBS: Record<string, string> = {
  "Delhi NCR": "New Delhi",
  "Maharashtra": "Mumbai",
  "Karnataka": "Bengaluru",
  "Tamil Nadu": "Chennai",
  "Gujarat": "Ahmedabad",
  "Uttar Pradesh": "Noida / Lucknow",
  "Telangana": "Hyderabad",
  "West Bengal": "Kolkata",
  "Rajasthan": "Jaipur",
  "Punjab": "Ludhiana",
  "Haryana": "Gurugram",
  "Madhya Pradesh": "Indore",
  "Kerala": "Kochi",
  "Andhra Pradesh": "Visakhapatnam",
  "Bihar": "Patna",
  "Odisha": "Bhubaneswar",
  "Assam": "Guwahati",
  "Jharkhand": "Ranchi",
  "Chhattisgarh": "Raipur",
  "Uttarakhand": "Dehradun",
  "Himachal Pradesh": "Shimla",
  "Goa": "Panaji",
  "Jammu & Kashmir": "Srinagar / Jammu",
  "Chandigarh": "Chandigarh",
  "Tripura": "Agartala",
  "Meghalaya": "Shillong",
  "Manipur": "Imphal",
  "Nagaland": "Kohima",
  "Puducherry": "Puducherry",
  "Arunachal Pradesh": "Itanagar",
  "Mizoram": "Aizawl",
  "Sikkim": "Gangtok",
  "Ladakh": "Leh",
  "Dadra & Nagar Haveli and Daman & Diu": "Daman",
  "Andaman & Nicobar Islands": "Port Blair",
  "Lakshadweep": "Kavaratti",
};

// Comprehensive 2-digit and 3-digit Indian Postal Circle Database
const PINCODE_PREFIX_MAP: Record<string, { city: string; state: string; estimatedDays: number }> = {
  // 11: Delhi NCR
  "11": { city: "New Delhi", state: "Delhi NCR", estimatedDays: 2 },

  // 12 - 13: Haryana
  "12": { city: "Gurugram / Faridabad", state: "Haryana", estimatedDays: 2 },
  "13": { city: "Ambala / Karnal / Panipat", state: "Haryana", estimatedDays: 2 },

  // 14 - 15: Punjab
  "14": { city: "Ludhiana / Jalandhar", state: "Punjab", estimatedDays: 2 },
  "15": { city: "Bathinda / Firozpur", state: "Punjab", estimatedDays: 3 },

  // 16: Chandigarh
  "16": { city: "Chandigarh / Mohali", state: "Chandigarh", estimatedDays: 2 },

  // 17: Himachal Pradesh
  "17": { city: "Shimla / Dharamshala", state: "Himachal Pradesh", estimatedDays: 3 },

  // 18 - 19: Jammu & Kashmir, Ladakh
  "18": { city: "Jammu", state: "Jammu & Kashmir", estimatedDays: 3 },
  "19": { city: "Srinagar", state: "Jammu & Kashmir", estimatedDays: 3 },
  "194": { city: "Leh", state: "Ladakh", estimatedDays: 4 },

  // 20 - 28: Uttar Pradesh & Uttarakhand
  "20": { city: "Noida / Ghaziabad / Aligarh", state: "Uttar Pradesh", estimatedDays: 2 },
  "21": { city: "Prayagraj (Allahabad)", state: "Uttar Pradesh", estimatedDays: 2 },
  "22": { city: "Lucknow / Ayodhya", state: "Uttar Pradesh", estimatedDays: 2 },
  "23": { city: "Varanasi / Mirzapur", state: "Uttar Pradesh", estimatedDays: 2 },
  "24": { city: "Dehradun / Haridwar", state: "Uttarakhand", estimatedDays: 2 },
  "25": { city: "Meerut / Saharanpur", state: "Uttar Pradesh", estimatedDays: 2 },
  "26": { city: "Bareilly / Haldwani", state: "Uttar Pradesh", estimatedDays: 3 },
  "27": { city: "Gorakhpur / Basti", state: "Uttar Pradesh", estimatedDays: 3 },
  "28": { city: "Agra / Jhansi", state: "Uttar Pradesh", estimatedDays: 2 },

  // 30 - 34: Rajasthan
  "30": { city: "Jaipur", state: "Rajasthan", estimatedDays: 2 },
  "31": { city: "Udaipur / Kota", state: "Rajasthan", estimatedDays: 2 },
  "32": { city: "Bharatpur / Alwar", state: "Rajasthan", estimatedDays: 2 },
  "33": { city: "Bikaner / Sikar", state: "Rajasthan", estimatedDays: 3 },
  "34": { city: "Jodhpur / Barmer", state: "Rajasthan", estimatedDays: 3 },

  // 36 - 39: Gujarat & Daman/Diu
  "36": { city: "Rajkot / Jamnagar", state: "Gujarat", estimatedDays: 2 },
  "37": { city: "Kutch / Gandhidham", state: "Gujarat", estimatedDays: 3 },
  "38": { city: "Ahmedabad / Gandhinagar", state: "Gujarat", estimatedDays: 2 },
  "39": { city: "Surat / Vadodara", state: "Gujarat", estimatedDays: 2 },
  "396": { city: "Daman / Silvassa", state: "Dadra & Nagar Haveli and Daman & Diu", estimatedDays: 3 },

  // 40 - 44: Maharashtra & Goa
  "40": { city: "Mumbai / Thane / Navi Mumbai", state: "Maharashtra", estimatedDays: 2 },
  "403": { city: "Panaji / Margao", state: "Goa", estimatedDays: 3 },
  "41": { city: "Pune / Solapur / Kolhapur", state: "Maharashtra", estimatedDays: 2 },
  "42": { city: "Nashik / Dhule", state: "Maharashtra", estimatedDays: 2 },
  "43": { city: "Chhatrapati Sambhajinagar (Aurangabad)", state: "Maharashtra", estimatedDays: 3 },
  "44": { city: "Nagpur / Amravati", state: "Maharashtra", estimatedDays: 3 },

  // 45 - 49: Madhya Pradesh & Chhattisgarh
  "45": { city: "Indore / Ujjain", state: "Madhya Pradesh", estimatedDays: 2 },
  "46": { city: "Bhopal", state: "Madhya Pradesh", estimatedDays: 2 },
  "47": { city: "Gwalior", state: "Madhya Pradesh", estimatedDays: 2 },
  "48": { city: "Jabalpur", state: "Madhya Pradesh", estimatedDays: 3 },
  "49": { city: "Raipur / Bilaspur", state: "Chhattisgarh", estimatedDays: 3 },

  // 50 - 53: Telangana & Andhra Pradesh
  "50": { city: "Hyderabad / Secunderabad", state: "Telangana", estimatedDays: 2 },
  "51": { city: "Tirupati / Kurnool", state: "Andhra Pradesh", estimatedDays: 3 },
  "52": { city: "Vijayawada / Guntur", state: "Andhra Pradesh", estimatedDays: 2 },
  "53": { city: "Visakhapatnam", state: "Andhra Pradesh", estimatedDays: 2 },

  // 56 - 59: Karnataka
  "56": { city: "Bengaluru", state: "Karnataka", estimatedDays: 2 },
  "57": { city: "Mangaluru / Mysuru / Udupi", state: "Karnataka", estimatedDays: 2 },
  "58": { city: "Hubli / Dharwad / Belagavi", state: "Karnataka", estimatedDays: 3 },
  "59": { city: "Kalaburagi (Gulbarga)", state: "Karnataka", estimatedDays: 3 },

  // 60 - 64: Tamil Nadu & Puducherry
  "60": { city: "Chennai", state: "Tamil Nadu", estimatedDays: 2 },
  "605": { city: "Puducherry", state: "Puducherry", estimatedDays: 2 },
  "61": { city: "Thanjavur / Tiruchirappalli", state: "Tamil Nadu", estimatedDays: 3 },
  "62": { city: "Madurai / Tirunelveli", state: "Tamil Nadu", estimatedDays: 3 },
  "63": { city: "Salem / Vellore", state: "Tamil Nadu", estimatedDays: 2 },
  "64": { city: "Coimbatore / Tiruppur", state: "Tamil Nadu", estimatedDays: 2 },

  // 67 - 69: Kerala & Lakshadweep
  "67": { city: "Kozhikode / Kannur", state: "Kerala", estimatedDays: 3 },
  "68": { city: "Kochi / Ernakulam / Thrissur", state: "Kerala", estimatedDays: 2 },
  "682": { city: "Kavaratti", state: "Lakshadweep", estimatedDays: 5 },
  "69": { city: "Thiruvananthapuram / Kollam", state: "Kerala", estimatedDays: 2 },

  // 70 - 74: West Bengal & Andaman/Nicobar
  "70": { city: "Kolkata / Howrah", state: "West Bengal", estimatedDays: 2 },
  "71": { city: "Durgapur / Asansol", state: "West Bengal", estimatedDays: 3 },
  "72": { city: "Kharagpur / Medinipur", state: "West Bengal", estimatedDays: 3 },
  "73": { city: "Siliguri / Darjeeling", state: "West Bengal", estimatedDays: 3 },
  "737": { city: "Gangtok", state: "Sikkim", estimatedDays: 3 },
  "74": { city: "North 24 Parganas / Nadia", state: "West Bengal", estimatedDays: 3 },
  "744": { city: "Port Blair", state: "Andaman & Nicobar Islands", estimatedDays: 4 },

  // 75 - 77: Odisha
  "75": { city: "Bhubaneswar / Cuttack / Puri", state: "Odisha", estimatedDays: 2 },
  "76": { city: "Berhampur / Sambalpur", state: "Odisha", estimatedDays: 3 },
  "77": { city: "Rourkela", state: "Odisha", estimatedDays: 3 },

  // 78 - 79: Assam & North Eastern States
  "78": { city: "Guwahati / Dibrugarh", state: "Assam", estimatedDays: 3 },
  "790": { city: "Itanagar", state: "Arunachal Pradesh", estimatedDays: 4 },
  "791": { city: "Pasighat", state: "Arunachal Pradesh", estimatedDays: 4 },
  "792": { city: "Tezu", state: "Arunachal Pradesh", estimatedDays: 4 },
  "793": { city: "Shillong", state: "Meghalaya", estimatedDays: 3 },
  "794": { city: "Tura", state: "Meghalaya", estimatedDays: 4 },
  "795": { city: "Imphal", state: "Manipur", estimatedDays: 4 },
  "796": { city: "Aizawl", state: "Mizoram", estimatedDays: 4 },
  "797": { city: "Kohima / Dimapur", state: "Nagaland", estimatedDays: 4 },
  "799": { city: "Agartala", state: "Tripura", estimatedDays: 4 },

  // 80 - 85: Bihar & Jharkhand
  "80": { city: "Patna / Nalanda", state: "Bihar", estimatedDays: 2 },
  "81": { city: "Bhagalpur / Munger", state: "Bihar", estimatedDays: 3 },
  "82": { city: "Gaya / Nawada", state: "Bihar", estimatedDays: 3 },
  "83": { city: "Ranchi / Jamshedpur", state: "Jharkhand", estimatedDays: 2 },
  "84": { city: "Muzaffarpur / Darbhanga", state: "Bihar", estimatedDays: 3 },
  "85": { city: "Purnia / Katihar", state: "Bihar", estimatedDays: 3 },
  "826": { city: "Dhanbad / Bokaro", state: "Jharkhand", estimatedDays: 2 },
  "828": { city: "Dhanbad", state: "Jharkhand", estimatedDays: 2 },
};

/**
 * Synchronous instant prefix lookup (returns instantly on 2 or 3 digits)
 */
export function lookupIndianPincode(pincode: string): PincodeInfo | null {
  const cleanPin = pincode.trim().replace(/\D/g, "");
  if (cleanPin.length < 2) return null;

  // Try 3-digit prefix then 2-digit prefix
  const prefix3 = cleanPin.substring(0, 3);
  if (PINCODE_PREFIX_MAP[prefix3]) return PINCODE_PREFIX_MAP[prefix3];

  const prefix2 = cleanPin.substring(0, 2);
  if (PINCODE_PREFIX_MAP[prefix2]) return PINCODE_PREFIX_MAP[prefix2];

  return null;
}

/**
 * Asynchronous live lookup to official Postal Pincode API for exact district/city
 * Falls back to offline prefix map if offline or invalid.
 */
export async function fetchLivePincodeDetails(pincode: string): Promise<PincodeInfo | null> {
  const cleanPin = pincode.trim().replace(/\D/g, "");
  const offlineMatch = lookupIndianPincode(cleanPin);

  if (cleanPin.length !== 6) {
    return offlineMatch;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return offlineMatch;

    const data = await res.json();
    if (Array.isArray(data) && data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
      const po = data[0].PostOffice[0];
      const officialDistrict = po.District || po.Block || po.Circle;
      const officialState = po.State;

      // Find closest matching state from ALL_INDIAN_STATES
      let matchedState = offlineMatch?.state || officialState;
      const stateMatch = ALL_INDIAN_STATES.find(
        (s) => s.toLowerCase() === officialState?.toLowerCase() || officialState?.toLowerCase().includes(s.toLowerCase())
      );
      if (stateMatch) {
        matchedState = stateMatch;
      }

      return {
        city: officialDistrict || offlineMatch?.city || "Local District",
        state: matchedState,
        estimatedDays: offlineMatch?.estimatedDays || 3,
      };
    }
  } catch {
    // Network failure or timeout: fallback safely to instant offline database
  }

  return offlineMatch;
}
