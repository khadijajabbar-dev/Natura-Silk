export default function StarRating({ rating = 0, count }) {
  const full = Math.round(rating);
  return (
    <div className="product-card-rating">
      <span className="stars">
        {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      </span>
      {count !== undefined && <span>({count})</span>}
    </div>
  );
}
