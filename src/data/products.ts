import { Product, Bundle } from "@/store/useStore";

export const fallbackProducts: Product[] = [
  // ==========================================
  // CATEGORY: HEAL ENERGIZED BRACELETS
  // ------------------------------------------
  // Categories: Love and relationship | Job and business | Wealth and prosperity | Overall wellness | Negativity protection
  // ==========================================
  {
    id: "mixel-triple-abundance",
    name: "Triple Synergy Mixel Abundance Bracelet (Citrine + Pyrite + Aventurine)",
    description: "Handcrafted with authentic 8mm Grade-A natural gemstone beads. Made with 8mm spherical stones featuring the legendary triad of wealth: Golden Citrine, Pyrite, and Green Aventurine. This synergy blend amplifies cash flow, attracts career promotions, and unblocks stuck financial luck. Energized with 108 Lakshmi Gayatri Mantras.",
    shortIntention: "Triple Financial Breakthrough, Business Luck & Wealth Magnetism (Made with 8mm Beads)",
    price: 2999,
    salePrice: 1499,
    image: "/images/products/money-maker.jpg",
    gallery: [
      "/images/products/money-maker.jpg",
      "/images/products/dhan-yog-main.jpg",
      "/images/products/citrine-new.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Wealth and prosperity",
    badge: "Tarot Reader's Bestseller",
    chakra: "Solar Plexus & Heart",
    planet: "Jupiter (Guru) & Sun (Surya)",
    zodiac: "Leo, Sagittarius, Taurus",
    rashi: "Simha (Leo) & Dhanu (Sagittarius)",
    numerologyNumber: "1 & 8",
    rating: 4.98,
    reviewCount: 420,
    benefits: [
      "Made with Grade-A authentic 8mm natural gemstone beads on sacred durable elastic",
      "Combines Pyrite's magnetic pull with Citrine's sales luck and Aventurine's fortuitous chance",
      "Shields the aura from competitors' envy and negative office politics",
      "Purified with Himalayan sage and locked with 108 Vedic Lakshmi chants"
    ]
  },
  {
    id: "mixel-love-protection-synergy",
    name: "Heart Armor Mixel Bracelet (Madagascar Rose Quartz + Black Tourmaline)",
    description: "Handcrafted with Grade-A 8mm natural crystal beads. Made with 8mm stones combining gentle Anahata Madagascar Rose Quartz with an unyielding 8mm Black Tourmaline Root chakra defense shield. Keeps your heart receptive to soulmate love without absorbing negative psychic debris.",
    shortIntention: "Soulmate Alignment, Empath Defense & Peaceful Heart Armor (Made with 8mm Beads)",
    price: 2799,
    salePrice: 1399,
    image: "/images/products/love-peace-metal.jpg",
    gallery: [
      "/images/products/love-peace-metal.jpg",
      "/images/products/rose-quartz-new.jpg",
      "/images/products/black-tourmaline.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Love and relationship",
    badge: "Energized & Lab Certified",
    chakra: "Heart (Anahata) & Root (Muladhara)",
    planet: "Venus (Shukra) & Saturn (Shani)",
    zodiac: "Taurus, Libra, Capricorn",
    rashi: "Vrishabha (Taurus) & Tula (Libra)",
    numerologyNumber: "6 & 8",
    rating: 4.96,
    reviewCount: 312,
    benefits: [
      "Made with authentic 8mm natural gemstones paired for optimal energy balance",
      "Attracts gentle, loyal romantic connections while deflecting toxic manipulators",
      "Heals emotional heartbreak and prevents boundary erosion",
      "Consecrated with Venusian love mantras and Maha Mrityunjaya shielding"
    ]
  },
  {
    id: "mixel-crown-clarity-focus",
    name: "Master Intuition Mixel Bracelet (Amethyst + Clear Quartz Sphatik + Lapis)",
    description: "Handcrafted with authentic 8mm natural gemstone beads (Amethyst, Clear Quartz Sphatik, and Royal Lapis Lazuli). Made with 8mm spherical stones to harmonize the Throat, Third Eye, and Crown chakras. Dissolves brain fog, stills turbulent overthinking, and unlocks razor-sharp clarity for high-stakes decision-makers.",
    shortIntention: "Executive Decision Clarity, Intuitive Vision & Anti-Anxiety (Made with 8mm Beads)",
    price: 2899,
    salePrice: 1449,
    image: "/images/products/fluorite.jpg",
    gallery: [
      "/images/products/fluorite.jpg",
      "/images/products/amethyst-new.jpg",
      "/images/products/lapis-lazuli.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Overall wellness",
    badge: "Energized & Lab Certified",
    chakra: "Third Eye, Crown & Throat",
    planet: "Jupiter & Mercury",
    zodiac: "Aquarius, Pisces, Gemini",
    rashi: "Kumbha (Aquarius) & Meena (Pisces)",
    numerologyNumber: "7 & 5",
    rating: 4.94,
    reviewCount: 268,
    benefits: [
      "Made with Grade-A 8mm beads chosen for high crystalline frequency",
      "Synergizes deep meditative stillness with articulate speech and focus",
      "Stills nighttime overthinking and promotes lucid, refreshing sleep",
      "Blessed with 108 Saraswati Vidya & Gayatri mantras"
    ]
  },
  {
    id: "chakra-7-harmony-bracelet",
    name: "Complete 7-Chakra Master Alignment Bracelet with Sacred Spacers",
    description: "Handcrafted with Grade-A 8mm natural gemstone spheres representing the complete human meridian system: Red Jasper (Root), Carnelian (Sacral), Tiger Eye (Solar Plexus), Green Aventurine (Heart), Sodalite (Throat), Amethyst (Third Eye), and Clear Quartz (Crown). Made with 8mm spherical beads balanced with gold-finished brass spacers.",
    shortIntention: "Full Kundalini Alignment, Meridian Balance & Vitality Flow (Made with 8mm Beads)",
    price: 2499,
    salePrice: 1299,
    image: "/images/products/tree-agate.jpg",
    gallery: [
      "/images/products/tree-agate.jpg",
      "/images/products/clear-quartz.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Overall wellness",
    badge: "Energized & Lab Certified",
    chakra: "All 7 Chakras (Root to Crown)",
    planet: "Navagraha (9 Vedic Planets)",
    zodiac: "All 12 Zodiac Signs",
    rashi: "Universal Kundali Harmonizer",
    numerologyNumber: "All Master Numbers",
    rating: 4.99,
    reviewCount: 540,
    benefits: [
      "Made with natural 8mm multi-gemstone beads aligned to the 7 bodily vortexes",
      "Flushes energetic blockages from physical and emotional nadis",
      "Harmonizes all seven chakra centers into coherent equilibrium",
      "Consecrated with 7 Vedic Beej Mantras (Lam, Vam, Ram, Yam, Ham, Om, Silence)"
    ]
  },
  {
    id: "chakra-heart-rose-quartz",
    name: "Anahata Heart Chakra Madagascar Rose Quartz Bracelet",
    description: "Ethically hand-mined translucent pink Madagascar Rose Quartz. Made with 8mm Grade-A natural beads with micro-faceted champagne gold rondelles. Emits a tender, comforting frequency that dissolves past emotional scar tissue and restores trust in unconditional love.",
    shortIntention: "Soulmate Magnetism, Heart Healing & Tender Self-Love (Made with 8mm Beads)",
    price: 1899,
    salePrice: 999,
    image: "/images/products/rose-quartz-new.jpg",
    gallery: [
      "/images/products/rose-quartz-new.jpg",
      "/images/products/rhodochrosite.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Love and relationship",
    badge: "Tarot Reader's Bestseller",
    chakra: "Heart (Anahata)",
    planet: "Venus (Shukra)",
    zodiac: "Taurus, Libra, Cancer",
    rashi: "Vrishabha & Tula",
    numerologyNumber: "6",
    rating: 4.97,
    reviewCount: 395,
    benefits: [
      "Made with 8mm Madagascar Rose Quartz polished to a soft luminous glow",
      "Opens the heart chakra to receive healthy, affirming affection",
      "Dissolves stubborn emotional grief, resentment and self-reproach",
      "Infused with 108 chants of Om Shukraya Namaha"
    ]
  },
  {
    id: "chakra-solar-tiger-eye",
    name: "Manipura Solar Plexus Golden Tiger Eye Willpower Bracelet",
    description: "Featuring golden-brown chatoyant bands that shimmer like liquid honey under the sun. Made with 8mm natural spherical beads. Anchors the Solar Plexus fire (Manipura), eradicating timid procrastination, imposter syndrome, and self-doubt in high-stakes negotiations.",
    shortIntention: "Fearless Willpower, Executive Confidence & Career Fire (Made with 8mm Beads)",
    price: 1799,
    salePrice: 899,
    image: "/images/products/tiger-eye-new.jpg",
    gallery: [
      "/images/products/tiger-eye-new.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Job and business",
    badge: "Energized & Lab Certified",
    chakra: "Solar Plexus (Manipura) & Root",
    planet: "Sun (Surya) & Mars (Mangal)",
    zodiac: "Leo, Aries, Capricorn",
    rashi: "Simha (Leo) & Mesha (Aries)",
    numerologyNumber: "1 & 9",
    rating: 4.91,
    reviewCount: 284,
    benefits: [
      "Made with 8mm chatoyant Tiger Eye beads selected for dense golden striations",
      "Instills sovereign executive presence and magnetic public speaking",
      "Ignites dormant motivation to achieve ambitious quarterly goals",
      "Awakened under peak midday Surya rays with Vedic mantras"
    ]
  },
  {
    id: "kundali-shani-blue-sapphire-amethyst",
    name: "Shani & Saturn Balance Kundali Bracelet (Amethyst & Blue Lapis Lazuli)",
    description: "Formulated specifically for Sade Sati, Dhaiya, and challenging Saturn transits. Made with 8mm Grade-A Uruguayan Amethyst and Royal Lapis Lazuli beads. Transmutes karmic friction into spiritual patience, enduring discipline, and long-term triumph.",
    shortIntention: "Sade Sati Protection, Karmic Neutralization & Deep Serenity (Made with 8mm Beads)",
    price: 2499,
    salePrice: 1299,
    image: "/images/products/amethyst-new.jpg",
    gallery: [
      "/images/products/amethyst-new.jpg",
      "/images/products/lapis-lazuli.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Negativity protection",
    badge: "Energized & Lab Certified",
    chakra: "Crown & Third Eye",
    planet: "Saturn (Shani Dev)",
    zodiac: "Capricorn, Aquarius, Libra",
    rashi: "Makar (Capricorn) & Kumbh (Aquarius)",
    numerologyNumber: "8",
    rating: 4.98,
    reviewCount: 388,
    benefits: [
      "Made with 8mm deep violet Amethyst and golden-flecked Lapis Lazuli",
      "Soothes severe mental stress and delays associated with Saturn periods",
      "Builds unwavering resilience, integrity, and focused work ethic",
      "Energized with 108 recitations of the Shani Beej Mantra & Hanuman Chalisa"
    ]
  },
  {
    id: "kundali-shukra-venus-opal-quartz",
    name: "Shukra & Venus Luxury Aura Kundali Bracelet (Opalite & Natural Sphatik)",
    description: "Aligned with Shukra Graha (Venus)—the planetary ruler of luxury, artistic refinement, financial abundance, and romantic passion. Made with 8mm water-clear Himalayan Sphatik (Clear Quartz) and iridescent Opalite beads radiating an alluring Venusian charisma.",
    shortIntention: "Luxury Manifestation, Romantic Allure & Venusian Opulence (Made with 8mm Beads)",
    price: 2299,
    salePrice: 1199,
    image: "/images/products/clear-quartz.jpg",
    gallery: [
      "/images/products/clear-quartz.jpg",
      "/images/products/howlite.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Love and relationship",
    badge: "Energized & Lab Certified",
    chakra: "Heart & Crown",
    planet: "Venus (Shukra)",
    zodiac: "Taurus, Libra, Pisces",
    rashi: "Vrishabha (Taurus) & Tula (Libra)",
    numerologyNumber: "6",
    rating: 4.95,
    reviewCount: 270,
    benefits: [
      "Made with genuine 8mm Sphatik and luminous iridescent opalite beads",
      "Attracts lavish gifts, high-paying clients, and creative breakthroughs",
      "Enhances feminine charisma and radiant skin vitality",
      "Infused with 108 Shukra Gayatri & Sri Suktam chants"
    ]
  },
  {
    id: "kundali-budh-mercury-emerald-mix",
    name: "Budh & Mercury Intellect Kundali Bracelet (Green Aventurine & Jade Synergy)",
    description: "Vedic remedial curation for Mercury (Budh Graha). Made with 8mm natural Green Aventurine and fine jade synergy beads. Ideal for chartered accountants, traders, coders, writers, and entrepreneurs seeking quick wit, mathematical intellect, and commercial agility.",
    shortIntention: "Trading Intellect, Commercial Success & Analytical Wit (Made with 8mm Beads)",
    price: 2199,
    salePrice: 1099,
    image: "/images/products/green-aventurine.jpg",
    gallery: [
      "/images/products/green-aventurine.jpg",
      "/images/products/amazonite.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Job and business",
    badge: "Energized & Lab Certified",
    chakra: "Heart & Throat",
    planet: "Mercury (Budh Dev)",
    zodiac: "Gemini, Virgo",
    rashi: "Mithun (Gemini) & Kanya (Virgo)",
    numerologyNumber: "5",
    rating: 4.93,
    reviewCount: 245,
    benefits: [
      "Made with 8mm natural green aventurine spheres with shimmering mica inclusions",
      "Sharpens mathematical calculations, stock trades, and sales pitches",
      "Alleviates nervous speech hesitation and stammering under pressure",
      "Consecrated with 108 Budh Beej Mantras on Wednesday Brahma Muhurta"
    ]
  },
  {
    id: "kundali-surya-dhan-yog-pyrite",
    name: "Surya & Jupiter Dhan Yog Golden Pyrite Wealth Magnet",
    description: "Pure natural golden iron-pyrite hand-carved beads. Made with authentic 8mm spherical beads possessing brilliant metallic brass luster. Revered in Vedic astrology as the supreme physical anchor for Surya and Guru energies, creating an unstoppable 'Dhan Yog' in the wearer's energetic field.",
    shortIntention: "Sovereign Wealth, High Status & Imperial Leadership (Made with 8mm Beads)",
    price: 2499,
    salePrice: 1299,
    image: "/images/products/dhan-yog-main.jpg",
    gallery: [
      "/images/products/dhan-yog-main.jpg",
      "/images/products/dhan-yog-1.jpg",
      "/images/products/dhan-yog-2.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Wealth and prosperity",
    badge: "Tarot Reader's Bestseller",
    chakra: "Solar Plexus",
    planet: "Sun (Surya) & Jupiter (Guru)",
    zodiac: "Leo, Sagittarius, Aries",
    rashi: "Simha (Leo) & Dhanu (Sagittarius)",
    numerologyNumber: "1 & 3",
    rating: 4.98,
    reviewCount: 512,
    benefits: [
      "Made with heavy 8mm iron-pyrite beads with mirror-like metallic sheen",
      "Attracts high-value contracts, government approvals, and leadership roles",
      "Shields the aura from competitors' evil eye and jealousy",
      "Purified with Himalayan sage and locked with 108 Vedic Lakshmi chants"
    ]
  },
  {
    id: "bracelet-black-tourmaline-protection",
    name: "Supreme Aura Armor 8mm Black Tourmaline & Evil Eye Nazar Shield Bracelet",
    description: "Handcrafted with genuine 8mm Grade-A Brazilian Jet Black Tourmaline beads paired with a hand-painted glass Evil Eye (Nazar Battu) talisman. Forms an impenetrable psychic deflecting shield around your aura, neutralizing jealousy, psychic vampirism, and toxic workplace environments.",
    shortIntention: "Total Evil Eye Ward, Psychic Defense & Root Grounding (Made with 8mm Beads)",
    price: 2199,
    salePrice: 1099,
    image: "/images/products/black-tourmaline.jpg",
    gallery: [
      "/images/products/black-tourmaline.jpg",
      "/images/products/black-obsidian-new.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Negativity protection",
    badge: "Ultimate Evil-Eye Shield",
    chakra: "Root (Muladhara)",
    planet: "Saturn (Shani) & Rahu",
    zodiac: "Capricorn, Scorpio, Aries",
    rashi: "Makar (Capricorn) & Vrishchik (Scorpio)",
    numerologyNumber: "8 & 4",
    rating: 4.99,
    reviewCount: 460,
    benefits: [
      "Blocks and transmutes negative vibes, gossip, and envious stares into neutral earth energy",
      "Stops energy drains and fatigue when dealing with toxic people",
      "Strengthens the Root chakra for unwavering confidence and calm",
      "Blessed with 108 recitations of the sacred Hanuman Raksha Kavach"
    ]
  },
  {
    id: "bracelet-citrine-career-elevation",
    name: "Executive Career Elevation & Business Luck Golden Citrine & Pyrite Bracelet",
    description: "An elite commercial synergy pairing natural Golden Citrine (Merchant's Stone) with metallic Pyrite and chatoyant Tiger Eye. Designed specifically for ambitious entrepreneurs, founders, and executives seeking promotions, salary spikes, and deal closings.",
    shortIntention: "Business Expansion, Corporate Promotion & Rapid Success (Made with 8mm Beads)",
    price: 2599,
    salePrice: 1349,
    image: "/images/products/citrine-new.jpg",
    gallery: [
      "/images/products/citrine-new.jpg",
      "/images/products/tiger-eye-new.jpg",
      "/images/products/money-maker.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Job and business",
    badge: "Executive Favorite",
    chakra: "Solar Plexus (Manipura)",
    planet: "Sun (Surya) & Jupiter (Guru)",
    zodiac: "Leo, Sagittarius, Gemini",
    rashi: "Simha (Leo) & Dhanu (Sagittarius)",
    numerologyNumber: "1 & 3",
    rating: 4.97,
    reviewCount: 310,
    benefits: [
      "Inspires decisive executive leadership and high-stakes negotiation confidence",
      "Attracts lucrative new client contracts, tenders, and revenue breakthroughs",
      "Erases self-doubt, interview nervousness, and imposter syndrome",
      "Charged under Vedic Surya Muhurta with 108 Gayatri Japa mantras"
    ]
  },
  {
    id: "bracelet-green-jade-wealth",
    name: "Imperial Burmese Green Jade Prosperity & Growth Bracelet",
    description: "Carved from natural untreated Burmese Green Jade stones (8mm spheres). Revered across centuries as the quintessential stone of uninterrupted financial fortune, longevity, and peaceful prosperity.",
    shortIntention: "Sustainable Cashflow, Peaceful Wealth & Organic Business Growth (Made with 8mm Beads)",
    price: 2399,
    salePrice: 1199,
    image: "/images/products/green-aventurine.jpg",
    gallery: [
      "/images/products/green-aventurine.jpg",
      "/images/products/tree-agate.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Wealth and prosperity",
    badge: "Generational Prosperity",
    chakra: "Heart (Anahata)",
    planet: "Mercury (Budh) & Venus (Shukra)",
    zodiac: "Taurus, Virgo, Libra",
    rashi: "Vrishabha (Taurus) & Kanya (Virgo)",
    numerologyNumber: "5 & 6",
    rating: 4.96,
    reviewCount: 290,
    benefits: [
      "Stabilizes cashflow and prevents sudden impulsive financial losses",
      "Harmonizes home business environments and invites organic expansion",
      "Infused with 108 Kubera Wealth Mantras and holy Ganga water"
    ]
  },
  {
    id: "bracelet-amethyst-stress-relief",
    name: "Deep Serenity & Stress Relief Uruguayan Amethyst Bracelet",
    description: "Deep regal violet Grade-A Uruguayan Amethyst beads (8mm). Soothes the autonomic nervous system, quiets relentless racing thoughts, relieves chronic migraines, and facilitates deep restorative REM sleep.",
    shortIntention: "Total Nervous System Calm, Insomnia Relief & Deep Serenity (Made with 8mm Beads)",
    price: 2299,
    salePrice: 1149,
    image: "/images/products/amethyst-new.jpg",
    gallery: [
      "/images/products/amethyst-new.jpg",
      "/images/products/fluorite.jpg"
    ],
    category: "Heal Energized Bracelets",
    subCategory: "Overall wellness",
    badge: "Master Stress Healer",
    chakra: "Crown (Sahasrara) & Third Eye",
    planet: "Jupiter & Saturn",
    zodiac: "Pisces, Aquarius, Virgo",
    rashi: "Meena (Pisces) & Kumbha (Aquarius)",
    numerologyNumber: "7",
    rating: 4.98,
    reviewCount: 415,
    benefits: [
      "Cools heated emotional tempers, irritability, and chronic tension",
      "Restores restful, unbroken sleep patterns and relieves morning brain fog",
      "Purified with Himalayan mountain cedar smoke and lunar full-moon charging"
    ]
  },

  // ==========================================
  // CATEGORY 3: PENDANTS
  // ==========================================
  {
    id: "pendant-raw-moldavite-wire",
    name: "Extraterrestrial Raw Moldavite Wire-Wrapped Sacred Pendant",
    description: "Genuine tektite born from a cosmic meteorite impact in the Czech Republic over 14.8 million years ago. Wrapped in delicate champagne-gold wire. Known in metaphysical circles as the ultimate stone of rapid spiritual awakening and accelerated destiny.",
    shortIntention: "Rapid Life Transformation, High Cosmic Frequency & Kundalini Spark",
    price: 4999,
    salePrice: 2899,
    image: "/images/products/fluorite.jpg",
    gallery: [
      "/images/products/fluorite.jpg",
      "/images/products/green-aventurine.jpg"
    ],
    category: "Pendants",
    badge: "Energized & Lab Certified",
    chakra: "Heart & Third Eye",
    planet: "Uranus & Pluto",
    zodiac: "Scorpio, Sagittarius, Aquarius",
    rashi: "Universal Cosmic Talisman",
    numerologyNumber: "11",
    rating: 4.99,
    reviewCount: 184,
    benefits: [
      "Accelerates karmic timelines and dissolves outdated life situations",
      "Induces the famous 'Moldavite Flush'—an opening of the heart meridian",
      "Attracts profound spiritual synchronicities and destined soul connections",
      "Verified genuine Czech origin with authenticity certification"
    ]
  },
  {
    id: "pendant-rose-quartz-point",
    name: "Sacred Heart Madagascar Rose Quartz Obelisk Point Pendant",
    description: "A hand-carved hexagonal crystal generator point capped in 18K gold vermeil. Directs an uninterrupted beam of Venusian pink light directly into the Anahata heart center to heal emotional sorrow, inspire romantic poetry, and cultivate self-worth.",
    shortIntention: "Targeted Heart Healing, Romantic Fascination & Self-Love",
    price: 1999,
    salePrice: 1099,
    image: "/images/products/rose-quartz-new.jpg",
    gallery: [
      "/images/products/rose-quartz-new.jpg",
      "/images/products/rhodochrosite.jpg"
    ],
    category: "Pendants",
    badge: "Energized & Lab Certified",
    chakra: "Heart (Anahata)",
    planet: "Venus (Shukra)",
    zodiac: "Taurus, Libra, Cancer",
    rashi: "Vrishabha (Taurus)",
    numerologyNumber: "6",
    rating: 4.95,
    reviewCount: 215,
    benefits: [
      "Concentrates healing vibrational energy directly onto the sternum",
      "Dissolves stubborn emotional grief, anxiety, and heartbreak",
      "Enhances romantic magnetism and peaceful personal presence",
      "Cleansed with organic rose mist and charged under the full moon"
    ]
  },
  {
    id: "pendant-black-tourmaline-shield",
    name: "Black Tourmaline Hexagonal Core Ultimate Shield Pendant",
    description: "Raw crystalline Black Tourmaline set in a minimalist gold prong casing. Acts as a wearable EMF and psychic shield that grounds and neutralizes negative thoughts, envious gossip, and toxic office atmosphere before it touches your aura.",
    shortIntention: "Impenetrable Aura Armor, Nazar Ward & EMF Neutralizer",
    price: 1899,
    salePrice: 999,
    image: "/images/products/black-tourmaline.jpg",
    gallery: [
      "/images/products/black-tourmaline.jpg",
      "/images/products/black-obsidian-new.jpg"
    ],
    category: "Pendants",
    badge: "Energized & Lab Certified",
    chakra: "Root (Muladhara)",
    planet: "Saturn (Shani) & Rahu",
    zodiac: "Capricorn, Scorpio, Aquarius",
    rashi: "Makar (Capricorn)",
    numerologyNumber: "8",
    rating: 4.97,
    reviewCount: 310,
    benefits: [
      "Forms an active deflecting boundary against malice and evil eye",
      "Grounds scattered, anxious mental chatter into solid physical presence",
      "Filters electromagnetic radiation from laptops, phones, and travel",
      "Consecrated with 108 recitations of the Maha Mrityunjaya Mantra"
    ]
  },

  // ==========================================
  // CATEGORY 4: GEMSTONES
  // ==========================================
  {
    id: "gemstone-natural-yellow-sapphire",
    name: "Lab-Certified Natural Yellow Sapphire (Pukhraj) Loose Gemstone",
    description: "100% untreated natural Yellow Sapphire sourced from certified Sri Lankan mines. Exhibits luminous golden-canary brilliance. Revered in Vedic astrology as the supreme gemstone for Jupiter (Guru)—bestowing immense wealth, marital bliss, higher education, and royal honor.",
    shortIntention: "Jupiter Sovereign Grace, Supreme Wealth & Spiritual Wisdom",
    price: 12999,
    salePrice: 6499,
    image: "/images/products/citrine-new.jpg",
    gallery: [
      "/images/products/citrine-new.jpg",
      "/images/products/raw-pyrite.jpg"
    ],
    category: "Gemstones",
    badge: "Lab Certified Gemstone",
    chakra: "Solar Plexus & Crown",
    planet: "Jupiter (Guru Brihaspati)",
    zodiac: "Sagittarius, Pisces",
    rashi: "Dhanu (Sagittarius) & Meena (Pisces)",
    numerologyNumber: "3",
    rating: 5.0,
    reviewCount: 128,
    benefits: [
      "Bestows vast financial prosperity, business breakthroughs, and promotions",
      "Removes obstacles in marriage and brings righteous life partners",
      "Enhances scholarly focus, spiritual dharma, and legal victories",
      "Accompanied by a government-accredited Gemological Lab Certificate"
    ]
  },
  {
    id: "gemstone-natural-zambian-emerald",
    name: "Lab-Certified Natural Zambian Emerald (Panna) Loose Gemstone",
    description: "Exquisite deep velvet-green natural Emerald from Zambian deposits. Radiates the sublime, rejuvenating vibration of Mercury (Budh). Ideal for investment bankers, corporate negotiators, diplomats, and intellectuals seeking razor-sharp commercial agility.",
    shortIntention: "Commercial Genius, Eloquent Speech & Rapid Memory",
    price: 11499,
    salePrice: 5999,
    image: "/images/products/green-aventurine.jpg",
    gallery: [
      "/images/products/green-aventurine.jpg",
      "/images/products/amazonite.jpg"
    ],
    category: "Gemstones",
    badge: "Lab Certified Gemstone",
    chakra: "Heart (Anahata)",
    planet: "Mercury (Budh Dev)",
    zodiac: "Gemini, Virgo",
    rashi: "Mithun (Gemini) & Kanya (Virgo)",
    numerologyNumber: "5",
    rating: 4.98,
    reviewCount: 142,
    benefits: [
      "Stimulates extraordinary analytical acuity, quick wit, and persuasive speech",
      "Neutralizes Mercury afflictions in birth chart and cures communication anxiety",
      "Attracts lucrative commercial windfalls and successful investments",
      "Complete with comprehensive Gemological Institute Authenticity Report"
    ]
  },
  {
    id: "gemstone-ceylon-blue-sapphire",
    name: "Lab-Certified Ceylon Royal Blue Sapphire (Neelam) Gemstone",
    description: "Captivating cornflower to royal blue natural Ceylon Sapphire. The most potent and instantaneous gemstone in Vedic astrology, ruling Saturn (Shani). Bestows sudden elevation, fame, discipline, and insurmountable protection when aligned with the wearer's chart.",
    shortIntention: "Instant Elevation, Karmic Mastery & Royal Authority",
    price: 14999,
    salePrice: 7999,
    image: "/images/products/lapis-lazuli.jpg",
    gallery: [
      "/images/products/lapis-lazuli.jpg",
      "/images/products/amethyst-new.jpg"
    ],
    category: "Gemstones",
    badge: "Lab Certified Gemstone",
    chakra: "Third Eye & Throat",
    planet: "Saturn (Shani Dev)",
    zodiac: "Capricorn, Aquarius",
    rashi: "Makar (Capricorn) & Kumbh (Aquarius)",
    numerologyNumber: "8",
    rating: 4.99,
    reviewCount: 96,
    benefits: [
      "Drives dramatic upward leaps in wealth, status, and leadership influence",
      "Shields from sudden perils, accidents, and occult negativity",
      "Disciplines the mind into unwavering focus and stoic perseverance",
      "Full gemological laboratory analysis and spectroscopic certificate included"
    ]
  },

  // ==========================================
  // CATEGORY 5: CLUSTERS
  // ==========================================
  {
    id: "cluster-raw-amethyst-geode",
    name: "Master Uruguayan Amethyst Raw Geode Crystal Cluster",
    description: "A breathtaking natural crystalline geode cluster with deep royal purple terminated quartz points. Functions as a spiritual room resonator—purifying living spaces of discord, promoting deep relaxation, and recharging personal 8mm jewelry resting on its surface.",
    shortIntention: "Space Purification, Meditation Sanctuary & Crystal Recharger",
    price: 3499,
    salePrice: 1799,
    image: "/images/products/amethyst-new.jpg",
    gallery: [
      "/images/products/amethyst-new.jpg",
      "/images/products/selenite-new.jpg"
    ],
    category: "Clusters",
    badge: "Energized & Lab Certified",
    chakra: "Third Eye & Crown",
    planet: "Jupiter & Saturn",
    zodiac: "Aquarius, Pisces",
    rashi: "Kumbh & Meena",
    numerologyNumber: "7",
    rating: 4.97,
    reviewCount: 210,
    benefits: [
      "Transmutes household tension and domestic disputes into tranquil serenity",
      "Acts as a permanent natural charging dock for your 8mm crystal bracelets",
      "Deepens meditation practices and enhances restorative sleep when placed on nightstands",
      "100% natural mined geode specimen with unique geometric points"
    ]
  },
  {
    id: "cluster-golden-pyrite-wealth",
    name: "Golden Pyrite Imperial Abundance Wealth Cluster",
    description: "A dazzling natural mineral specimen consisting of interlocking cubic metallic pyrite crystals. Placed in office desks, cash boxes, or southeast wealth corners (Kuber Vastu zone) to radiate sovereign financial prosperity and attract lucrative deals.",
    shortIntention: "Vastu Wealth Magnet, Cash Flow Radiator & Corporate Fortune",
    price: 3299,
    salePrice: 1699,
    image: "/images/products/raw-pyrite.jpg",
    gallery: [
      "/images/products/raw-pyrite.jpg",
      "/images/products/metal-raw-pyrite.jpg"
    ],
    category: "Clusters",
    badge: "Tarot Reader's Bestseller",
    chakra: "Solar Plexus",
    planet: "Sun & Jupiter",
    zodiac: "Leo, Sagittarius, Taurus",
    rashi: "Simha & Dhanu",
    numerologyNumber: "1 & 8",
    rating: 4.99,
    reviewCount: 340,
    benefits: [
      "Energizes the home or office with sovereign golden business prosperity",
      "Rectifies Vastu doshas in financial corners and invites steady cash inflows",
      "Guards workspace from envious peers and disruptive corporate politics",
      "Cleansed with sacred Frankincense and charged with Lakshmi Beej chants"
    ]
  },
  {
    id: "cluster-clear-quartz-master-healer",
    name: "Clear Quartz Master Healer Multi-Terminated Cluster",
    description: "A majestic natural matrix of water-clear Himalayan quartz crystals radiating outward in all directions. Revered in ancient Vedic lore as 'Sphatik', this cluster acts as a high-frequency spiritual amplifier—programming and multiplying any intention placed upon it.",
    shortIntention: "Intention Amplification, Atmospheric Light & Master Healing",
    price: 3199,
    salePrice: 1599,
    image: "/images/products/clear-quartz.jpg",
    gallery: [
      "/images/products/clear-quartz.jpg",
      "/images/products/selenite-new.jpg"
    ],
    category: "Clusters",
    badge: "Energized & Lab Certified",
    chakra: "All 7 Chakras",
    planet: "Sun & Venus",
    zodiac: "All Zodiac Signs",
    rashi: "Universal Master Light",
    numerologyNumber: "11 / 22",
    rating: 4.96,
    reviewCount: 180,
    benefits: [
      "Amplifies the vibrational field of prayer, intentions, and manifestation journaling",
      "Neutralizes electromagnetic frequency fog from home WiFi and electronics",
      "Cleanses and refreshes any other stones resting nearby within seconds",
      "Authentic naturally formed multi-terminated crystalline quartz cluster"
    ]
  }
];

// ==========================================
// LUXURY BUNDLES (PROMOTIONAL ENGINE)
// ==========================================
export const luxuryBundles: Bundle[] = [
  {
    id: "abundance-protection-duo",
    name: "The Abundance & Protection Duo (8mm Beads)",
    tagline: "Golden Pyrite Wealth Magnet + Black Tourmaline Evil-Eye Shield (Both Made with 8mm Beads)",
    image: "/images/products/dhan-yog-main.jpg",
    items: [
      fallbackProducts.find((p) => p.id === "kundali-surya-dhan-yog-pyrite")!,
      fallbackProducts.find((p) => p.id === "mixel-love-protection-synergy")!
    ],
    bundlePrice: 1899,
    comparePrice: 4098,
    savings: 2199,
    badge: "Most Popular Pair (Save 54%)"
  },
  {
    id: "complete-chakra-harmony-set",
    name: "Complete 7-Chakra Harmony Set (8mm Bracelet + Cluster)",
    tagline: "8mm 7-Chakra Master Alignment Bracelet + Uruguayan Amethyst Geode Cluster",
    image: "/images/products/tree-agate.jpg",
    items: [
      fallbackProducts.find((p) => p.id === "chakra-7-harmony-bracelet")!,
      fallbackProducts.find((p) => p.id === "cluster-raw-amethyst-geode")!
    ],
    bundlePrice: 2499,
    comparePrice: 5298,
    savings: 2799,
    badge: "Complete Sanctuary Set"
  },
  {
    id: "custom-rashi-wealth-trio",
    name: "Custom Rashi Wealth Trio (8mm Synergy)",
    tagline: "Triple Synergy Mixel + Dhan Yog Pyrite + Golden Citrine Joy (All 8mm Stones)",
    image: "/images/products/money-maker.jpg",
    items: [
      fallbackProducts.find((p) => p.id === "mixel-triple-abundance")!,
      fallbackProducts.find((p) => p.id === "kundali-surya-dhan-yog-pyrite")!,
      fallbackProducts.find((p) => p.id === "kundali-budh-mercury-emerald-mix")!
    ],
    bundlePrice: 2899,
    comparePrice: 5897,
    savings: 2998,
    badge: "Ultimate Merchant Blessing"
  }
];

// In-cart upsells
export const cartUpsells: Product[] = [
  {
    id: "upsell-selenite-plate",
    name: "Raw Moroccan Selenite Charging Plate (4-Inch)",
    description: "Place your 8mm crystal bracelets on this pure lunar Selenite slab to recharge their vibration overnight effortlessly.",
    shortIntention: "Effortless Overnight Crystal Recharging for 8mm Bracelets",
    price: 999,
    salePrice: 499,
    image: "/images/products/selenite-new.jpg",
    category: "Clusters",
    badge: "Must-Have Accessory",
    chakra: "Crown",
    planet: "Moon",
    rating: 4.98,
    reviewCount: 310,
    benefits: ["Recharges 8mm crystal jewelry", "Zero maintenance needed"]
  },
  {
    id: "upsell-sacred-smudge-wand",
    name: "Himalayan White Sage & Loban Smudge Wand",
    description: "Organic sage tied with pure Loban resin for traditional space cleansing and aura purification.",
    shortIntention: "Sacred Smoke Clearing & Aura Reset",
    price: 599,
    salePrice: 299,
    image: "/images/products/howlite.jpg",
    category: "Clusters",
    badge: "Sanctuary Essential",
    chakra: "All",
    planet: "Sun",
    rating: 4.95,
    reviewCount: 190,
    benefits: ["Clears stagnant home energy", "Natural herbal aroma"]
  }
];

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { getProducts } = await import("@/lib/supabaseClient");
    const prods = await getProducts();
    return prods.length > 0 ? prods : fallbackProducts;
  } catch (err) {
    console.warn("Using luxury catalog fallback:", err);
    return fallbackProducts;
  }
}

export const products = fallbackProducts;
