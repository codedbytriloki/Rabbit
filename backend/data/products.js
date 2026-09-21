const products = [
  {
    name: "Casual Shirt",
    description:
      "A soft, breathable casual t-shirt with a classic fit. Features a round neckline and short sleeves, perfect for everyday wear.",
    price: 25,
    discountPrice: 20,
    countInStock: 50,
    sku: "TW-W-003",
    category: "Top Wear",
    brand: "ComfyTees",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    collections: "Essentials",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "../assets/Casual Shirt.jpeg",
        altText: "Casual T-Shirt",
      }
    ]
  },
  {
    name: "Classic Check Shirt",
    description:
      "A versatile check shirt that can be dressed up or down. Made from soft fabric with a tailored fit, it's perfect for both casual and formal occasions.",
    price: 60,
    discountPrice: 55,
    countInStock: 25,
    sku: "TW-W-009",
    category: "Top Wear",
    brand: "ClassicStyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green", "Blue", "Orange"],
    collections: "Office Collection",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "../assets/Classic Check Shirt1.jpeg",
        altText: "Classic Check Shirt",
      },
      {
        url: "../assets/Classic Check Shirt2.jpeg",
        altText: "Classic Check Shirt",
      },
      {
        url: "../assets/Classic Check Shirt3.jpeg",
        altText: "Classic Check Shirt",
      },
    ],
  },
  {
    name: "Classic Pleated Trousers",
    description:
      "Timeless pleated trousers with a tailored fit. A wardrobe essential for workwear or formal occasions.",
    price: 70,
    discountPrice: 65,
    countInStock: 25,
    sku: "BW-W-010",
    category: "Bottom Wear",
    brand: "ElegantWear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green", "Brown", "Gray"],
    collections: "Formal Collection",
    material: "Wool Blend",
    gender: "Women",
    images: [
      {
        url: "../assets/Classic Plaated Trousers1.jpeg",
        altText: "Classic Pleated Trousers Front View",
      },
      {
        url: "../assets/Classic Plaated Trousers2.jpeg",
        altText: "Classic Pleated Trousers Front View",
      },
      {
        url: "../assets/Classic Plaated Trousers3.jpeg",
        altText: "Classic Pleated Trousers Front View",
      },
    ]
  },
  {
    name: "V-Neck Wrap Top",
    description:
      "A chic v-neck wrap top with a tie waist. Its elegant style makes it perfect for both casual and semi-formal occasions.",
    price: 50,
    discountPrice: 45,
    countInStock: 30,
    sku: "TW-W-010",
    category: "Top Wear",
    brand: "ChicWrap",
    sizes: ["S", "M", "L"],
    colors: ["White"],
    collections: "Evening Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "../assets/V-Neck Wrap Top.jpeg",
        altText: "V-Neck Wrap Top",
      },
    ],
    rating: 4,
    numReviews: 22,
  },
  {
    name: "Elegant White Shirt",
    description: "Classic formal white shirt with a slim fit design, suitable for office and formal occasions.",
    price: 55,
    discountPrice: 50,
    countInStock: 30,
    sku: "TW-M-011",
    category: "Top Wear",
    brand: "EliteStyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue"],
    collections: "Formal Collection",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "../assets/Elegant White Shirt.jpeg",
        altText: "Elegant White Shirt",
      },
      {
        url: "../assets/Elegant White Shirt1.jpeg",
        altText: "Elegant White Shirt Blue",
      }
    ],
    rating: 4.7,
    numReviews: 22
  },
  {
    name: "Essential White T-Shirt",
    description: "Comfortable everyday t-shirt made from soft cotton fabric.",
    price: 25,
    discountPrice: 20,
    countInStock: 60,
    sku: "TW-M-012",
    category: "Top Wear",
    brand: "UrbanBasics",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Gray"],
    collections: "Essentials",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "../assets/Essential White T-Shirt.jpeg",
        altText: "Essential White T-Shirt",
      },
      {
        url: "../assets/Essential White T-Shirt2.jpeg",
        altText: "Essential White T-Shirt Gray",
      }
    ]
  },
  {
    name: "Flared Palazzo Pants",
    description: "Flowy palazzo pants with a relaxed fit, ideal for casual and vacation wear.",
    price: 65,
    discountPrice: 58,
    countInStock: 25,
    sku: "BW-W-011",
    category: "Bottom Wear",
    brand: "FashionFlow",
    sizes: ["S", "M", "L"],
    colors: ["Skyblue", "Green", "Blue"],
    collections: "Summer Collection",
    material: "Rayon",
    gender: "Women",
    images: [
      {
        url: "../assets/Flared Palazzo Pants1.jpeg",
        altText: "Pink Palazzo Pants",
      },
      {
        url: "../assets/Flared Palazzo Pants2.jpeg",
        altText: "Green Palazzo Pants",
      },
      {
        url: "../assets/Flared Palazzo Pants3.jpeg",
        altText: "Blue Palazzo Pants",
      }
    ]
  },
  {
    name: "Formal Pants",
    description: "Tailored formal pants offering comfort and sophistication.",
    price: 70,
    discountPrice: 65,
    countInStock: 30,
    sku: "BW-M-012",
    category: "Bottom Wear",
    brand: "BusinessWear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray"],
    collections: "Office Collection",
    material: "Polyester Blend",
    gender: "Men",
    images: [
      {
        url: "../assets/Formal Pants.jpeg",
        altText: "Formal Pants",
      }
    ]
  },
  {
    name: "High Waist Skinny Jeans",
    description: "Stylish high-waist skinny jeans designed for a flattering fit.",
    price: 60,
    discountPrice: 55,
    countInStock: 40,
    sku: "BW-W-012",
    category: "Bottom Wear",
    brand: "DenimClub",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Green", "Black"],
    collections: "Denim Collection",
    material: "Denim",
    gender: "Women",
    images: [
      {
        url: "../assets/HighWaist Skinny Jeans1.jpeg",
        altText: "White Skinny Jeans",
      },
      {
        url: "../assets/HighWaist Skinny Jeans2.jpeg",
        altText: "Green Skinny Jeans",
      },
      {
        url: "../assets/HighWaist Skinny Jeans3.jpeg",
        altText: "Black Skinny Jeans",
      }
    ]
  },
  {
    name: "Knitted Cropped Top",
    description: "Soft knitted crop top with a trendy silhouette.",
    price: 35,
    discountPrice: 30,
    countInStock: 40,
    sku: "TW-W-011",
    category: "Top Wear",
    brand: "CozyStyle",
    sizes: ["S", "M", "L"],
    colors: ["White"],
    collections: "Casual Collection",
    material: "Knit Cotton",
    gender: "Women",
    images: [
      {
        url: "../assets/Knitted Cropped Top.jpeg",
        altText: "Knitted Cropped Top",
      }
    ]
  },

  {
    name: "Pleated Midi Skirt",
    description: "Elegant midi skirt featuring soft pleats and a modern fit.",
    price: 50,
    discountPrice: 45,
    countInStock: 35,
    sku: "BW-W-013",
    category: "Bottom Wear",
    brand: "GraceWear",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Green"],
    collections: "Elegant Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "../assets/Pleated Midi Skirt1.jpeg",
        altText: "Pleated Midi Skirt Beige",
      },
      {
        url: "../assets/Pleated Midi Skirt2.jpeg",
        altText: "Pleated Midi Skirt Green",
      }
    ]
  },
  {
    name: "Elegant Dress",
    description: "Sophisticated dress perfect for parties, events, and evening occasions.",
    price: 95,
    discountPrice: 85,
    countInStock: 20,
    sku: "DR-W-001",
    category: "Dresses",
    brand: "LuxeFashion",
    sizes: ["S", "M", "L"],
    colors: ["Cream"],
    collections: "Evening Collection",
    material: "Satin",
    gender: "Women",
    images: [
      {
        url: "../assets/Elegant Dress.jpeg",
        altText: "Elegant Dress",
      }
    ]
  },
  {
    name: "Culottes Pants",
    description: "Wide-leg culottes offering all-day comfort and effortless style.",
    price: 55,
    discountPrice: 48,
    countInStock: 28,
    sku: "BW-W-014",
    category: "Bottom Wear",
    brand: "UrbanLady",
    sizes: ["S", "M", "L"],
    colors: ["White"],
    collections: "Summer Collection",
    material: "Linen Blend",
    gender: "Women",
    images: [
      {
        url: "../assets/Culottes.jpeg",
        altText: "Culottes Pants",
      }
    ]
  },

  {
    name: "Stretch Leggings",
    description: "Comfortable stretch leggings designed for casual and active wear.",
    price: 30,
    discountPrice: 25,
    countInStock: 50,
    sku: "BW-W-015",
    category: "Bottom Wear",
    brand: "FlexFit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gold"],
    collections: "Active Collection",
    material: "Spandex Blend",
    gender: "Women",
    images: [
      {
        url: "../assets/Stretch Leggings.jpeg",
        altText: "Stretch Leggings",
      }
    ]
  },
  {
    name: "Stylish Jacket",
    description: "Lightweight stylish jacket suitable for casual outings and layering.",
    price: 85,
    discountPrice: 75,
    countInStock: 22,
    sku: "OW-M-001",
    category: "Outerwear",
    brand: "StreetMode",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige"],
    collections: "Winter Collection",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "../assets/Stylish Jacket.jpeg",
        altText: "Stylish Jacket",
      }
    ]
  },
  {
    name: "Track Pants",
    description: "Relaxed fit track pants perfect for workouts and casual wear.",
    price: 40,
    discountPrice: 35,
    countInStock: 45,
    sku: "BW-W-016",
    category: "Bottom Wear",
    brand: "ActiveMove",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue"],
    collections: "Sports Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "../assets/Track Pants.jpeg",
        altText: "Track Pants",
      }
    ]
  },
  {
    name: "Trendy Sneakers",
    description: "Modern sneakers with lightweight cushioning and stylish design.",
    price: 80,
    discountPrice: 72,
    countInStock: 35,
    sku: "FW-U-001",
    category: "Footwear",
    brand: "UrbanStep",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["White"],
    collections: "Sneaker Collection",
    material: "Mesh",
    gender: "Unisex",
    images: [
      {
        url: "../assets/Trendy Sneakers.jpeg",
        altText: "Trendy Sneakers",
      }
    ]
  },
  {
    name: "Urban Denim Outfit",
    description: "Stylish oversized denim outfit for a modern streetwear look.",
    price: 90,
    discountPrice: 80,
    countInStock: 20,
    sku: "SET-W-001",
    category: "Co-ord Set",
    brand: "DenimStreet",
    sizes: ["S", "M", "L"],
    colors: ["Blue"],
    collections: "Street Collection",
    material: "Denim",
    gender: "Women",
    images: [
      {
        url: "../assets/Urdan Demin Jacket.jpeg",
        altText: "Urban Denim Outfit",
      }
    ]
  },
  {
    name: "Ruffle Sleeve Blouse",
    description: "Elegant blouse with delicate ruffle sleeves for a feminine touch.",
    price: 45,
    discountPrice: 40,
    countInStock: 35,
    sku: "TW-W-012",
    category: "Top Wear",
    brand: "ElegantCharm",
    sizes: ["S", "M", "L"],
    colors: ["Blue"],
    collections: "Party Collection",
    material: "Chiffon",
    gender: "Women",
    images: [
      {
        url: "../assets/Ruffle Sleeve Blouse.jpeg",
        altText: "Ruffle Sleeve Blouse",
      }
    ]
  },
  {
    name: "Slim-Fit Easy-Iron Shirt",
    description:
      "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette. Features a turn-down collar, classic button placket, and a yoke at the back. Long sleeves and adjustable button cuffs with a rounded hem.",
    price: 34.99,
    discountPrice: 29.99,
    countInStock: 30,
    sku: "SLIM-EIR-005",
    category: "Top Wear",
    brand: "Urban Chic",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    collections: "Business Wear",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "../assets/SlimFitEasyIronShirt1.jpeg",
        altText: "Slim-Fit Easy-Iron Shirt Front View",
      },
      {
        url: "../assets/SlimFitEasyronShirt2.jpeg",
        altText: "Slim-Fit Easy-Iron Shirt Front View",
      },
    ],
  },
  {
    name: "Cargo Pants",
    description:
      "Stylish cargo pants with multiple utility pockets, designed for casual and streetwear looks.",
    price: 65,
    discountPrice: 58,
    countInStock: 35,
    sku: "MP-017",
    category: "Bottom Wear",
    brand: "UrbanCargo",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Gray"],
    collections: "Street Collection",
    material: "Cotton Twill",
    gender: "Men",
    images: [
      {
        url: "../assets/Cargo Pant1.jpeg",
        altText: "White Cargo Pants",
      },
      {
        url: "../assets/Cargo Pant2.jpeg",
        altText: "Beige Cargo Pants",
      },
    ],
  },

  {
    name: "Crop Top",
    description:
      "A trendy crop top with a flattering fit, perfect for summer styling and casual outings.",
    price: 35,
    discountPrice: 30,
    countInStock: 40,
    sku: "MP-018",
    category: "Top Wear",
    brand: "TrendyFit",
    sizes: ["S", "M", "L"],
    colors: ["Brown", "Gray"],
    collections: "Summer Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "../assets/Crop Top1.jpeg",
        altText: "Brown Crop Top",
      },
      {
        url: "../assets/Crop Top2.jpeg",
        altText: "Gray Crop Top",
      },
    ],
  },

  {
    name: "Formal Wide Leg Jeans",
    description:
      "Elegant high-waisted wide leg jeans offering both comfort and sophistication.",
    price: 75,
    discountPrice: 68,
    countInStock: 28,
    sku: "MP-019",
    category: "Bottom Wear",
    brand: "DenimElegance",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue"],
    collections: "Premium Denim",
    material: "Denim",
    gender: "Women",
    images: [
      {
        url: "../assets/Formal Jeans.jpeg",
        altText: "Formal Wide Leg Jeans",
      },
    ],
  },

  {
    name: "High Waist Denim Shorts",
    description:
      "Fashionable high-waist shorts with a modern fit, ideal for warm weather.",
    price: 40,
    discountPrice: 35,
    countInStock: 45,
    sku: "MP-020",
    category: "Bottom Wear",
    brand: "DenimClub",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Gray"],
    collections: "Summer Essentials",
    material: "Denim",
    gender: "Women",
    images: [
      {
        url: "../assets/HighWaistShort1.jpeg",
        altText: "Blue High Waist Shorts",
      },
      {
        url: "../assets/HighWaistShort2.jpeg",
        altText: "Gray High Waist Shorts",
      },
    ],
  },
  {
    name: "Casual Joggers",
    description:
      "Relaxed fit joggers designed for comfort, workouts, and everyday wear.",
    price: 50,
    discountPrice: 44,
    countInStock: 50,
    sku: "MP-021",
    category: "Bottom Wear",
    brand: "MoveFlex",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Olive"],
    collections: "Athleisure Collection",
    material: "Cotton Polyester",
    gender: "Men",
    images: [
      {
        url: "../assets/Joggers1.jpeg",
        altText: "Blue Joggers",
      },
      {
        url: "../assets/Joggers2.jpeg",
        altText: "Black Joggers",
      },
      {
        url: "../assets/Joggers3.jpeg",
        altText: "Olive Joggers",
      },
    ],
  },

]

export default products




