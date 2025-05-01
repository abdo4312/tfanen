import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCartIcon } from 'lucide-react-native';
import Theme from '../../constants/Theme';
import { useCartStore } from '../../store/cartStore';
import CartItem from '../../components/CartItem';
import OrderSummary from '../../components/OrderSummary';
import EmptyState from '../../components/EmptyState';

export default function CartScreen() {
  const router = useRouter();
  const { items, getTotalItems, clearCart } = useCartStore();
  
  const handleContinueShopping = () => {
    router.navigate('/');
  };
  
  const handleCheckout = () => {
    router.push('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Cart</Text>
        </View>
        
        <EmptyState
          title="Your cart is empty"
          message="Looks like you haven't added any products to your cart yet."
          icon="ShoppingCart"
          buttonText="Start Shopping"
          onButtonPress={handleContinueShopping}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <Text style={styles.cartCount}>{getTotalItems()} items</Text>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.cartItemsContainer}>
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </View>
        
        <OrderSummary onCheckout={handleCheckout} />
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinueShopping}
          >
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={clearCart}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.md,
  },
  headerTitle: {
    fontSize: Theme.fontSize.title,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  cartCount: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
    fontFamily: 'Inter-Regular',
    marginTop: Theme.spacing.xs,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xl,
  },
  cartItemsContainer: {
    padding: Theme.spacing.md,
  },
  actionsContainer: {
    padding: Theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  continueButton: {
    flex: 1,
    backgroundColor: Theme.colors.secondary[500],
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  continueButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
  clearButton: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
    marginLeft: Theme.spacing.sm,
  },
  clearButtonText: {
    color: Theme.colors.error[500],
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
});