import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Minus, 
  Plus, 
  ShoppingCart 
} from 'lucide-react-native';
import Theme from '../../constants/Theme';
import { Products } from '../../constants/Data';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addItem, isInCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(Products.find(p => p.id === id));
  
  const isInWishlistAlready = product ? isInWishlist(product.id) : false;
  
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Theme.colors.neutral[700]} />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Product not found</Text>
          <TouchableOpacity 
            style={styles.goBackButton} 
            onPress={() => router.push('/')}
          >
            <Text style={styles.goBackButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const handleToggleWishlist = () => {
    if (isInWishlistAlready) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleShare = () => {
    // In a real app, implement share functionality
    console.log('Share pressed');
  };
  
  const price = product.discountPrice ?? product.price;
  const totalPrice = price * quantity;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Theme.colors.neutral[700]} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleToggleWishlist}
          >
            <Heart 
              size={24} 
              color={isInWishlistAlready ? Theme.colors.primary[500] : Theme.colors.neutral[700]} 
              fill={isInWishlistAlready ? Theme.colors.primary[500] : 'none'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleShare}
          >
            <Share2 size={24} color={Theme.colors.neutral[700]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.productImage} 
            resizeMode="cover"
          />
          
          {product.discountPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                -{Math.round((1 - product.discountPrice / product.price) * 100)}%
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star}
                  size={16} 
                  color={star <= product.rating ? Theme.colors.warning[500] : Theme.colors.neutral[300]} 
                  fill={star <= product.rating ? Theme.colors.warning[500] : 'none'}
                />
              ))}
            </View>
            <Text style={styles.reviewCount}>{product.reviews} reviews</Text>
          </View>
          
          <View style={styles.priceContainer}>
            {product.discountPrice ? (
              <>
                <Text style={styles.currentPrice}>
                  ${product.discountPrice.toFixed(2)}
                </Text>
                <Text style={styles.originalPrice}>
                  ${product.price.toFixed(2)}
                </Text>
              </>
            ) : (
              <Text style={styles.currentPrice}>${product.price.toFixed(2)}</Text>
            )}
          </View>
          
          <View style={styles.stockInfo}>
            <Text style={[
              styles.stockText,
              { color: product.stock > 0 ? Theme.colors.success[500] : Theme.colors.error[500] }
            ]}>
              {product.stock > 0 
                ? `In Stock (${product.stock} available)` 
                : 'Out of Stock'}
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.featuresTitle}>Features</Text>
          <View style={styles.featuresList}>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={handleDecreaseQuantity}
          >
            <Minus size={20} color={Theme.colors.neutral[700]} />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={handleIncreaseQuantity}
          >
            <Plus size={20} color={Theme.colors.neutral[700]} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.addToCartButton,
            isInCart(product.id) && styles.inCartButton
          ]} 
          onPress={handleAddToCart}
        >
          <ShoppingCart size={20} color={Theme.colors.white} />
          <Text style={styles.addToCartText}>
            {isInCart(product.id) 
              ? 'Added to Cart' 
              : `Add to Cart · $${totalPrice.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
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
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Theme.spacing.sm,
    ...Theme.shadows.small,
  },
  imageContainer: {
    width: width,
    height: width,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: Theme.spacing.md,
    left: Theme.spacing.md,
    backgroundColor: Theme.colors.error[500],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.md,
  },
  discountText: {
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  productInfo: {
    padding: Theme.spacing.lg,
  },
  productName: {
    fontSize: Theme.fontSize.title,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
    marginBottom: Theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: Theme.spacing.sm,
  },
  reviewCount: {
    color: Theme.colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  currentPrice: {
    fontSize: Theme.fontSize.title,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
    color: Theme.colors.primary[600],
    marginRight: Theme.spacing.sm,
  },
  originalPrice: {
    fontSize: Theme.fontSize.lg,
    color: Theme.colors.neutral[500],
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Regular',
  },
  stockInfo: {
    marginBottom: Theme.spacing.md,
  },
  stockText: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.neutral[200],
    marginVertical: Theme.spacing.md,
  },
  descriptionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
    marginBottom: Theme.spacing.sm,
  },
  descriptionText: {
    fontSize: Theme.fontSize.md,
    lineHeight: 22,
    color: Theme.colors.neutral[700],
    fontFamily: 'Inter-Regular',
  },
  featuresTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    fontFamily: 'Inter-Bold',
    marginBottom: Theme.spacing.sm,
  },
  featuresList: {
    marginBottom: Theme.spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary[500],
    marginRight: Theme.spacing.sm,
  },
  featureText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[700],
    fontFamily: 'Inter-Regular',
  },
  footer: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[200],
    backgroundColor: Theme.colors.white,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: Theme.borderRadius.md,
    marginRight: Theme.spacing.md,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    width: 30,
    textAlign: 'center',
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
  },
  inCartButton: {
    backgroundColor: Theme.colors.success[500],
  },
  addToCartText: {
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.bold,
    marginLeft: Theme.spacing.sm,
    fontFamily: 'Inter-Bold',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  notFoundText: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    marginBottom: Theme.spacing.lg,
    fontFamily: 'Inter-Bold',
  },
  goBackButton: {
    backgroundColor: Theme.colors.primary[500],
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.md,
  },
  goBackButtonText: {
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
});