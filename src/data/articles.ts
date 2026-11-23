// Verified article prose and metadata from the inspected reference, 23 November 2026.
// Bodies are typed semantic content; no reference HTML templates run in the app.
export type ArticleTag = 'p' | 'h2' | 'strong' | 'em' | 'div' | 'ul' | 'ol' | 'li' | 'table' | 'thead' | 'tbody' | 'tr' | 'th' | 'td';
export type ArticleNode = string | { tag: ArticleTag; children: ArticleNode[]; className?: string; id?: string };
export type CoverVariant = 'cv1' | 'cv2' | 'cv3' | 'cv4' | 'cv5' | 'cv6';
export type CoverIcon = 'route' | 'market' | 'sofa' | 'scooter' | 'plane' | 'shield' | 'container' | 'doc' | 'bulb';
export type Category = 'Import guides' | 'Wholesale markets' | 'Product guides' | 'Business ideas' | 'China trips' | 'Shipping' | 'Customs';
export interface Article { slug: string; title: string; cat: Category; date: string; mins: number; cv: CoverVariant; icon: CoverIcon; excerpt: string; body: ArticleNode[] }
export const articles: readonly Article[] = [
  {
    "slug": "how-to-import-from-china-to-india",
    "title": "How to Import from China to India in 2026: A Step-by-Step Guide",
    "cat": "Import guides",
    "date": "2026-11-18",
    "mins": 7,
    "cv": "cv1",
    "icon": "route",
    "excerpt": "From getting your IEC to receiving the container at your door, here is the full import process explained in plain language for first-time importers.",
    "body": [
      {
        "tag": "p",
        "children": [
          "Importing directly from China is one of the fastest ways for an Indian business to improve margins. Prices can be far lower than buying from local wholesalers. The process has a lot of moving parts, though, and one wrong step can cost weeks. Here is the whole journey, in order."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "1. Get your Import Export Code (IEC)"
        ],
        "id": "s1"
      },
      {
        "tag": "p",
        "children": [
          "Every commercial importer in India needs an ",
          {
            "tag": "strong",
            "children": [
              "IEC"
            ]
          },
          ", issued online by the DGFT and linked to your PAN. It's a one-time registration and is usually approved quickly once your documents are in order. Without an IEC, customs won't clear your goods."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "2. Decide exactly what you want to import"
        ],
        "id": "s2"
      },
      {
        "tag": "p",
        "children": [
          "Be specific: material, size, colour, power rating, packaging, quantity. The clearer your specification, the more accurate your quotes will be. Also check whether your product needs ",
          {
            "tag": "strong",
            "children": [
              "BIS certification"
            ]
          },
          " (many electronics, LED lights and power banks do) or other approvals before it can enter India."
        ]
      },
      {
        "tag": "div",
        "children": [
          "Tip: find your product's HS code early. It decides your customs duty, and whether special rules or certifications apply."
        ],
        "className": "callout"
      },
      {
        "tag": "h2",
        "children": [
          "3. Find and verify suppliers"
        ],
        "id": "s3"
      },
      {
        "tag": "p",
        "children": [
          "Online platforms are a starting point, but many listings are traders, not factories. Shortlist 3–5 suppliers, ask for their business licence, and compare more than just the price. Check MOQ, lead time, payment terms and sample quality. If you can, have someone visit the factory."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "4. Approve samples and negotiate"
        ],
        "id": "s4"
      },
      {
        "tag": "p",
        "children": [
          "Never place a bulk order without approving a sample. Agree in writing on specifications, packaging, Incoterms (FOB or EXW are most common), payment milestones and what happens if quality fails."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "5. Production and quality inspection"
        ],
        "id": "s5"
      },
      {
        "tag": "p",
        "children": [
          "A typical payment pattern is 30% advance and 70% before shipping. Book a ",
          {
            "tag": "strong",
            "children": [
              "pre-shipment inspection"
            ]
          },
          " before paying the balance, so problems are found while the goods are still at the factory."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "6. Shipping: FCL or LCL"
        ],
        "id": "s6"
      },
      {
        "tag": "p",
        "children": [
          "Large orders travel in a full container (FCL). Smaller ones share space with other importers' cargo (LCL). Sea freight from Chinese ports to Nhava Sheva, Chennai or Vizag usually takes 2–4 weeks on the water, plus time at the ports."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "7. Customs clearance in India"
        ],
        "id": "s7"
      },
      {
        "tag": "p",
        "children": [
          "A customs broker files your Bill of Entry with the commercial invoice, packing list and bill of lading. You pay Basic Customs Duty, the Social Welfare Surcharge and IGST. The IGST can usually be claimed back as input tax credit."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "8. Delivery to your door"
        ],
        "id": "s8"
      },
      {
        "tag": "p",
        "children": [
          "Once cleared, the container is trucked to your warehouse, shop or site and unloaded. Door-to-door, most sea shipments take around 30–40 days from the factory."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Want someone to handle all of this?"
        ],
        "id": "s9"
      },
      {
        "tag": "p",
        "children": [
          "ImportNow manages every step above, from sourcing to delivery, with our own registered company in Shanghai. Tell us what you want to import and we'll come back with suppliers, landed cost and timelines."
        ]
      }
    ]
  },
  {
    "slug": "yiwu-vs-guangzhou-vs-foshan",
    "title": "Yiwu, Guangzhou or Foshan? Choosing the Right Chinese Market for Your Product",
    "cat": "Wholesale markets",
    "date": "2026-11-12",
    "mins": 6,
    "cv": "cv2",
    "icon": "market",
    "excerpt": "China has a different manufacturing hub for almost every industry. Going to the right one can cut your costs and save days of searching.",
    "body": [
      {
        "tag": "p",
        "children": [
          "One of the most common questions we get is: ",
          {
            "tag": "em",
            "children": [
              "\"Where in China should I buy from?\""
            ]
          },
          " The answer depends entirely on your product. Each region has spent decades specialising."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Yiwu: small goods in huge variety"
        ],
        "id": "s1"
      },
      {
        "tag": "p",
        "children": [
          "Yiwu International Trade City is one of the largest small-commodity markets in the world, with tens of thousands of booths. It's ideal for:"
        ]
      },
      {
        "tag": "ul",
        "children": [
          {
            "tag": "li",
            "children": [
              "Supermarket and general store stock"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Toys, gifts, stationery and festival items"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Kitchenware, home and household goods"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Mixed containers with many product types"
            ]
          }
        ]
      },
      {
        "tag": "p",
        "children": [
          "Yiwu works well when you want to ",
          {
            "tag": "strong",
            "children": [
              "fill one container with hundreds of different items"
            ]
          },
          ". Our Adilabad supermarket client did exactly this."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Guangzhou: fashion, beauty, auto parts and the Canton Fair"
        ],
        "id": "s2"
      },
      {
        "tag": "p",
        "children": [
          "Guangzhou has wholesale markets for garments, leather, cosmetics, electronics accessories and auto parts. It also hosts the ",
          {
            "tag": "strong",
            "children": [
              "Canton Fair"
            ]
          },
          " twice a year, so it's the natural base for a sourcing trip."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Shenzhen: electronics and technology"
        ],
        "id": "s3"
      },
      {
        "tag": "p",
        "children": [
          "Right next door, Shenzhen is the world's electronics workshop: LED screens, mobile accessories, power banks, smart devices and components. Huaqiangbei market alone can keep you busy for days."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Foshan: furniture"
        ],
        "id": "s4"
      },
      {
        "tag": "p",
        "children": [
          "Foshan, about an hour from Guangzhou, is China's furniture capital. Showrooms there stretch for kilometres, covering home, office, hotel and outdoor furniture. Most villa and office projects we deliver are sourced here."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Guzhen: lighting"
        ],
        "id": "s5"
      },
      {
        "tag": "p",
        "children": [
          "Guzhen in Zhongshan is known as China's lighting capital, covering decorative chandeliers, commercial LED fixtures and custom project lighting."
        ]
      },
      {
        "tag": "table",
        "children": [
          {
            "tag": "thead",
            "children": [
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "th",
                    "children": [
                      "Product"
                    ]
                  },
                  {
                    "tag": "th",
                    "children": [
                      "Best hub"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "tag": "tbody",
            "children": [
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "General goods, supermarket stock"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "Yiwu"
                    ]
                  }
                ]
              },
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "Furniture & interiors"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "Foshan"
                    ]
                  }
                ]
              },
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "Electronics & gadgets"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "Shenzhen"
                    ]
                  }
                ]
              },
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "Garments, beauty, auto parts"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "Guangzhou"
                    ]
                  }
                ]
              },
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "Lighting"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "Guzhen"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "tag": "p",
        "children": [
          "Not sure which market fits your idea? Tell us the product and we'll point you to the right hub, or take you there on our next China trip."
        ]
      }
    ]
  },
  {
    "slug": "importing-furniture-from-china",
    "title": "Importing Furniture from China: Costs, MOQ and What to Check",
    "cat": "Product guides",
    "date": "2026-11-05",
    "mins": 6,
    "cv": "cv6",
    "icon": "sofa",
    "excerpt": "Premium designs at a better price. Here is what villa owners, offices and hotels should know before importing furniture from Foshan.",
    "body": [
      {
        "tag": "p",
        "children": [
          "Ever wondered why furniture in premium interiors looks different? Much of it comes down to design, detailing and finish, and many of those pieces come from China. Importing directly can give you better quality for the same budget."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "What can you import?"
        ],
        "id": "s1"
      },
      {
        "tag": "ul",
        "children": [
          {
            "tag": "li",
            "children": [
              "Complete home and villa furniture: sofas, beds, dining sets, wardrobes"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Office furniture: executive desks, height-adjustable tables, workstations, chairs"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Hotel, banquet and convention furniture"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Outdoor furniture and pergolas"
            ]
          }
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Minimum order quantity"
        ],
        "id": "s2"
      },
      {
        "tag": "p",
        "children": [
          "For many furniture items there's effectively ",
          {
            "tag": "strong",
            "children": [
              "no MOQ"
            ]
          },
          ", because showrooms in Foshan sell single pieces. A motorised height-adjustable L-shaped desk, for example, can be imported as just one unit. To keep freight cost per piece down, most clients combine items into a shared (LCL) or full container."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "How is the cost calculated?"
        ],
        "id": "s3"
      },
      {
        "tag": "p",
        "children": [
          "Your final ",
          {
            "tag": "strong",
            "children": [
              "landed cost"
            ]
          },
          " = product price + packing + freight + insurance + customs duty + IGST + port and delivery charges. Furniture is bulky, so freight is calculated by volume (CBM). Packing smartly makes a real difference."
        ]
      },
      {
        "tag": "div",
        "children": [
          "Example: we've delivered a height-adjustable executive desk to Hyderabad for around ₹45,000, all-in, in about 30 days."
        ],
        "className": "callout"
      },
      {
        "tag": "h2",
        "children": [
          "What to check before you pay"
        ],
        "id": "s4"
      },
      {
        "tag": "ol",
        "children": [
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Materials:"
                ]
              },
              " solid wood or MDF/engineered wood, fabric grade, foam density, hardware brand."
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Finish samples:"
                ]
              },
              " ask for photos and videos under natural light, or swatches."
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Dimensions:"
                ]
              },
              " confirm everything fits your space and doorways."
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Packing:"
                ]
              },
              " furniture must be export-packed with corner protectors and moisture protection."
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Assembly:"
                ]
              },
              " knock-down (flat-pack) items are much cheaper to ship."
            ]
          }
        ]
      },
      {
        "tag": "h2",
        "children": [
          "How long does it take?"
        ],
        "id": "s5"
      },
      {
        "tag": "p",
        "children": [
          "Ready stock can ship within a week. Made-to-order pieces usually take 15–30 days to produce. Add 3–4 weeks for sea freight and clearance."
        ]
      }
    ]
  },
  {
    "slug": "ev-scooter-business-ckd-kits",
    "title": "Starting an EV Scooter Business with CKD Kits from China",
    "cat": "Business ideas",
    "date": "2026-10-28",
    "mins": 6,
    "cv": "cv3",
    "icon": "scooter",
    "excerpt": "Importing electric scooters as completely knocked-down kits and assembling them in India can be a high-margin business, if you plan it right.",
    "body": [
      {
        "tag": "p",
        "children": [
          "India's electric two-wheeler market keeps growing, and many new brands start the same way: import scooters from Chinese factories as ",
          {
            "tag": "strong",
            "children": [
              "CKD (Completely Knocked Down) kits"
            ]
          },
          " and assemble them locally."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Why CKD instead of fully built scooters?"
        ],
        "id": "s1"
      },
      {
        "tag": "ul",
        "children": [
          {
            "tag": "li",
            "children": [
              "Lower import duty than fully built units (CBU)"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Far more units fit in one container"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Local assembly creates your own brand and jobs"
            ]
          },
          {
            "tag": "li",
            "children": [
              "You can choose local batteries, chargers and tyres"
            ]
          }
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Know the regulations first"
        ],
        "id": "s2"
      },
      {
        "tag": "p",
        "children": [
          {
            "tag": "strong",
            "children": [
              "Low-speed scooters"
            ]
          },
          " (top speed under 25 km/h and motor up to 250 W) don't need registration or a driving licence, so they're the simplest to start with. ",
          {
            "tag": "strong",
            "children": [
              "High-speed models"
            ]
          },
          " need type approval (homologation) from a testing agency such as ARAI or ICAT, and their batteries must meet Indian safety standards."
        ]
      },
      {
        "tag": "div",
        "children": [
          "Always confirm the current rules for your model with a homologation consultant before you place an order."
        ],
        "className": "callout warn"
      },
      {
        "tag": "h2",
        "children": [
          "Battery strategy"
        ],
        "id": "s3"
      },
      {
        "tag": "p",
        "children": [
          "Many assemblers import the scooter kit without batteries and buy battery packs locally, or import cells and assemble certified packs. This makes compliance easier and can lower shipping complications."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Choosing the factory"
        ],
        "id": "s4"
      },
      {
        "tag": "p",
        "children": [
          "Visit showrooms, test-ride the models, and compare motor brands, controllers, frame quality and spare-part support. Ask how many models they have already exported to India."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Costs"
        ],
        "id": "s5"
      },
      {
        "tag": "p",
        "children": [
          "Base kit prices from Chinese factories can be very low, but your real cost includes duty, assembly, battery, homologation, warranty and marketing. Build a full per-unit cost sheet before deciding your retail price."
        ]
      },
      {
        "tag": "p",
        "children": [
          "Comment \"EV\" on our Instagram, or contact us, for current catalogues and pricing."
        ]
      }
    ]
  },
  {
    "slug": "canton-fair-guide-for-indian-businesses",
    "title": "Canton Fair Guide for Indian Businesses: Dates, Visa and What to Expect",
    "cat": "China trips",
    "date": "2026-10-20",
    "mins": 7,
    "cv": "cv4",
    "icon": "plane",
    "excerpt": "The world's largest trade fair happens twice a year in Guangzhou. Here's how to plan your visit and get the most out of it.",
    "body": [
      {
        "tag": "p",
        "children": [
          "The ",
          {
            "tag": "strong",
            "children": [
              "China Import and Export Fair"
            ]
          },
          ", better known as the Canton Fair, is held in Guangzhou every spring and autumn. Thousands of manufacturers show their products under one roof, which makes it the most efficient way to meet factories in person."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "When is it held?"
        ],
        "id": "s1"
      },
      {
        "tag": "p",
        "children": [
          "The fair runs twice a year: ",
          {
            "tag": "strong",
            "children": [
              "spring (around April–May)"
            ]
          },
          " and ",
          {
            "tag": "strong",
            "children": [
              "autumn (around October–November)"
            ]
          },
          ". Each session is split into three phases, each covering different industries:"
        ]
      },
      {
        "tag": "table",
        "children": [
          {
            "tag": "thead",
            "children": [
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "th",
                    "children": [
                      "Phase"
                    ]
                  },
                  {
                    "tag": "th",
                    "children": [
                      "Main categories (approx.)"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "tag": "tbody",
            "children": [
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "Phase 1"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "Electronics, machinery, lighting, vehicles & spare parts, hardware"
                    ]
                  }
                ]
              },
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "Phase 2"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "Home goods, gifts, kitchenware, decorations, building materials, furniture"
                    ]
                  }
                ]
              },
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "Phase 3"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "Textiles, garments, shoes, office supplies, food, health products"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "tag": "p",
        "children": [
          "Plan your dates around the phase that matches your product. Phase categories change slightly each year, so check the official schedule."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Visa and registration"
        ],
        "id": "s2"
      },
      {
        "tag": "p",
        "children": [
          "Indian citizens need a Chinese business visa. An invitation letter from the fair or an exhibitor helps with the application. You'll also register online for a buyer badge before you travel."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "How to make the most of it"
        ],
        "id": "s3"
      },
      {
        "tag": "ol",
        "children": [
          {
            "tag": "li",
            "children": [
              "Shortlist your categories and halls before you arrive."
            ]
          },
          {
            "tag": "li",
            "children": [
              "Carry business cards and a clear list of the products you want."
            ]
          },
          {
            "tag": "li",
            "children": [
              "Photograph every booth's card next to its products."
            ]
          },
          {
            "tag": "li",
            "children": [
              "Don't commit on the spot. Collect quotes, then compare."
            ]
          },
          {
            "tag": "li",
            "children": [
              "Keep 2–3 days after the fair to visit the factories you shortlisted."
            ]
          }
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Travel with ImportNow"
        ],
        "id": "s4"
      },
      {
        "tag": "p",
        "children": [
          "Our guided trips include visa guidance, hotels near the fair, Indian veg and non-veg food every day, guides and translators, factory visits of your choice, and sightseeing such as Macau and the glass bridge. Many clients tell us it felt more like a personal trip than a business tour."
        ]
      }
    ]
  },
  {
    "slug": "how-to-verify-a-chinese-supplier",
    "title": "How to Verify a Chinese Supplier Before You Pay",
    "cat": "Import guides",
    "date": "2026-10-09",
    "mins": 5,
    "cv": "cv5",
    "icon": "shield",
    "excerpt": "A practical checklist to separate real factories from traders and scammers, before your money leaves your account.",
    "body": [
      {
        "tag": "p",
        "children": [
          "Finding a supplier in China is easy. Finding the ",
          {
            "tag": "em",
            "children": [
              "right"
            ]
          },
          " one is not. Before you send an advance payment, run through this checklist."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "1. Check the business licence"
        ],
        "id": "s1"
      },
      {
        "tag": "p",
        "children": [
          "Every legitimate Chinese company has a business licence with a unified social credit code. Ask for a copy, and check that the company name matches the bank account you're paying."
        ]
      },
      {
        "tag": "div",
        "children": [
          "Red flag: the supplier asks you to pay a personal account, or a company with a different name."
        ],
        "className": "callout warn"
      },
      {
        "tag": "h2",
        "children": [
          "2. Factory or trading company?"
        ],
        "id": "s2"
      },
      {
        "tag": "p",
        "children": [
          "Traders aren't bad. They can be useful for mixed orders. But you should know who you're dealing with. Look at the licence's business scope, and ask for a live video walk-through of the production floor."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "3. Ask for export history"
        ],
        "id": "s3"
      },
      {
        "tag": "p",
        "children": [
          "Have they shipped to India before? Ask for references or past bills of lading. Suppliers who know Indian requirements (BIS, labelling, documentation) save you a lot of trouble."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "4. Order a sample"
        ],
        "id": "s4"
      },
      {
        "tag": "p",
        "children": [
          "Pay for a sample and judge it carefully. The bulk order should match the approved sample, so keep it as your reference."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "5. Use safe payment terms"
        ],
        "id": "s5"
      },
      {
        "tag": "p",
        "children": [
          "A common structure is 30% advance and 70% after inspection. Avoid paying 100% upfront to a new supplier."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "6. Visit or inspect"
        ],
        "id": "s6"
      },
      {
        "tag": "p",
        "children": [
          "Nothing beats seeing the factory yourself, or having someone you trust on the ground. Because ImportNow has its own registered company and team in China, we can visit, inspect and pay suppliers locally on your behalf."
        ]
      }
    ]
  },
  {
    "slug": "fcl-vs-lcl-shipping",
    "title": "FCL vs LCL: Which Shipping Option Is Right for Your Order?",
    "cat": "Shipping",
    "date": "2026-09-30",
    "mins": 5,
    "cv": "cv1",
    "icon": "container",
    "excerpt": "Container sizes, capacities and how to decide between a full container and shared space, explained with simple rules of thumb.",
    "body": [
      {
        "tag": "p",
        "children": [
          "When your goods are ready, you'll choose between booking a ",
          {
            "tag": "strong",
            "children": [
              "full container (FCL)"
            ]
          },
          " or sharing one with other importers' cargo (",
          {
            "tag": "strong",
            "children": [
              "LCL"
            ]
          },
          "). The right choice can save you a lot of money."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Standard container sizes"
        ],
        "id": "s1"
      },
      {
        "tag": "table",
        "children": [
          {
            "tag": "thead",
            "children": [
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "th",
                    "children": [
                      "Container"
                    ]
                  },
                  {
                    "tag": "th",
                    "children": [
                      "Approx. volume"
                    ]
                  },
                  {
                    "tag": "th",
                    "children": [
                      "Practical load"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "tag": "tbody",
            "children": [
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "20 ft"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "~33 CBM"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "~25–28 CBM"
                    ]
                  }
                ]
              },
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "40 ft"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "~67 CBM"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "~55–58 CBM"
                    ]
                  }
                ]
              },
              {
                "tag": "tr",
                "children": [
                  {
                    "tag": "td",
                    "children": [
                      "40 ft High Cube"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "~76 CBM"
                    ]
                  },
                  {
                    "tag": "td",
                    "children": [
                      "~65–68 CBM"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "tag": "h2",
        "children": [
          "When LCL makes sense"
        ],
        "id": "s2"
      },
      {
        "tag": "ul",
        "children": [
          {
            "tag": "li",
            "children": [
              "Your shipment is small, roughly under 13–15 CBM"
            ]
          },
          {
            "tag": "li",
            "children": [
              "You're testing a new product"
            ]
          },
          {
            "tag": "li",
            "children": [
              "You're ordering samples or a few furniture pieces"
            ]
          }
        ]
      },
      {
        "tag": "p",
        "children": [
          "LCL is charged per CBM, but there are extra handling and deconsolidation charges at both ends, and it can take a few days longer."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "When FCL makes sense"
        ],
        "id": "s3"
      },
      {
        "tag": "ul",
        "children": [
          {
            "tag": "li",
            "children": [
              "Your cargo is above ~15 CBM, when a 20 ft container often costs about the same as LCL"
            ]
          },
          {
            "tag": "li",
            "children": [
              "You want faster, safer handling with fewer touches"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Your goods are fragile or high-value"
            ]
          }
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Weight matters too"
        ],
        "id": "s4"
      },
      {
        "tag": "p",
        "children": [
          "Heavy goods such as machinery, tiles or metal parts may hit the container's weight limit before its volume limit. Always share gross weights with your forwarder."
        ]
      },
      {
        "tag": "div",
        "children": [
          "Tip: consolidate. Buying from several suppliers? We can collect everything at our warehouse in China and ship it together in one container."
        ],
        "className": "callout"
      }
    ]
  },
  {
    "slug": "landed-cost-customs-duty-india",
    "title": "Understanding Landed Cost: Customs Duty, IGST and Hidden Charges",
    "cat": "Customs",
    "date": "2026-09-18",
    "mins": 6,
    "cv": "cv2",
    "icon": "doc",
    "excerpt": "The factory price is only the beginning. Learn how to calculate what an imported product really costs you in India.",
    "body": [
      {
        "tag": "p",
        "children": [
          "Many first-time importers compare the Chinese factory price with the local market price, and get a surprise later. What matters is your ",
          {
            "tag": "strong",
            "children": [
              "landed cost"
            ]
          },
          ": the total cost of the product sitting in your warehouse."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "The building blocks"
        ],
        "id": "s1"
      },
      {
        "tag": "ol",
        "children": [
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Product cost"
                ]
              },
              ": the supplier's price (usually FOB or EXW)"
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Freight & insurance"
                ]
              },
              ": sea or air, to the Indian port"
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Assessable value"
                ]
              },
              ": roughly the CIF value, which customs uses to calculate duty"
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Basic Customs Duty (BCD)"
                ]
              },
              ": a percentage that depends on the HS code"
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Social Welfare Surcharge"
                ]
              },
              ": 10% of the BCD"
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "IGST"
                ]
              },
              ": charged on assessable value + BCD + SWS, at your product's GST rate"
            ]
          },
          {
            "tag": "li",
            "children": [
              {
                "tag": "strong",
                "children": [
                  "Port, CHA and transport charges"
                ]
              },
              ": terminal handling, documentation, customs broker fees, trucking"
            ]
          }
        ]
      },
      {
        "tag": "div",
        "children": [
          "Good news: if you're GST-registered, the IGST you pay at import can usually be claimed as input tax credit, so it isn't a final cost for your business."
        ],
        "className": "callout"
      },
      {
        "tag": "h2",
        "children": [
          "Duty rates depend on the HS code"
        ],
        "id": "s2"
      },
      {
        "tag": "p",
        "children": [
          "Two similar-looking products can have very different duty rates. Some items also carry anti-dumping duty when imported from China. That's why classifying your product correctly ",
          {
            "tag": "strong",
            "children": [
              "before"
            ]
          },
          " ordering is so important."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Charges people forget"
        ],
        "id": "s3"
      },
      {
        "tag": "ul",
        "children": [
          {
            "tag": "li",
            "children": [
              "Destination terminal handling and container detention if clearance is delayed"
            ]
          },
          {
            "tag": "li",
            "children": [
              "BIS or other certification costs"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Testing, labelling and compliance (MRP, importer details)"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Currency conversion and bank charges"
            ]
          }
        ]
      },
      {
        "tag": "p",
        "children": [
          "Before every order, ImportNow gives you a full landed-cost estimate, so you know your margin before you commit."
        ]
      }
    ]
  },
  {
    "slug": "private-label-car-led-business",
    "title": "Private Label Car LED Lights: A Low-MOQ Business Idea",
    "cat": "Business ideas",
    "date": "2026-09-05",
    "mins": 4,
    "cv": "cv5",
    "icon": "bulb",
    "excerpt": "Car LED headlights have steady demand in India. With custom branding from around 500 pieces, it's an accessible way to launch your own brand.",
    "body": [
      {
        "tag": "p",
        "children": [
          "If you're planning a business in automobile accessories, car LED lighting is worth a close look. Demand isn't going anywhere. Every car owner eventually upgrades or replaces their headlights."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "What you can source"
        ],
        "id": "s1"
      },
      {
        "tag": "ul",
        "children": [
          {
            "tag": "li",
            "children": [
              "Bulb types from H1 to H7 and more"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Power from about 35 W up to 250 W"
            ]
          },
          {
            "tag": "li",
            "children": [
              "Fog lamps, projector lenses and interior lighting"
            ]
          }
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Your own brand, low MOQ"
        ],
        "id": "s2"
      },
      {
        "tag": "p",
        "children": [
          "Manufacturers in Guangzhou offer ",
          {
            "tag": "strong",
            "children": [
              "OEM/private labelling"
            ]
          },
          ": your logo on the product and box, with mixed-model orders starting from around ",
          {
            "tag": "strong",
            "children": [
              "500 pieces"
            ]
          },
          ". That's a manageable first order for a new brand."
        ]
      },
      {
        "tag": "h2",
        "children": [
          "Warranty and quality"
        ],
        "id": "s3"
      },
      {
        "tag": "p",
        "children": [
          "Good factories offer replacement warranties of 12–18 months. Test samples for brightness, beam pattern, heat management (fan or heat sink) and CANbus compatibility before ordering in bulk."
        ]
      },
      {
        "tag": "div",
        "children": [
          "Check whether your lighting product needs BIS registration before import, and make sure the products are legal for road use."
        ],
        "className": "callout warn"
      },
      {
        "tag": "h2",
        "children": [
          "Selling"
        ],
        "id": "s4"
      },
      {
        "tag": "p",
        "children": [
          "Car LED brands do well through car accessory shops, service centres and online marketplaces. Strong packaging and a clear warranty help you stand out."
        ]
      },
      {
        "tag": "p",
        "children": [
          "Comment \"LED\" on our Instagram, or contact us, for supplier catalogues."
        ]
      }
    ]
  }
];
