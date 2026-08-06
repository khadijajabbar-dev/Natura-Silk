/**
 * Cleans a raw phone number and converts local Pakistani format (03xxxxxxxxx)
 * to international WhatsApp format (923xxxxxxxxx).
 */
export function getWhatsAppNumber(rawNumber) {
  if (!rawNumber) return '';
  let digits = String(rawNumber).replace(/[^0-9]/g, '');
  if (!digits) return '';

  // Remove leading '00' if typed as 0092...
  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  // If local Pakistani format e.g. 03097912809 (11 digits starting with 03),
  // replace leading 0 with 92 -> 923097912809
  if (digits.startsWith('03') && digits.length === 11) {
    digits = '92' + digits.slice(1);
  } else if (digits.startsWith('0') && digits.length > 9) {
    // General fallback for numbers starting with 0
    digits = '92' + digits.slice(1);
  }

  return digits;
}

/**
 * Generates the correct WhatsApp URL that opens directly in WhatsApp Web on Desktop
 * without the intermediate landing page, and directly in WhatsApp App on Mobile.
 */
export function getWhatsAppUrl(rawNumber, message = '') {
  const phone = getWhatsAppNumber(rawNumber);
  if (!phone) return '';

  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  );

  if (isMobile) {
    const textQuery = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${phone}${textQuery}`;
  } else {
    // On Desktop, web.whatsapp.com loads directly into the chat without the wa.me interstitial screen
    const textQuery = message ? `&text=${encodeURIComponent(message)}` : '';
    return `https://web.whatsapp.com/send?phone=${phone}${textQuery}`;
  }
}
