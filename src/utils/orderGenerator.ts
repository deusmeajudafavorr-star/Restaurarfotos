/**
 * Generates a dynamic order code in format #L12345 (e.g. #A48291, #P19382, #R82015)
 */
export function generateOrderCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
  const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
  return `#${randomLetter}${randomDigits}`;
}

/**
 * Formats a raw input string into Brazilian phone number format (XX) XXXXX-XXXX
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  const truncated = digits.slice(0, 11);

  if (truncated.length === 0) return '';
  if (truncated.length <= 2) {
    return `(${truncated}`;
  }
  if (truncated.length <= 7) {
    return `(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
  }
  return `(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
}

/**
 * Builds the WhatsApp direct link with formatted prefilled message
 */
export function buildWhatsAppUrl(phone: string, orderId: string, photoUrl?: string, clientPhone?: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  let message = `Olá!

Acabei de solicitar a restauração da minha foto.

*Pedido:* ${orderId}`;

  if (clientPhone) {
    message += `\n*Telefone do Cliente:* ${clientPhone}`;
  }

  if (photoUrl) {
    message += `\n*Link da Foto:* ${photoUrl}`;
  }

  message += `\n\nQuero receber minha foto restaurada e o vídeo!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
