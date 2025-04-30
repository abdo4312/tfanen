import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../constants/Theme';
import { useCartStore } from '../store/cartStore';

interface OrderSummaryProps {
  onCheckout?: () => void;
  showCheckoutButton?: boolean;
}

export default function OrderSummary({ 
  onCheckout,
  showCheckoutButton = true 
}: OrderSummaryProps) {
  const { items, getTotalPrice } = useCartStore();
  
  // Calculate subtotal
  const subtotal = getTotalPrice();
  
  // Calculate tax (5%)
  const tax = subtotal * 0.05;
  
  // Calculate shipping (free over $50, otherwise $5)
  const shipping = subtotal > 50 ? 0 : 5;
  
  // Calculate total
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Tax (5%)</Text>
        <Text style={styles.value}>${tax.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Shipping</Text>
        <Text style={styles.value}>
          {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
        </Text>
      </View>
      
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
      
      {showCheckoutButton && (
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={onCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.small,
  },
  title: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    marginBottom: Theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  label: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
  },
  value: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[200],
    marginTop: Theme.spacing.sm,
    paddingTop: Theme.spacing.sm,
  },
  totalLabel: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
  },
  totalValue: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary[600],
  },
  checkoutButton: {
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  checkoutButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
  },
});