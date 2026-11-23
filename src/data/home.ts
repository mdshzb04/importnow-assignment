// Verified content from the inspected reference; application components are authored independently.
export const serviceItems = [
  {
    "title": "Product sourcing",
    "description": "We find verified manufacturers across Yiwu, Guangzhou, Shenzhen and Foshan, and negotiate prices on your behalf."
  },
  {
    "title": "Factory inspection",
    "description": "Our team visits the factory in person. We check licences, samples and production capacity before you pay."
  },
  {
    "title": "Quality control",
    "description": "Pre-shipment checks with photo and video reports, done before the container is sealed."
  },
  {
    "title": "Shipping & logistics",
    "description": "Full-container and shared-container sea freight from Chinese ports, plus air cargo for urgent orders."
  },
  {
    "title": "Customs clearance",
    "description": "Documentation, duties, GST and clearance at Indian ports. No surprises when the ship lands."
  },
  {
    "title": "Doorstep delivery",
    "description": "From the port straight to your shop, warehouse, villa or site, with the container unloaded on location."
  }
] as const;

export const industryItems = [
  {
    "hub": "Foshan hub",
    "title": "Furniture & interiors",
    "items": [
      "Complete home and villa furniture",
      "Office desks and executive chairs",
      "Banquet hall and hotel fit-outs"
    ],
    "note": "Height-adjustable desk from ₹45,000 · MOQ 1"
  },
  {
    "hub": "Shenzhen hub",
    "title": "Electronics & tech",
    "items": [
      "LED screens and digital signage",
      "Mobile accessories in bulk",
      "Power bank rental kiosks"
    ],
    "note": "Business ideas India doesn't have yet"
  },
  {
    "hub": "Guangzhou hub",
    "title": "EV & automotive",
    "items": [
      "Electric scooters as kits for assembly in India",
      "Battery cells sourced separately",
      "Car LED lights with your own brand"
    ],
    "note": "Car LED private label · MOQ 500"
  },
  {
    "hub": "Guzhen hub",
    "title": "Lighting",
    "items": [
      "Decorative and architectural lighting",
      "Commercial LED fixtures",
      "Custom designs for projects"
    ],
    "note": "Direct from the lighting capital of China"
  },
  {
    "hub": "Yiwu hub",
    "title": "Supermarket & general goods",
    "items": [
      "Complete store stock in one container",
      "Home, kitchen, toys and gifts",
      "Choose products over video call"
    ],
    "note": "World's largest small-goods market"
  },
  {
    "hub": "Pan-China",
    "title": "Machinery & automation",
    "items": [
      "Production and packaging machines",
      "Smart vending and robotic kiosks",
      "Spares and after-sales support"
    ],
    "note": "Tell us the machine, we find the factory"
  }
] as const;

export const deliveries = [
  {
    "title": "Complete villa furniture",
    "description": "Sofas, dining sets, office furniture and pergolas, all in one container delivered to a luxury villa.",
    "route": "Foshan → Villa",
    "tags": [
      "Full container",
      "Door delivery"
    ]
  },
  {
    "title": "Sagar Supermarket",
    "description": "Complete supermarket stock sourced from Yiwu over video calls and delivered to the client's warehouse.",
    "route": "Yiwu → Adilabad",
    "tags": [
      "Retail",
      "Video sourcing"
    ]
  },
  {
    "title": "Sreeman Convention Centre",
    "description": "Cots, beds, dining sets and office furniture for a convention venue, with better finish for the same budget.",
    "route": "China → Convention",
    "tags": [
      "Hospitality",
      "Bulk order"
    ]
  },
  {
    "title": "Smart office desks",
    "description": "Motorised height-adjustable L-shaped desks, imported even as a single piece.",
    "route": "China → Hyderabad",
    "tags": [
      "MOQ 1",
      "~30 days"
    ]
  }
] as const;

