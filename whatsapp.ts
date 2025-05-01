import { Linking } from 'react-native';
import { CartItem } from '../models/types';

// WhatsApp number for sending orders
const WHATSAPP_NUMBER = '+201026274235';

/**
 * Generate order message for WhatsApp
 */
export function generateOrderMessage(
  items: CartItem[],
  subtotal: number,
  tax: number,
  shipping: number,
  total: number,
  paymentMethod: string
): string {
  let message = '📝 *New Order*\n\n';
  
  // Add items details
  message += '*Order Items:*\n';
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.product.name} x${item.quantity} - $${(
      (item.product.discountPrice ?? item.product.price) * item.quantity
    ).toFixed(2)}\n`;
  });
  
  // Add order summary
  message += '\n*Order Summary:*\n';
  message += `Subtotal: $${subtotal.toFixed(2)}\n`;
  message += `Tax (5%): $${tax.toFixed(2)}\n`;
  message += `Shipping: ${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}\n`;
  message += `Total: $${total.toFixed(2)}\n\n`;
  
  // Add payment method
  message += `*Payment Method:* ${paymentMethod}\n\n`;
  
  // Add thank you message
  message += 'Thank you for your order! Please provide your delivery address to complete your purchase.';
  
  return message;
}

/**
 * Open WhatsApp with pre-filled message
 */
export async function sendWhatsAppMessage(message: string): Promise<boolean> {
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
  
  // Check if WhatsApp is installed
  const canOpen = await Linking.canOpenURL(whatsappUrl);
  
  if (canOpen) {
    await Linking.openURL(whatsappUrl);
    return true;
  } else {
    // Fallback to web WhatsApp
    const webWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    await Linking.openURL(webWhatsappUrl);
    return true;
  }
}