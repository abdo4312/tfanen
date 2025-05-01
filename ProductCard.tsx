import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, ShoppingCart } from 'lucide-react-native';
import { Product } from '../models/types';
import Theme from '../constants/Theme';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - (Theme.spacing.md * 3)) / 2;

export default function ProductCard({ product, horizontal = false }: ProductCardProps) {
  const router = useRouter();
  const { addItem, isInCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    addItem(product, 1);
  };
  
  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const navigateToProduct = () => {
    router.push(`/product/${product.id}`);
  };

  if (horizontal) {
    return (
      <TouchableOpacity 
        style={styles.horizontalCard} 
        onPress={navigateToProduct}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: product.image }} 
          style={styles.horizontalImage} 
          resizeMode="cover"
        />
        <View style={styles.horizontalContent}>
          <View>
            <Text numberOfLines={2} style={styles.title}>{product.name}</Text>
            <View style={styles.priceContainer}>
              {product.discountPrice ? (
                <>
                  <Text style={styles.discountPrice}>
                    ${product.discountPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.originalPrice}>
                    ${product.price.toFixed(2)}
                  </Text>
                </>
              ) : (
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              )}
            </View>
          </View>
          <View style={styles.horizontalActions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleToggleWishlist}
            >
              <Heart 
                size={20} 
                color={inWishlist ? Theme.colors.primary[500] : Theme.colors.neutral[600]} 
                fill={inWishlist ? Theme.colors.primary[500] : 'none'}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.cartButton,
                isInCart(product.id) ? styles.inCartButton : {}
              ]} 
              onPress={handleAddToCart}
            >
              <ShoppingCart size={16} color={Theme.colors.white} />
              <Text style={styles.cartButtonText}>
                {isInCart(product.id) ? 'Added' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={navigateToProduct}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.wishlistButton} 
          onPress={handleToggleWishlist}
        >
          <Heart 
            size={18} 
            color={inWishlist ? Theme.colors.primary[500] : Theme.colors.neutral[600]} 
            fill={inWishlist ? Theme.colors.primary[500] : 'none'}
          />
        </TouchableOpacity>
        {product.isNew && (
          <View style={styles.badgeNew}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
        {product.isBestseller && (
          <View style={styles.badgeBestseller}>
            <Text style={styles.badgeText}>BEST</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>{product.name}</Text>
        <View style={styles.priceContainer}>
          {product.discountPrice ? (
            <>
              <Text style={styles.discountPrice}>
                ${product.discountPrice.toFixed(2)}
              </Text>
              <Text style={styles.originalPrice}>
                ${product.price.toFixed(2)}
              </Text>
            </>
          ) : (
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          )}
        </View>
        <TouchableOpacity 
          style={[
            styles.addButton,
            isInCart(product.id) ? styles.inCartButton : {}
          ]} 
          onPress={handleAddToCart}
        >
          <ShoppingCart size={14} color={Theme.colors.white} />
          <Text style={styles.addButtonText}>
            {isInCart(product.id) ? 'Added' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    ...Theme.shadows.small,
    marginBottom: Theme.spacing.md,
  },
  imageContainer: {
    height: cardWidth * 1.1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    marginBottom: Theme.spacing.xs,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  price: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.neutral[800],
  },
  discountPrice: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary[600],
    marginRight: Theme.spacing.xs,
  },
  originalPrice: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.neutral[500],
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.sm,
    paddingVertical: Theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inCartButton: {
    backgroundColor: Theme.colors.success[500],
  },
  addButtonText: {
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.medium,
    marginLeft: Theme.spacing.xs,
    fontSize: Theme.fontSize.sm,
  },
  wishlistButton: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.full,
    padding: Theme.spacing.xs,
    ...Theme.shadows.small,
  },
  badgeNew: {
    position: 'absolute',
    top: Theme.spacing.sm,
    left: Theme.spacing.sm,
    backgroundColor: Theme.colors.secondary[500],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  badgeBestseller: {
    position: 'absolute',
    top: Theme.spacing.sm,
    left: Theme.spacing.sm,
    backgroundColor: Theme.colors.warning[500],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  badgeText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.bold,
  },
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    ...Theme.shadows.small,
    marginBottom: Theme.spacing.md,
    height: 120,
  },
  horizontalImage: {
    width: 120,
    height: '100%',
  },
  horizontalContent: {
    flex: 1,
    padding: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  horizontalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    padding: Theme.spacing.xs,
  },
  cartButton: {
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.sm,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButtonText: {
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.medium,
    marginLeft: Theme.spacing.xs,
    fontSize: Theme.fontSize.sm,
  },
});