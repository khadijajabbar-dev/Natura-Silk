// These helpers convert Mongoose documents into the same plain-object shape
// the frontend already expects (snake_case keys, `id` instead of `_id`),
// so switching the database engine never requires touching frontend code.

export function serializeCategory(cat) {
  if (!cat) return null;
  return {
    id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
    image: cat.image,
  };
}

export function serializeProduct(p) {
  if (!p) return null;
  const category = p.category && p.category.name ? p.category : null;
  return {
    id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    category_id: category ? category._id.toString() : (p.category ? p.category.toString() : null),
    category_name: category ? category.name : undefined,
    category_slug: category ? category.slug : undefined,
    price: p.price,
    compare_price: p.comparePrice,
    short_desc: p.shortDesc,
    description: p.description,
    ingredients: p.ingredients,
    how_to_use: p.howToUse,
    image: p.image,
    rating: p.rating,
    review_count: p.reviewCount,
    stock: p.stock,
    is_bestseller: p.isBestseller ? 1 : 0,
    created_at: p.created_at,
  };
}

export function serializeReview(r) {
  if (!r) return null;
  return {
    id: r._id.toString(),
    product_id: r.product ? r.product.toString() : null,
    author_name: r.authorName,
    rating: r.rating,
    comment: r.comment,
    created_at: r.created_at,
  };
}

export function serializeCartItem(ci) {
  if (!ci) return null;
  const product = serializeProduct(ci.product) || {};
  return {
    cart_item_id: ci._id.toString(),
    quantity: ci.quantity,
    ...product,
  };
}

export function serializeOrder(o) {
  if (!o) return null;
  return {
    id: o._id.toString(),
    guest_id: o.guestId || null,
    status: o.status,
    subtotal: o.subtotal,
    shipping: o.shipping,
    total: o.total,
    shipping_name: o.shippingName,
    shipping_email: o.shippingEmail,
    shipping_phone: o.shippingPhone,
    shipping_address: o.shippingAddress,
    shipping_city: o.shippingCity,
    payment_method: o.paymentMethod,
    created_at: o.created_at,
  };
}

export function serializeOrderItem(i) {
  return {
    product_id: i.product ? i.product.toString() : null,
    product_name: i.productName,
    price: i.price,
    quantity: i.quantity,
  };
}

export function serializeUser(u) {
  if (!u) return null;
  return {
    id: u._id.toString(),
    name: u.name,
    email: u.email,
    phone: u.phone || null,
    address: u.address || null,
    role: u.role || 'customer',
    created_at: u.created_at,
  };
}
