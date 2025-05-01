import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { CartItem as CartItemType } from '../models/types';
import Theme from '../constants/Theme';
import { useCartStore } from '../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;
  
  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      handleRemove();
    }
  };
  
  const handleRemove = () => {
    removeItem(product.id);
  };
  
  const price = product.discountPrice ?? product.price;
  const totalPrice = price * quantity;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <Trash2 size={16} color={Theme.colors.neutral[500]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {product.discountPrice && (
            <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
          )}
        </View>
        
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleDecreaseQuantity}
            >
              <Minus size={16} color={Theme.colors.neutral[700]} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleIncreaseQuantity}
            >
              <Plus size={16} color={Theme.colors.neutral[700]} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.small,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  removeButton: {
    padding: Theme.spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.xs,
  },
  price: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    marginRight: Theme.spacing.xs,
  },
  originalPrice: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[500],
    textDecorationLine: 'line-through',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: Theme.borderRadius.sm,
  },
  quantityButton: {
    padding: Theme.spacing.sm,
  },
  quantity: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    paddingHorizontal: Theme.spacing.sm,
  },
  totalPrice: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary[600],
  },
});