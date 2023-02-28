import { useState } from 'react';
import useProducts from '../hooks/use-products';
import { useQuery } from '@tanstack/react-query';

export default function Products() {
  const [checked, setChecked] = useState(false);
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(
    ['products', checked],
    async () => {
      console.log('fetching..........', checked);
      const res = await fetch(`data/${checked ? 'sale_' : ''}products.json`);
      return await res.json();
    },
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  const handleChange = () => setChecked(prev => !prev);

  if (isLoading) return <p>Loading</p>;

  if (error) return <p>{error}</p>;

  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        value={checked}
        onChange={handleChange}
      />
      <label htmlFor="checkbox">Show Only Sale</label>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
