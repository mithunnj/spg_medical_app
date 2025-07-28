/**
 * CareBridge Phone Utilities Tests
 * Tests for phone and fax number standardization
 */

import {
  standardizePhoneNumber,
  standardizeFaxNumber,
  isValidPhoneNumber,
  displayPhoneNumber,
  extractExtension,
  removeExtension
} from '../lib/phone-utils'

describe('Phone Utilities', () => {
  describe('standardizePhoneNumber', () => {
    test('handles standard 10-digit North American numbers', () => {
      expect(standardizePhoneNumber('5146962442')).toBe('(514) 696-2442')
      expect(standardizePhoneNumber('514-696-2442')).toBe('(514) 696-2442')
      expect(standardizePhoneNumber('(514) 696-2442')).toBe('(514) 696-2442')
      expect(standardizePhoneNumber('514.696.2442')).toBe('(514) 696-2442')
    })

    test('handles 11-digit numbers with country code', () => {
      expect(standardizePhoneNumber('15146962442')).toBe('+1 (514) 696-2442')
      expect(standardizePhoneNumber('1-514-696-2442')).toBe('+1 (514) 696-2442')
    })

    test('handles numbers with extensions', () => {
      expect(standardizePhoneNumber('(514) 413-8777 x 24400')).toBe('(514) 413-8777 x24400')
      expect(standardizePhoneNumber('450-759-8222 ext x2787')).toBe('(450) 759-8222 x2787')
      expect(standardizePhoneNumber('5144138777x24400')).toBe('(514) 413-8777 x24400')
    })

    test('handles 7-digit local numbers', () => {
      expect(standardizePhoneNumber('6962442')).toBe('696-2442')
      expect(standardizePhoneNumber('696-2442')).toBe('696-2442')
    })

    test('handles null, undefined, and empty strings', () => {
      expect(standardizePhoneNumber(null)).toBe(null)
      expect(standardizePhoneNumber(undefined)).toBe(null)
      expect(standardizePhoneNumber('')).toBe(null)
      expect(standardizePhoneNumber(' ')).toBe(null)
      expect(standardizePhoneNumber('   ')).toBe(null)
    })

    test('handles complex phone number formats from clinic data', () => {
      expect(standardizePhoneNumber('(819) 966-6100*333059 *333057')).toBe('(819) 966-6100 x333059')
      expect(standardizePhoneNumber('(418) 962-9761*452070')).toBe('(418) 962-9761 x452070')
      expect(standardizePhoneNumber('5144138700*2')).toBe('(514) 413-8700 x2')
    })

    test('handles malformed or unusual formats', () => {
      expect(standardizePhoneNumber('514.905.9091')).toBe('(514) 905-9091')
      expect(standardizePhoneNumber('418 724-8591')).toBe('(418) 724-8591')
      expect(standardizePhoneNumber(' 450-434-8006')).toBe('(450) 434-8006')
    })
  })

  describe('standardizeFaxNumber', () => {
    test('handles string fax numbers', () => {
      expect(standardizeFaxNumber('514-624-3099')).toBe('(514) 624-3099')
      expect(standardizeFaxNumber('514.624.3099')).toBe('(514) 624-3099')
    })

    test('handles numeric fax numbers', () => {
      expect(standardizeFaxNumber(4186964673)).toBe('(418) 696-4673')
    })

    test('handles null and undefined fax numbers', () => {
      expect(standardizeFaxNumber(null)).toBe(null)
      expect(standardizeFaxNumber(undefined)).toBe(null)
    })
  })

  describe('isValidPhoneNumber', () => {
    test('validates correct phone numbers', () => {
      expect(isValidPhoneNumber('(514) 696-2442')).toBe(true)
      expect(isValidPhoneNumber('+1 (514) 696-2442')).toBe(true)
      expect(isValidPhoneNumber('696-2442')).toBe(true)
    })

    test('rejects invalid phone numbers', () => {
      expect(isValidPhoneNumber(null)).toBe(false)
      expect(isValidPhoneNumber('')).toBe(false)
      expect(isValidPhoneNumber('123')).toBe(false)
      expect(isValidPhoneNumber('123456789012345678')).toBe(false)
    })
  })

  describe('displayPhoneNumber', () => {
    test('displays phone numbers correctly', () => {
      expect(displayPhoneNumber('(514) 696-2442')).toBe('(514) 696-2442')
      expect(displayPhoneNumber(null)).toBe('Not provided')
    })
  })

  describe('extractExtension', () => {
    test('extracts extensions correctly', () => {
      expect(extractExtension('(514) 413-8777 x 24400')).toBe('24400')
      expect(extractExtension('450-759-8222 ext 2787')).toBe('2787')
      expect(extractExtension('(819) 966-6100 extension 333059')).toBe('333059')
      expect(extractExtension('(514) 696-2442')).toBe(null)
      expect(extractExtension(null)).toBe(null)
    })
  })

  describe('removeExtension', () => {
    test('removes extensions correctly', () => {
      expect(removeExtension('(514) 413-8777 x 24400')).toBe('(514) 413-8777')
      expect(removeExtension('450-759-8222 ext 2787')).toBe('450-759-8222')
      expect(removeExtension('(514) 696-2442')).toBe('(514) 696-2442')
      expect(removeExtension(null)).toBe(null)
    })
  })
}) 