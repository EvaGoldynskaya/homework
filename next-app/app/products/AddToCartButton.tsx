'use client';

import { useState } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { Product } from '../lib/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ 
  product, 
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      addItem(product, 1);
      
      setIsAdded(true);
      setIsLoading(false);
      
      setTimeout(() => setIsAdded(false), 2000);
    }, 300);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`
        px-4 py-2 rounded-lg font-semibold transition-all
        ${isAdded 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {isLoading ? '⏳ Добавление...' : isAdded ? '✅ В корзине' : '🛒 Добавить в корзину'}
    </button>
  );
}