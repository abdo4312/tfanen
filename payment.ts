import { Linking } from 'react-native';

// Payment accounts
const INSTAPAY_ACCOUNT = '+201066334002';
const VODAFONE_CASH_ACCOUNT = '+201066334002';

/**
 * Open the appropriate payment app or show instructions
 */
export async function initiatePayment(
  method: 'instapay' | 'vodafone',
  amount: number
): Promise<{ success: boolean; message: string }> {
  try {
    switch (method) {
      case 'instapay':
        // For Instapay, we'd ideally deep link to the app but we'll return instructions
        return {
          success: true,
          message: `Please open your InstaPay app and send ${amount.toFixed(2)} EGP to account ${INSTAPAY_ACCOUNT}.`,
        };
        
      case 'vodafone':
        // Calculate amount with 1% fee
        const amountWithFee = amount * 1.01;
        
        // For Vodafone Cash, similar approach
        return {
          success: true,
          message: `Please send ${amountWithFee.toFixed(2)} EGP (including 1% fee) to Vodafone Cash account ${VODAFONE_CASH_ACCOUNT}.`,
        };
        
      default:
        return {
          success: false,
          message: 'Unsupported payment method.',
        };
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while initiating payment.',
    };
  }
}

/**
 * Generate a PDF invoice and return the URI
 * This is a mock function that would typically create a PDF
 */
export function generateInvoice(
  orderItems: any[],
  customerInfo: any,
  orderTotal: number,
  paymentMethod: string
): { success: boolean; invoiceData?: string } {
  // In a real implementation, this would generate an actual PDF
  // For now, we'll just return a success message
  return {
    success: true,
    invoiceData: `Order #${Math.floor(Math.random() * 10000)} - ${new Date().toLocaleString()}`,
  };
}