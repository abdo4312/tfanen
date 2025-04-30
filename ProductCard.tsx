// components/ProductCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Star } from 'lucide-react-native';
import Theme from '../constants/Theme.js';  // Añadida extensión .js

const ProductCard = ({ product }) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push({
      pathname: '/product/[id]',
      params: { id: product.id }
    });
  };
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
       
        {/* Badges */}
        <View style={styles.badgeContainer}>
          {product.isNew && (
            <View style={[styles.badge, styles.newBadge]}>
              <Text style={styles.badgeText}>NEW</Text>
            </View>
          )}
         
          {product.isBestseller && (
            <View style={[styles.badge, styles.bestsellerBadge]}>
              <Text style={styles.badgeText}>POPULAR</Text>
            </View>
          )}
        </View>
      </View>
     
      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
       
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FFD700" fill="#FFD700" />
          <Text style={styles.rating}>{product.rating}</Text>
        </View>
       
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radius.md,
    overflow: 'hidden',
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: Theme.radius.sm,
    marginBottom: 4,
  },
  newBadge: {
    backgroundColor: Theme.colors.primary[500],
  },
  bestsellerBadge: {
    backgroundColor: '#FF8A00',
  },
  badgeText: {
    color: Theme.colors.white,
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  detailsContainer: {
    padding: Theme.spacing.sm,
  },
  name: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[800],
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.neutral[600],
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  price: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[900],
    fontFamily: 'Inter-SemiBold',
  },
});

export default ProductCard;