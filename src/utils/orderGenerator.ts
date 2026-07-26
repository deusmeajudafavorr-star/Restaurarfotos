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
 * Builds the WhatsApp direct link with formatted prefilled message
 */
export function buildWhatsAppUrl(phone: string, orderId: string, photoUrl?: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  let message = `Olá!

Acabei de solicitar a restauração da minha foto.

*Pedido:* ${orderId}`;

  if (photoUrl) {
    message += `\n*Link da Foto:* ${photoUrl}`;
  }

  message += `\n\nQuero receber minha foto restaurada e o vídeo!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
