import{Subcategory,Category}from'./Iproduct'; 
 export interface WishlistResponse {
  status: string
  count: number
  data: product[]
}

export interface product {
  sold: null | number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: any[];
}




export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
