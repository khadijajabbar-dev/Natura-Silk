import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Blog from '../models/Blog.js';

// All the actual seed logic lives here so it can be called either from the
// CLI (`npm run seed`) or automatically by server.js on startup when the
// database is empty — so a fresh teammate never sees a blank site just
// because they forgot to run the seed command.
export async function seedDatabase() {
  const categories = [
    { name: 'Shampoo', slug: 'shampoo', image: '/images/herbal-shampoo.jpg' },
    { name: 'Conditioner', slug: 'conditioner', image: '/images/nourishing-conditioner.jpg' },
    { name: 'Hair Oil', slug: 'hair-oil', image: '/images/hair-growth-oil.jpg' },
    { name: 'Hair Serum', slug: 'hair-serum', image: '/images/anti-hair-fall-serum.jpg' },
    { name: 'Hair Mask', slug: 'hair-mask', image: '/images/deep-repair-hair-mask.jpg' },
    { name: 'Combos', slug: 'combos', image: '/images/combo-hero.jpg' },
  ];

  for (const c of categories) {
    await Category.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
  }

  const getCatId = async (slug) => (await Category.findOne({ slug }))._id;

  const products = [
    {
      name: 'Herbal Shampoo',
      slug: 'herbal-shampoo',
      category: await getCatId('shampoo'),
      price: 1250,
      comparePrice: 1450,
      shortDesc: 'Gently cleanses and nourishes hair with natural herbal extracts.',
      description: 'Our Herbal Shampoo is enriched with a blend of natural herbs to cleanse your scalp gently while nourishing every strand. Free from sulfates and parabens, it is safe for daily use and suitable for all hair types, leaving your hair soft, fresh, and naturally healthy.',
      ingredients: 'Aloe Vera, Tea Tree Oil, Amla Extract, Rosemary Extract, Panthenol',
      howToUse: 'Apply to wet hair, massage gently into scalp, lather and rinse thoroughly. Follow with conditioner for best results.',
      image: '/images/herbal-shampoo.jpg',
      rating: 4.6, reviewCount: 326, isBestseller: true,
    },
    {
      name: 'Nourishing Conditioner',
      slug: 'nourishing-conditioner',
      category: await getCatId('conditioner'),
      price: 1180,
      comparePrice: 1350,
      shortDesc: 'Deeply nourishes and adds shine with avocado and shea butter.',
      description: 'This Nourishing Conditioner deeply hydrates and strengthens hair using avocado and shea butter. It detangles effortlessly, restores shine, and leaves hair feeling silky soft, without weighing it down.',
      ingredients: 'Avocado Oil, Shea Butter, Coconut Oil, Aloe Vera, Vitamin E',
      howToUse: 'After shampooing, apply generously from mid-length to ends. Leave for 2-3 minutes, then rinse thoroughly.',
      image: '/images/nourishing-conditioner.jpg',
      rating: 4.5, reviewCount: 214, isBestseller: true,
    },
    {
      name: 'Hair Growth Oil',
      slug: 'hair-growth-oil',
      category: await getCatId('hair-oil'),
      price: 1650,
      comparePrice: 1900,
      shortDesc: 'Stimulates growth and strengthens roots with onion, rosemary & black seed oil.',
      description: 'A powerful blend of onion, rosemary, castor and black seed oil designed to stimulate hair growth from the root, reduce hair fall, and strengthen strands over time. Lightweight formula absorbs quickly without greasy residue.',
      ingredients: 'Onion Seed Oil, Rosemary Oil, Castor Oil, Black Seed Oil, Amla, Bhringraj',
      howToUse: 'Massage into scalp 2-3 times a week, leave for at least 1 hour or overnight, then wash out with shampoo.',
      image: '/images/hair-growth-oil.jpg',
      rating: 4.7, reviewCount: 194, isBestseller: true,
    },
    {
      name: 'Anti Hair Fall Serum',
      slug: 'anti-hair-fall-serum',
      category: await getCatId('hair-serum'),
      price: 1450,
      comparePrice: 1650,
      shortDesc: 'Reduces hair fall and promotes growth with bhringraj, amla & biotin.',
      description: 'A lightweight, fast-absorbing serum formulated with bhringraj, amla and biotin to reduce hair fall, strengthen roots, and encourage healthy new growth. Use daily as part of your scalp care routine.',
      ingredients: 'Bhringraj Extract, Amla Extract, Biotin, Niacinamide, Caffeine',
      howToUse: 'Apply a few drops directly to the scalp daily, massage gently. No rinsing required.',
      image: '/images/anti-hair-fall-serum.jpg',
      rating: 4.4, reviewCount: 87, isBestseller: true,
    },
    {
      name: 'Deep Repair Hair Mask',
      slug: 'deep-repair-hair-mask',
      category: await getCatId('hair-mask'),
      price: 1350,
      comparePrice: 1550,
      shortDesc: 'Intense nourishment with argan oil and shea butter for stronger, softer hair.',
      description: 'This intensive weekly treatment repairs damaged hair using argan oil, shea butter and keratin. It restores moisture, smooths the hair cuticle, and leaves hair visibly stronger and softer after just one use.',
      ingredients: 'Argan Oil, Shea Butter, Keratin, Hydrolyzed Silk Protein',
      howToUse: 'Apply generously to clean, damp hair. Leave on for 10-15 minutes, then rinse thoroughly. Use 1-2 times weekly.',
      image: '/images/deep-repair-hair-mask.jpg',
      rating: 4.5, reviewCount: 62, isBestseller: true,
    },
    {
      name: 'Onion Hair Oil',
      slug: 'onion-hair-oil',
      category: await getCatId('hair-oil'),
      price: 1550,
      comparePrice: 1750,
      shortDesc: 'Promotes hair growth and reduces hair fall with redensyl & black seed oil.',
      description: 'Formulated with onion extract, redensyl, black seed oil and vitamin E, this oil targets hair thinning at the root, strengthens strands, and promotes visibly thicker, healthier-looking hair with consistent use.',
      ingredients: 'Onion Extract, Redensyl, Black Seed Oil, Vitamin E',
      howToUse: 'Massage into scalp 2-3 times weekly, leave for at least 30 minutes before washing out.',
      image: '/images/onion-hair-oil.jpg',
      rating: 4.6, reviewCount: 143, isBestseller: true,
    },
    {
      name: 'Complete Hair Care Combo',
      slug: 'complete-hair-care-combo',
      category: await getCatId('combos'),
      price: 3999,
      comparePrice: 5150,
      shortDesc: 'All-in-one combo: shampoo, conditioner & hair oil for a complete hair care routine.',
      description: 'Get our best-selling trio in one value-packed combo. Includes the Herbal Shampoo, Nourishing Conditioner, and Hair Growth Oil — everything you need for a complete hair care routine. Save more when you bundle and enjoy naturally healthier hair from root to tip.',
      ingredients: 'Aloe Vera, Tea Tree Oil, Amla Extract, Avocado Oil, Shea Butter, Onion Seed Oil, Rosemary Oil, Castor Oil',
      howToUse: 'Use the Herbal Shampoo to cleanse, follow with Nourishing Conditioner, and apply Hair Growth Oil 2-3 times weekly to the scalp.',
      image: '/images/combo-hero.jpg',
      rating: 4.8, reviewCount: 211, isBestseller: true,
    },
  ];

  const productIdBySlug = {};
  for (const p of products) {
    const doc = await Product.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
    productIdBySlug[p.slug] = doc._id;
  }

  const reviews = [
    { slug: 'herbal-shampoo', author: 'Sana Khalid', rating: 5, comment: 'HairCare products are amazing! My hair feels so soft, healthy and looks so shiny now.' },
    { slug: 'herbal-shampoo', author: 'Maryam Ali', rating: 4, comment: 'I love that the products are 100% natural and actually deliver results.' },
    { slug: 'hair-growth-oil', author: 'Ayesha R.', rating: 5, comment: 'The best hair oil I have ever used. Highly recommend!' },
    { slug: 'hair-growth-oil', author: 'Bilal Ahmed', rating: 5, comment: 'Noticed less hair fall within three weeks of regular use.' },
    { slug: 'anti-hair-fall-serum', author: 'Hina S.', rating: 4, comment: 'Lightweight and absorbs fast, no greasy feeling at all.' },
    { slug: 'deep-repair-hair-mask', author: 'Zara N.', rating: 5, comment: 'My damaged ends feel so much softer after just two uses.' },
  ];

  const existingReviewCount = await Review.countDocuments();
  if (existingReviewCount === 0) {
    for (const r of reviews) {
      const productId = productIdBySlug[r.slug];
      if (productId) {
        await Review.create({ product: productId, authorName: r.author, rating: r.rating, comment: r.comment });
      }
    }
  }

  // Seed default blog posts if none exist
  const existingBlogCount = await Blog.countDocuments();
  if (existingBlogCount === 0) {
    const defaultBlogs = [
      {
        slug: 'tips-for-healthy-long-hair',
        tag: 'Hair Care Tips',
        title: '12 Tips for Healthy & Long Hair Naturally',
        image: '/images/herbal-shampoo.jpg',
        date: 'June 15, 2026',
        excerpt: 'Simple, natural habits that help your hair grow stronger, longer and shinier.',
        content: [
          { type: 'p', text: 'Growing healthy, long hair naturally is less about expensive products and more about consistent, gentle care. Below are twelve habits that make a real difference over time.' },
          { type: 'h', text: '1. Wash smart, not often' },
          { type: 'p', text: 'Over-washing strips natural oils. Stick to 2–3 washes a week with a sulfate-free shampoo to keep the scalp balanced.' },
          { type: 'h', text: '2. Oil your scalp weekly' },
          { type: 'p', text: 'A weekly massage with coconut or argan oil improves circulation and reduces protein loss, which is one of the biggest causes of breakage.' },
          { type: 'h', text: '3. Never brush wet hair aggressively' },
          { type: 'p', text: 'Wet hair is fragile. Use a wide-tooth comb and start from the ends, working your way up to avoid snapping strands.' },
        ],
      },
      {
        slug: 'benefits-of-amla-for-hair-growth',
        tag: 'Ingredients',
        title: 'The Benefits of Amla for Hair Growth',
        image: '/images/amla-extract.jpg',
        date: 'June 22, 2026',
        excerpt: 'This ancient superfruit does more for your scalp than you might think.',
        content: [
          { type: 'p', text: 'Amla (Indian gooseberry) has been used for centuries in traditional hair care — and modern research backs up much of the folklore.' },
          { type: 'h', text: 'Rich in vitamin C' },
          { type: 'p', text: 'Amla is packed with vitamin C and antioxidants that support collagen production and help strengthen the hair from root to tip.' },
          { type: 'h', text: 'Strengthens the roots' },
          { type: 'p', text: 'Regular use of amla helps reduce hair fall by nourishing follicles and improving scalp health, leading to thicker-looking hair over time.' },
        ],
      },
      {
        slug: 'perfect-hair-care-routine',
        tag: 'Hair Care Routine',
        title: 'How to Build the Perfect Hair Care Routine',
        image: '/images/hair-growth-oil.jpg',
        date: 'July 1, 2026',
        excerpt: 'A simple, step-by-step routine for stronger, shinier hair in weeks.',
        content: [
          { type: 'p', text: 'A great routine has just a few steps done consistently. Here is a simple framework you can adapt to your hair type.' },
          { type: 'h', text: 'Step 1 — Cleanse' },
          { type: 'p', text: 'Use a gentle, sulfate-free shampoo focusing on the scalp. Let the lather rinse down the lengths rather than scrubbing the ends.' },
          { type: 'h', text: 'Step 2 — Condition' },
          { type: 'p', text: 'Apply conditioner from mid-length to ends. Leave it for 2–3 minutes before rinsing with cool water to seal the cuticle.' },
        ],
      },
      {
        slug: 'onion-oil-fact-vs-fad',
        tag: 'Ingredients',
        title: 'Onion Oil: Fact vs. Fad',
        image: '/images/onion-hair-oil.jpg',
        date: 'July 8, 2026',
        excerpt: 'What the research actually says about onion extract and hair fall.',
        content: [
          { type: 'p', text: 'Onion oil went viral for a reason — but how much of the hype holds up? Let us separate fact from fad.' },
          { type: 'h', text: 'The sulfur connection' },
          { type: 'p', text: 'Onions are rich in sulfur, a building block of keratin. Small studies have shown improved regrowth in patchy hair loss with topical onion application.' },
          { type: 'h', text: 'Realistic expectations' },
          { type: 'p', text: 'It is a supportive ingredient, not a miracle cure. Use it consistently alongside a healthy routine for best results.' },
        ],
      },
      {
        slug: 'conditioner-101',
        tag: 'Hair Care Tips',
        title: 'Conditioner 101: What It Actually Does',
        image: '/images/nourishing-conditioner.jpg',
        date: 'July 14, 2026',
        excerpt: 'Understanding the role of conditioner in a balanced hair routine.',
        content: [
          { type: 'p', text: 'Conditioner is often misunderstood. Here is what it really does and how to get the most from it.' },
          { type: 'h', text: 'Sealing the cuticle' },
          { type: 'p', text: 'Conditioner smooths the outer layer of the hair, locking in moisture and reducing frizz and tangles.' },
          { type: 'h', text: 'Where to apply' },
          { type: 'p', text: 'Keep it away from the scalp and focus on the mid-lengths and ends, which are the oldest and most damage-prone parts of your hair.' },
        ],
      },
      {
        slug: 'reducing-hair-fall-naturally',
        tag: 'Hair Care Routine',
        title: 'Reducing Hair Fall Naturally',
        image: '/images/anti-hair-fall-serum.jpg',
        date: 'July 20, 2026',
        excerpt: 'Small daily habits that make a real difference over time.',
        content: [
          { type: 'p', text: 'Some hair fall is normal, but a few tweaks can reduce excess shedding noticeably.' },
          { type: 'h', text: 'Be gentle' },
          { type: 'p', text: 'Avoid tight hairstyles and rough towel-drying. Friction and tension are common, avoidable causes of breakage.' },
          { type: 'h', text: 'Feed the follicle' },
          { type: 'p', text: 'A serum with botanical actives applied to the scalp supports stronger anchoring over time.' },
        ],
      },
    ];

    for (const b of defaultBlogs) {
      await Blog.findOneAndUpdate({ slug: b.slug }, b, { upsert: true, new: true });
    }
  }

  return {
    categories: await Category.countDocuments(),
    products: await Product.countDocuments(),
    reviews: await Review.countDocuments(),
    blogs: await Blog.countDocuments(),
  };
}
