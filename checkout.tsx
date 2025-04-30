import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, CreditCard, Banknote, CheckCircle2 } from 'lucide-react-native';
import Theme from '../constants/Theme';
import { useCartStore } from '../store/cartStore';
import OrderSummary from '../components/OrderSummary';
import { sendWhatsAppMessage, generateOrderMessage } from '../utils/whatsapp';
import { initiatePayment } from '../utils/payment';

type PaymentMethod = 'instapay' | 'vodafone' | 'cash';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  
  // Calculate totals
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.05;
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + tax + shipping;
  
  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };
  
  const isShippingFormValid = () => {
    return (
      shippingInfo.name.trim() !== '' &&
      shippingInfo.phone.trim() !== '' &&
      shippingInfo.address.trim() !== '' &&
      shippingInfo.city.trim() !== ''
    );
  };
  
  const handleContinueToPayment = () => {
    if (!isShippingFormValid()) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    
    setStep('payment');
  };
  
  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };
  
  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      // Handle online payment if selected
      if (paymentMethod !== 'cash') {
        const paymentResult = await initiatePayment(paymentMethod, total);
        
        if (!paymentResult.success) {
          Alert.alert('Payment Error', paymentResult.message);
          setLoading(false);
          return;
        }
        
        // Display payment instructions
        Alert.alert('Payment Instructions', paymentResult.message);
      }
      
      // Generate WhatsApp message
      const message = generateOrderMessage(
        items,
        subtotal,
        tax,
        shipping,
        total,
        paymentMethod === 'cash' ? 'Pay on Delivery' : 
        paymentMethod === 'instapay' ? 'InstaPay' : 'Vodafone Cash'
      );
      
      // Move to confirmation step
      setStep('confirmation');
      setLoading(false);
      
      // After a brief delay, send the WhatsApp message
      setTimeout(() => {
        sendWhatsAppMessage(message);
      }, 1500);
      
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  
  const handleFinish = () => {
    clearCart();
    router.navigate('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        {step !== 'confirmation' && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => {
              if (step === 'payment') {
                setStep('shipping');
              } else {
                router.back();
              }
            }}
          >
            <ArrowLeft size={24} color={Theme.colors.neutral[700]} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {step === 'shipping' ? 'Shipping Details' : 
           step === 'payment' ? 'Payment Method' : 
           'Order Confirmation'}
        </Text>
        <View style={{ width: 40 }} />
      </View>
      
      <View style={styles.stepIndicator}>
        <View style={[styles.stepCircle, { backgroundColor: Theme.colors.primary[500] }]}>
          <Text style={styles.stepNumber}>1</Text>
        </View>
        <View style={[
          styles.stepLine, 
          { backgroundColor: step === 'shipping' ? Theme.colors.neutral[300] : Theme.colors.primary[500] }
        ]} />
        <View style={[
          styles.stepCircle, 
          { backgroundColor: step === 'shipping' ? Theme.colors.neutral[300] : Theme.colors.primary[500] }
        ]}>
          <Text style={styles.stepNumber}>2</Text>
        </View>
        <View style={[
          styles.stepLine, 
          { backgroundColor: step === 'confirmation' ? Theme.colors.primary[500] : Theme.colors.neutral[300] }
        ]} />
        <View style={[
          styles.stepCircle, 
          { backgroundColor: step === 'confirmation' ? Theme.colors.primary[500] : Theme.colors.neutral[300] }
        ]}>
          <Text style={styles.stepNumber}>3</Text>
        </View>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {step === 'shipping' && (
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name*</Text>
              <TextInput
                style={styles.input}
                value={shippingInfo.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Enter your full name"
                placeholderTextColor={Theme.colors.neutral[400]}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number*</Text>
              <TextInput
                style={styles.input}
                value={shippingInfo.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="Enter your phone number"
                placeholderTextColor={Theme.colors.neutral[400]}
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Street Address*</Text>
              <TextInput
                style={styles.input}
                value={shippingInfo.address}
                onChangeText={(value) => handleInputChange('address', value)}
                placeholder="Enter your street address"
                placeholderTextColor={Theme.colors.neutral[400]}
              />
            </View>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: Theme.spacing.sm }]}>
                <Text style={styles.label}>City*</Text>
                <TextInput
                  style={styles.input}
                  value={shippingInfo.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  placeholder="City"
                  placeholderTextColor={Theme.colors.neutral[400]}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: Theme.spacing.sm }]}>
                <Text style={styles.label}>State/Province</Text>
                <TextInput
                  style={styles.input}
                  value={shippingInfo.state}
                  onChangeText={(value) => handleInputChange('state', value)}
                  placeholder="State"
                  placeholderTextColor={Theme.colors.neutral[400]}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Zip/Postal Code</Text>
              <TextInput
                style={styles.input}
                value={shippingInfo.zipCode}
                onChangeText={(value) => handleInputChange('zipCode', value)}
                placeholder="Zip Code"
                placeholderTextColor={Theme.colors.neutral[400]}
                keyboardType="numeric"
              />
            </View>
            
            <OrderSummary showCheckoutButton={false} />
            
            <TouchableOpacity 
              style={styles.continueButton} 
              onPress={handleContinueToPayment}
            >
              <Text style={styles.continueButtonText}>Continue to Payment</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {step === 'payment' && (
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentTitle}>Select Payment Method</Text>
            
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                paymentMethod === 'instapay' && styles.selectedPaymentOption
              ]}
              onPress={() => handleSelectPaymentMethod('instapay')}
            >
              <View style={styles.paymentOptionIcon}>
                <CreditCard size={24} color={Theme.colors.primary[500]} />
              </View>
              <View style={styles.paymentOptionContent}>
                <Text style={styles.paymentOptionTitle}>InstaPay</Text>
                <Text style={styles.paymentOptionDescription}>
                  Account: +201066334002
                </Text>
              </View>
              <View style={[
                styles.paymentCheckmark,
                paymentMethod === 'instapay' && styles.selectedCheckmark
              ]}>
                {paymentMethod === 'instapay' && (
                  <CheckCircle2 size={20} color={Theme.colors.white} />
                )}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                paymentMethod === 'vodafone' && styles.selectedPaymentOption
              ]}
              onPress={() => handleSelectPaymentMethod('vodafone')}
            >
              <View style={styles.paymentOptionIcon}>
                <CreditCard size={24} color={Theme.colors.primary[500]} />
              </View>
              <View style={styles.paymentOptionContent}>
                <Text style={styles.paymentOptionTitle}>Vodafone Cash</Text>
                <Text style={styles.paymentOptionDescription}>
                  Account: +201066334002 (1% fee)
                </Text>
              </View>
              <View style={[
                styles.paymentCheckmark,
                paymentMethod === 'vodafone' && styles.selectedCheckmark
              ]}>
                {paymentMethod === 'vodafone' && (
                  <CheckCircle2 size={20} color={Theme.colors.white} />
                )}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                paymentMethod === 'cash' && styles.selectedPaymentOption
              ]}
              onPress={() => handleSelectPaymentMethod('cash')}
            >
              <View style={styles.paymentOptionIcon}>
                <Banknote size={24} color={Theme.colors.primary[500]} />
              </View>
              <View style={styles.paymentOptionContent}>
                <Text style={styles.paymentOptionTitle}>Pay on Delivery</Text>
                <Text style={styles.paymentOptionDescription}>
                  Pay with cash when your order arrives
                </Text>
              </View>
              <View style={[
                styles.paymentCheckmark,
                paymentMethod === 'cash' && styles.selectedCheckmark
              ]}>
                {paymentMethod === 'cash' && (
                  <CheckCircle2 size={20} color={Theme.colors.white} />
                )}
              </View>
            </TouchableOpacity>
            
            <OrderSummary showCheckoutButton={false} />
            
            <TouchableOpacity 
              style={styles.placeOrderButton} 
              onPress={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={Theme.colors.white} />
              ) : (
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        
        {step === 'confirmation' && (
          <View style={styles.confirmationContainer}>
            <View style={styles.successIcon}>
              <CheckCircle2 size={64} color={Theme.colors.success[500]} />
            </View>
            
            <Text style={styles.confirmationTitle}>Order Placed Successfully!</Text>
            <Text style={styles.confirmationMessage}>
              Your order has been placed successfully and the details have been sent via WhatsApp.
            </Text>
            
            <View style={styles.orderSummaryContainer}>
              <Text style={styles.orderDetailsTitle}>Order Details</Text>
              
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Payment Method:</Text>
                <Text style={styles.orderDetailValue}>
                  {paymentMethod === 'cash' ? 'Pay on Delivery' : 
                   paymentMethod === 'instapay' ? 'InstaPay' : 'Vodafone Cash'}
                </Text>
              </View>
              
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Items:</Text>
                <Text style={styles.orderDetailValue}>{items.length}</Text>
              </View>
              
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Total:</Text>
                <Text style={styles.orderDetailValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.finishButton} 
              onPress={handleFinish}
            >
              <Text style={styles.finishButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[100],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.small,
  },
  headerTitle: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  stepLine: {
    width: 50,
    height: 2,
    backgroundColor: Theme.colors.neutral[300],
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xl,
  },
  formContainer: {
    padding: Theme.spacing.md,
  },
  formGroup: {
    marginBottom: Theme.spacing.md,
  },
  formRow: {
    flexDirection: 'row',
  },
  label: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    marginBottom: Theme.spacing.xs,
    fontFamily: 'Inter-Medium',
  },
  input: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
    padding: Theme.spacing.md,
    fontSize: Theme.fontSize.md,
    fontFamily: 'Inter-Regular',
  },
  continueButton: {
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  continueButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  paymentContainer: {
    padding: Theme.spacing.md,
  },
  paymentTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    marginBottom: Theme.spacing.md,
    fontFamily: 'Inter-Bold',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  selectedPaymentOption: {
    borderColor: Theme.colors.primary[500],
    borderWidth: 2,
  },
  paymentOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentOptionContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  paymentOptionTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
  paymentOptionDescription: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[600],
    marginTop: Theme.spacing.xs,
    fontFamily: 'Inter-Regular',
  },
  paymentCheckmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
  },
  selectedCheckmark: {
    backgroundColor: Theme.colors.primary[500],
    borderColor: Theme.colors.primary[500],
  },
  placeOrderButton: {
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  placeOrderButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  confirmationContainer: {
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  successIcon: {
    marginVertical: Theme.spacing.xl,
  },
  confirmationTitle: {
    fontSize: Theme.fontSize.title,
    fontWeight: Theme.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
    fontFamily: 'Inter-Bold',
  },
  confirmationMessage: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    fontFamily: 'Inter-Regular',
  },
  orderSummaryContainer: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    width: '100%',
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.small,
  },
  orderDetailsTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    marginBottom: Theme.spacing.md,
    fontFamily: 'Inter-Bold',
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  orderDetailLabel: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
  orderDetailValue: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
  finishButton: {
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  finishButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
});