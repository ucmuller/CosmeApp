export interface RootState {
  loggedIn: boolean;
  showHeader: boolean;
  products: [{
    categoryId: number;
    categoryName: string;
    id: number;
    imageUrl: string;
    manufacture: string;
    name: string;
    price: any;
    times: number;
    volume: string;
  }];
}