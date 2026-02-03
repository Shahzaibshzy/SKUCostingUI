/**
 * Reference mock data: SKU list, bundle types, categories, sample bundle, and available components.
 * Used as source for mock service; mapped to app types in the service layer.
 */

export interface SKUItem {
  id: number
  skuCode: string
  asin: string
  active: boolean
  fulfilledBy: string
  condition: string
  title: string
  qty: number
  newQty: number
  status: string
  mainImage: string
  totalCost: number
  shippingFee: number
  sellingPrice: number
  newPrice: number
}

export interface BundleComponent {
  id: number
  qty: number
  category: string
  component: string
  cost: number
  extCost: number
}

export interface Bundle {
  sku: string
  bundleType: string
  productName: string
  productImage: string
  components: BundleComponent[]
  componentCost: number
  shippingFee: number
  sellingPrice: number
  amazonFee: number
}

export const skuItems: SKUItem[] = [
  { id: 1, skuCode: "30-VVJT-YV3Y", asin: "B00I8ICB2", active: false, fulfilledBy: "Seller", condition: "new-new", title: "Sony Alpha a6000 Mirrorless Digital Camera...", qty: 0, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop", totalCost: 580.84, shippingFee: 0.00, sellingPrice: 498.00, newPrice: 0.00 },
  { id: 2, skuCode: "3I-H43D-7JG3", asin: "B07GVQTGKR", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Canon EOS M50 Mirrorless Digital Camera...", qty: 95, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop", totalCost: 539.92, shippingFee: 0.00, sellingPrice: 599.00, newPrice: 0.00 },
  { id: 3, skuCode: "47-ZEUO-N031", asin: "B01K374P6E", active: false, fulfilledBy: "Seller", condition: "new-new", title: "Fuji 16500076 XP90- Compact and portable...", qty: 0, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=100&h=100&fit=crop", totalCost: 0.00, shippingFee: 0.00, sellingPrice: 136.00, newPrice: 0.00 },
  { id: 4, skuCode: "5Y-W4AN-A85F", asin: "B07NC29V2Z", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Canon Accessories Canon Extension Grip E...", qty: 10, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=100&h=100&fit=crop", totalCost: 0.00, shippingFee: 0.00, sellingPrice: 79.00, newPrice: 0.00 },
  { id: 5, skuCode: "6P-580G-ANKU", asin: "B011LSPEDC", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Canon KP-108IN Ink Paper Set (2) Pack - 2...", qty: 3, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=100&h=100&fit=crop", totalCost: 0.00, shippingFee: 0.00, sellingPrice: 59.30, newPrice: 0.00 },
  { id: 6, skuCode: "7K-P92M-XN47", asin: "B08CGK5K4M", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Nikon Z5 Full Frame Mirrorless Camera...", qty: 25, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1606986628123-3e3c7c089de6?w=100&h=100&fit=crop", totalCost: 1299.00, shippingFee: 0.00, sellingPrice: 1399.00, newPrice: 0.00 },
  { id: 7, skuCode: "8M-QR5T-BC12", asin: "B09KLGPF3Y", active: false, fulfilledBy: "Seller", condition: "new-new", title: "GoPro HERO10 Black Action Camera Bundle...", qty: 0, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=100&h=100&fit=crop", totalCost: 399.99, shippingFee: 0.00, sellingPrice: 449.00, newPrice: 0.00 },
  { id: 8, skuCode: "9N-WS8V-DE34", asin: "B07WCHJ2YG", active: true, fulfilledBy: "Seller", condition: "new-new", title: "DJI Osmo Pocket 2 Creator Combo...", qty: 15, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=100&h=100&fit=crop", totalCost: 449.00, shippingFee: 0.00, sellingPrice: 499.00, newPrice: 0.00 },
  { id: 9, skuCode: "2A-XY6U-FG56", asin: "B08LNLH1PZ", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Panasonic Lumix G100 4K Mirrorless Camera...", qty: 8, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=100&h=100&fit=crop", totalCost: 697.99, shippingFee: 0.00, sellingPrice: 747.99, newPrice: 0.00 },
  { id: 10, skuCode: "3B-ZA7W-HI78", asin: "B084DN28KF", active: false, fulfilledBy: "Seller", condition: "new-new", title: "Olympus OM-D E-M10 Mark IV Mirrorless...", qty: 0, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=100&h=100&fit=crop", totalCost: 799.00, shippingFee: 0.00, sellingPrice: 899.00, newPrice: 0.00 },
  { id: 11, skuCode: "4C-BC8X-JK90", asin: "B07X47VPRD", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Sigma 16mm f/1.4 DC DN Contemporary Lens...", qty: 42, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=100&h=100&fit=crop", totalCost: 329.00, shippingFee: 0.00, sellingPrice: 399.00, newPrice: 0.00 },
  { id: 12, skuCode: "5D-CD9Y-LM12", asin: "B08HLWMP81", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Tamron 28-75mm f/2.8 Di III VXD G2 Lens...", qty: 18, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&h=100&fit=crop", totalCost: 879.00, shippingFee: 0.00, sellingPrice: 949.00, newPrice: 0.00 },
  { id: 13, skuCode: "6E-DE0Z-NP34", asin: "B09PQ9XH3Q", active: false, fulfilledBy: "Seller", condition: "new-new", title: "Peak Design Everyday Backpack 30L V2...", qty: 0, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop", totalCost: 279.95, shippingFee: 0.00, sellingPrice: 299.95, newPrice: 0.00 },
  { id: 14, skuCode: "7F-EF1A-QR56", asin: "B07VJFZ8PH", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Rode VideoMic Pro+ On-Camera Shotgun...", qty: 31, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=100&h=100&fit=crop", totalCost: 249.00, shippingFee: 0.00, sellingPrice: 299.00, newPrice: 0.00 },
  { id: 15, skuCode: "8G-FG2B-ST78", asin: "B08KSK9G6Y", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Manfrotto Befree Advanced Travel Tripod...", qty: 22, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1542567455-cd733f23fbb1?w=100&h=100&fit=crop", totalCost: 189.88, shippingFee: 0.00, sellingPrice: 219.88, newPrice: 0.00 },
  { id: 16, skuCode: "9H-GH3C-UV90", asin: "B07T7PNWHD", active: false, fulfilledBy: "Seller", condition: "new-new", title: "SanDisk Extreme PRO 256GB SD Card V30...", qty: 0, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1531525727125-d5eb56e23e58?w=100&h=100&fit=crop", totalCost: 39.99, shippingFee: 0.00, sellingPrice: 49.99, newPrice: 0.00 },
  { id: 17, skuCode: "0I-HI4D-WX12", asin: "B09YQRXQ4S", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Godox SL-60W LED Video Light with Softbox...", qty: 14, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=100&h=100&fit=crop", totalCost: 149.00, shippingFee: 0.00, sellingPrice: 179.00, newPrice: 0.00 },
  { id: 18, skuCode: "1J-IJ5E-YZ34", asin: "B0829VGMXL", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Zhiyun Crane M3 3-Axis Gimbal Stabilizer...", qty: 7, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&h=100&fit=crop", totalCost: 299.00, shippingFee: 0.00, sellingPrice: 349.00, newPrice: 0.00 },
  { id: 19, skuCode: "2K-JK6F-AB56", asin: "B07VKQCP2L", active: false, fulfilledBy: "Seller", condition: "new-new", title: "Atomos Ninja V 5-inch HDR Recording Monitor...", qty: 0, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100&h=100&fit=crop", totalCost: 599.00, shippingFee: 0.00, sellingPrice: 699.00, newPrice: 0.00 },
  { id: 20, skuCode: "3L-KL7G-CD78", asin: "B08F9NWN9V", active: true, fulfilledBy: "Seller", condition: "new-new", title: "Lowepro ProTactic BP 450 AW II Camera Bag...", qty: 19, newQty: 0, status: "", mainImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=100&h=100&fit=crop", totalCost: 229.95, shippingFee: 0.00, sellingPrice: 279.95, newPrice: 0.00 },
]

export const bundleTypesList = [
  "Rokinon Lens",
  "Canon Camera",
  "Sony Bundle",
  "Nikon Kit",
  "Fujifilm Set",
  "GoPro Pack",
]

export const categoriesList = [
  "1. Camera Body",
  "2. Lens/Rokinon",
  "3. Memory Card",
  "4. Battery",
  "5. Charger",
  "6. Camera Bag",
  "7. Lens Filter",
  "8. Cleaning Kit",
  "9. Tripod/Monopod",
  "Filters",
  "Accessories",
]

export const sampleBundle: Bundle = {
  sku: "PZ_16M-FX-082619",
  bundleType: "Rokinon Lens",
  productName: "Rokinon 16mm F2.0 Aspherical Wide Angle Lens for Fuji X w/Lens Hood + Protective Lens Case, Spider Flex Tripod & Other Accessory Bundle",
  productImage: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=400&h=300&fit=crop",
  components: [
    { id: 1, qty: 1, category: "9. Tripod/Monopod", component: "Spider Tripod", cost: 2.00, extCost: 2.00 },
    { id: 2, qty: 1, category: "Filters", component: "77 FLK", cost: 6.00, extCost: 6.00 },
    { id: 3, qty: 1, category: "Accessories", component: "Cap Keeper", cost: 0.50, extCost: 0.50 },
    { id: 4, qty: 1, category: "2. Lens/Rokinon", component: "ROKINON 16mm F2.0 Ultra Wide Angle Lens (Lens Hood and Pouch incl...)", cost: 285.00, extCost: 285.00 },
  ],
  componentCost: 293.50,
  shippingFee: 0.00,
  sellingPrice: 389.30,
  amazonFee: 38.12,
}

export const availableComponents = [
  { name: "Spider Tripod", category: "9. Tripod/Monopod", cost: 2.00 },
  { name: "77 FLK", category: "Filters", cost: 6.00 },
  { name: "Cap Keeper", category: "Accessories", cost: 0.50 },
  { name: "Lens Hood", category: "Accessories", cost: 3.50 },
  { name: "Lens Pouch", category: "Accessories", cost: 5.00 },
  { name: "UV Filter 77mm", category: "Filters", cost: 12.00 },
  { name: "ND Filter Set", category: "Filters", cost: 24.00 },
  { name: "Cleaning Kit", category: "8. Cleaning Kit", cost: 8.00 },
  { name: "Memory Card 64GB", category: "3. Memory Card", cost: 15.00 },
  { name: "Extra Battery", category: "4. Battery", cost: 25.00 },
  { name: "ROKINON 16mm F2.0 Ultra Wide Angle Lens (Lens Hood and Pouch incl...)", category: "2. Lens/Rokinon", cost: 285.00 },
  { name: "Canon EF 50mm f/1.8 STM Lens", category: "2. Lens/Rokinon", cost: 125.00 },
  { name: "Sony FE 85mm f/1.8 Lens", category: "2. Lens/Rokinon", cost: 598.00 },
]
