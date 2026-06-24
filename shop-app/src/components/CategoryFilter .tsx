// src/components/CategoryFilter.tsx
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCategory } from '../store/uiSlice';

const CATEGORIES = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

export const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.ui.selectedCategory);

  return (
    <div className="list" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, max-content))', marginBottom: 16 }}>
      <button
        className="button"
        onClick={() => dispatch(setCategory(null))}
        style={{ fontWeight: selected === null ? 'bold' : 'normal' }}
      >
        Все
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className="button"
          onClick={() => dispatch(setCategory(cat))}
          style={{ fontWeight: selected === cat ? 'bold' : 'normal' }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};