import { useEffect, useState } from 'react';

export default function useProducts({ salesOnly }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 초기화.
    setLoading(true);
    setError(undefined);

    fetch(`data/${salesOnly ? 'sale_' : ''}products.json`)
      .then(res => res.json())
      .then(data => {
        console.log('🔥뜨끈한 데이터를 네트워크에서 받아옴');
        setProducts(data);
      })
      .catch(e => setError('에러가 발생함!!'))
      .finally(() => setLoading(false));
    return () => {
      console.log('깨끗하게 청소하는 함수');
    };
  }, [salesOnly]);

  return [loading, error, products];
}
