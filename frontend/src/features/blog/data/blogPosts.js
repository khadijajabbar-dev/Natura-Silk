export const BLOG_POSTS = [
  {
    id: 1,
    tag: 'Hair Care Tips',
    title: '12 Tips for Healthy & Long Hair Naturally',
    img: '/images/herbal-shampoo.jpg',
    date: 'June 15, 2026',
    excerpt: 'Simple, natural habits that help your hair grow stronger, longer and shinier.',
    content: [
      { type: 'p', text: 'Growing healthy, long hair naturally is less about expensive products and more about consistent, gentle care. Below are twelve habits that make a real difference over time.' },
      { type: 'h', text: '1. Wash smart, not often' },
      { type: 'p', text: 'Over-washing strips natural oils. Stick to 2–3 washes a week with a sulfate-free shampoo like our Herbal Shampoo to keep the scalp balanced.' },
      { type: 'h', text: '2. Oil your scalp weekly' },
      { type: 'p', text: 'A weekly massage with coconut or argan oil improves circulation and reduces protein loss, which is one of the biggest causes of breakage.' },
      { type: 'h', text: '3. Never brush wet hair aggressively' },
      { type: 'p', text: 'Wet hair is fragile. Use a wide-tooth comb and start from the ends, working your way up to avoid snapping strands.' },
      { type: 'p', text: 'Pair these habits with a balanced diet rich in protein, biotin and iron, and give it a few weeks — natural growth is a marathon, not a sprint.' },
    ],
  },
  {
    id: 2,
    tag: 'Ingredients',
    title: 'The Benefits of Amla for Hair Growth',
    img: '/images/amla-extract.jpg',
    date: 'June 22, 2026',
    excerpt: 'This ancient superfruit does more for your scalp than you might think.',
    content: [
      { type: 'p', text: 'Amla (Indian gooseberry) has been used for centuries in traditional hair care — and modern research backs up much of the folklore.' },
      { type: 'h', text: 'Rich in vitamin C' },
      { type: 'p', text: 'Amla is packed with vitamin C and antioxidants that support collagen production and help strengthen the hair from root to tip.' },
      { type: 'h', text: 'Strengthens the roots' },
      { type: 'p', text: 'Regular use of amla helps reduce hair fall by nourishing follicles and improving scalp health, leading to thicker-looking hair over time.' },
      { type: 'h', text: 'How to use it' },
      { type: 'p', text: 'Look for it in leave-in serums and oils — our Hair Growth Oil combines amla with other botanicals for daily scalp support.' },
    ],
  },
  {
    id: 3,
    tag: 'Hair Care Routine',
    title: 'How to Build the Perfect Hair Care Routine',
    img: '/images/hair-growth-oil.jpg',
    date: 'July 1, 2026',
    excerpt: 'A simple, step-by-step routine for stronger, shinier hair in weeks.',
    content: [
      { type: 'p', text: 'A great routine has just a few steps done consistently. Here is a simple framework you can adapt to your hair type.' },
      { type: 'h', text: 'Step 1 — Cleanse' },
      { type: 'p', text: 'Use a gentle, sulfate-free shampoo focusing on the scalp. Let the lather rinse down the lengths rather than scrubbing the ends.' },
      { type: 'h', text: 'Step 2 — Condition' },
      { type: 'p', text: 'Apply conditioner from mid-length to ends. Leave it for 2–3 minutes before rinsing with cool water to seal the cuticle.' },
      { type: 'h', text: 'Step 3 — Treat' },
      { type: 'p', text: 'Once a week, use a mask or oil treatment. This is where deep repair happens — think of it as food for your hair.' },
    ],
  },
  {
    id: 4,
    tag: 'Ingredients',
    title: 'Onion Oil: Fact vs. Fad',
    img: '/images/onion-hair-oil.jpg',
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
    id: 5,
    tag: 'Hair Care Tips',
    title: 'Conditioner 101: What It Actually Does',
    img: '/images/nourishing-conditioner.jpg',
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
    id: 6,
    tag: 'Hair Care Routine',
    title: 'Reducing Hair Fall Naturally',
    img: '/images/anti-hair-fall-serum.jpg',
    date: 'July 20, 2026',
    excerpt: 'Small daily habits that make a real difference over time.',
    content: [
      { type: 'p', text: 'Some hair fall is normal, but a few tweaks can reduce excess shedding noticeably.' },
      { type: 'h', text: 'Be gentle' },
      { type: 'p', text: 'Avoid tight hairstyles and rough towel-drying. Friction and tension are common, avoidable causes of breakage.' },
      { type: 'h', text: 'Feed the follicle' },
      { type: 'p', text: 'A serum with botanical actives applied to the scalp — like our Anti Hair Fall Serum — supports stronger anchoring over time.' },
    ],
  },
];

export const BLOG_TAGS = ['Hair Care Tips', 'Ingredients', 'Hair Care Routine'];

// Looks up an admin-set cover photo override for a post (by postId), falling
// back to the image baked into the post data if no override is set.
export function getPostImage(post, overrides) {
  if (!Array.isArray(overrides)) return post.img;
  const match = overrides.find((o) => Number(o.postId) === Number(post.id));
  return (match && match.image) || post.img;
}