import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import Theme from '../../constants/Theme';
import { useWishlistStore } from '../../store/wishlistStore';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';

export default function WishlistScreen() {
  const router = useRouter();
  const { items: wishlistItems, clearWishlist } = useWishlistStore();
  
  const handleContinueShopping = () => {
    router.navigate('/');
  };
  
  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wishlist</Text>
        </View>
        
        <EmptyState
          title="Your wishlist is empty"
          message="Save items you like to your wishlist so you can easily find them later."
          icon="Heart"
          buttonText="Browse Products"
          onButtonPress={handleContinueShopping}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <Text style={styles.wishlistCount}>{wishlistItems.length} items</Text>
      </View>
      
      <FlatList
        data={wishlistItems}
        renderItem={({ item }) => (
          <ProductCard product={item} horizontal={true} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      {wishlistItems.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={clearWishlist}
          >
            <Text style={styles.clearButtonText}>Clear Wishlist</Text>
          </TouchableOpacity>
        </View>
      )}
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
  wishlistCount: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.neutral[600],
    fontFamily: 'Inter-Regular',
    marginTop: Theme.spacing.xs,
  },
  listContent: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  footer: {
    padding: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[200],
    backgroundColor: Theme.colors.white,
  },
  clearButton: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
  },
  clearButtonText: {
    color: Theme.colors.error[500],
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
});