export const stories = [
  {
    "quote": "I came to source LED screens and electronics. The Guangzhou and Shenzhen markets were easy to navigate, and hotels, food and travel were all taken care of.",
    "initials": "S",
    "name": "Sai",
    "role": "Ad-tech startup · Siddipet"
  },
  {
    "quote": "Twelve days covering the Canton Fair and factories of my choice. Visa, guidance, Indian food every day. It felt like a personal trip, not a business tour.",
    "initials": "M",
    "name": "Mahender Reddy",
    "role": "Canton Fair trip client"
  },
  {
    "quote": "We picked our products on video calls, and the container came straight from Yiwu to our warehouse. The whole process was hassle-free.",
    "initials": "SS",
    "name": "Sagar Supermarket",
    "role": "Retail · Adilabad"
  }
] as const;

export const faqItems = [
  {
    "question": "Can I import just one piece?",
    "answer": "Yes, for many products. Furniture like height-adjustable desks can be imported with a minimum order of one piece. Private-label products, such as car LED lights, usually start from around 500 units."
  },
  {
    "question": "How long does delivery take?",
    "answer": "Most sea shipments reach your door in about 30 to 40 days, depending on the product, the factory's production time and the destination port. Air cargo is faster for urgent orders."
  },
  {
    "question": "Do you handle customs and GST?",
    "answer": "Yes. We prepare the documentation and manage duties, GST and clearance at the Indian port, then deliver to your address."
  },
  {
    "question": "Do I need an Import Export Code (IEC)?",
    "answer": "For commercial imports, yes. If you don't have one yet, we'll guide you through getting it."
  },
  {
    "question": "Can I visit the factories myself?",
    "answer": "Absolutely. Join one of our guided China business trips, or we can arrange visits to the factories you've shortlisted."
  },
  {
    "question": "What's the best business to start by importing from China?",
    "answer": "It depends on your interests and budget. Popular choices with our clients include furniture, EV scooters, car accessories, lighting and supermarket goods. Talk to us and we'll suggest options that fit your market."
  }
] as const;

export const licenceChecks = [
  {
    "bold": "Registered business licence",
    "rest": " issued in Shanghai, China"
  },
  {
    "bold": "Chinese company bank account",
    "rest": ", so payments to factories are safe and traceable"
  },
  {
    "bold": "Team on the ground",
    "rest": " for factory visits, quality checks and market trips"
  },
  {
    "bold": "Indian founder on both sides",
    "rest": ": talk to us in Telugu, Hindi or English"
  }
] as const;

export const licenceFacts = [
  {
    "label": "Company",
    "value": "Shanghai Shengqiao Chain Trading Co., Ltd."
  },
  {
    "label": "Location",
    "value": "Shanghai, People's Republic of China"
  },
  {
    "label": "Scope",
    "value": "Supply chain, sourcing & international trade"
  },
  {
    "label": "Serving",
    "value": "Importers across India"
  }
] as const;

export const tripInclusions = [
  "Visa guidance & invitation letter",
  "Hotels close to the fair",
  "Indian food daily, veg & non-veg",
  "Guides & translators",
  "Factory visits you choose",
  "Sightseeing between markets"
] as const;

export const tripCities = [
  "Guangzhou",
  "Shenzhen",
  "Yiwu",
  "Foshan",
  "Macau",
  "Glass bridge"
] as const;

export const departures = [
  {
    "season": "Spring",
    "dates": "Canton Fair · April–May"
  },
  {
    "season": "Autumn",
    "dates": "Canton Fair · October–November"
  }
] as const;

export const quoteCategories = [
  "Furniture & interiors",
  "Electronics & tech",
  "EV & automotive",
  "Lighting",
  "Supermarket & general goods",
  "Machinery",
  "China business trip / Canton Fair",
  "Something else"
] as const;

export const quoteBudgets = [
  "Under ₹1 lakh",
  "₹1–5 lakh",
  "₹5–25 lakh",
  "₹25 lakh+"
] as const;
