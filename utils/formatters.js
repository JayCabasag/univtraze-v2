export function formatPhoneNumber(phoneNumber) {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');
  
    // Check if the number starts with "63"
    if (digitsOnly.startsWith('63')) {
      // Format as "+63 912 345 6789"
      return `+63 ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5, 8)} ${digitsOnly.slice(8)}`;
    } else {
      // Format as "0912 345 6789"
      return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4, 7)} ${digitsOnly.slice(7)}`;
    }
  }