/**
 * Phone and Fax Number Utilities for CareBridge
 * Standardizes phone and fax numbers for consistent storage and display
 */

/**
 * Standardizes a phone number to a consistent format
 * Handles various input formats and returns standardized format
 */
export function standardizePhoneNumber(phone: string | null | undefined): string | null {
  if (!phone || phone.trim() === '' || phone.trim() === ' ') {
    return null
  }

  // Handle asterisk notation for extensions (convert * to x)
  const cleaned = phone.replace(/\*/g, 'x').trim()
  
  // Handle "ext x" format by normalizing to just "x"
  const normalizedForExt = cleaned.replace(/\bext\s*x/gi, 'x')
  
  // Clean the input - split on extension markers
  const parts = normalizedForExt.split(/\s*x\s*/)
  const mainNumber = parts[0].replace(/[^\d]/g, '')
  const extension = parts.length > 1 ? parts[1].replace(/[^\d]/g, '') : null

  // Handle empty or whitespace-only strings
  if (!mainNumber) {
    return null
  }

  let formatted = ''

  // Handle different number lengths
  if (mainNumber.length === 10) {
    // Standard North American format: (XXX) XXX-XXXX
    formatted = `(${mainNumber.slice(0, 3)}) ${mainNumber.slice(3, 6)}-${mainNumber.slice(6)}`
  } else if (mainNumber.length === 11 && mainNumber.startsWith('1')) {
    // North American with country code: +1 (XXX) XXX-XXXX
    const areaCode = mainNumber.slice(1, 4)
    const exchange = mainNumber.slice(4, 7)
    const number = mainNumber.slice(7)
    formatted = `+1 (${areaCode}) ${exchange}-${number}`
  } else if (mainNumber.length === 7) {
    // Local 7-digit format: XXX-XXXX
    formatted = `${mainNumber.slice(0, 3)}-${mainNumber.slice(3)}`
  } else if (mainNumber.length >= 8) {
    // For longer numbers, try to format as (area) exchange-number
    if (mainNumber.length === 11) {
      // Assume first digit is country code
      formatted = `+1 (${mainNumber.slice(1, 4)}) ${mainNumber.slice(4, 7)}-${mainNumber.slice(7)}`
    } else {
      // Try to format with area code
      const areaCodeEnd = Math.min(3, mainNumber.length - 7)
      if (areaCodeEnd > 0 && mainNumber.length >= 10) {
        formatted = `(${mainNumber.slice(0, 3)}) ${mainNumber.slice(3, 6)}-${mainNumber.slice(6)}`
      } else {
        formatted = mainNumber
      }
    }
  } else {
    // If we can't standardize it, return the cleaned version
    formatted = mainNumber
  }

  // Add extension if present (take only the first extension for multiple)
  if (extension) {
    // For multiple extensions separated by spaces, take the first one
    const firstExt = extension.split(/\s+/)[0]
    return `${formatted} x${firstExt}`
  }

  return formatted
}

/**
 * Standardizes a fax number to a consistent format
 */
export function standardizeFaxNumber(fax: string | number | null | undefined): string | null {
  if (!fax) {
    return null
  }

  // Convert number to string
  const faxStr = typeof fax === 'number' ? fax.toString() : fax

  // Use the same standardization as phone numbers
  return standardizePhoneNumber(faxStr)
}

/**
 * Validates if a phone number appears to be valid
 */
export function isValidPhoneNumber(phone: string | null): boolean {
  if (!phone) return false
  
  const digitOnly = phone.replace(/\D/g, '')
  return digitOnly.length >= 7 && digitOnly.length <= 15
}

/**
 * Formats a phone number for display
 */
export function displayPhoneNumber(phone: string | null): string {
  if (!phone) return 'Not provided'
  return phone
}

/**
 * Extracts extension from a phone number
 */
export function extractExtension(phone: string | null): string | null {
  if (!phone) return null
  
  const extMatch = phone.match(/(?:x|ext|extension)[\s]*(\d+)/i)
  return extMatch ? extMatch[1] : null
}

/**
 * Removes extension from a phone number
 */
export function removeExtension(phone: string | null): string | null {
  if (!phone) return null
  
  return phone.replace(/(?:x|ext|extension)[\s]*\d+/i, '').trim()
} 