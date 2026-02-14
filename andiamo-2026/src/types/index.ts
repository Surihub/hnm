// ============================================
// Andiamo 2026 - Data Types
// ============================================

export interface TripInfo {
  title: string;
  travelers: string[];
  startDate: string;
  endDate: string;
}

export interface FixedTransport {
  id: string;
  type: 'flight' | 'train';
  direction: 'IN' | 'OUT';
  flightNo: string;
  depTime: string;
  arrTime: string;
  depAirport: string;
  arrAirport: string;
  seat?: string;
}

export interface Accommodation {
  name: string;
  link: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  price: number;
  checkIn?: string;
  checkOut?: string;
}

export interface Spot {
  id: string;
  name: string;
  category: 'sightseeing' | 'restaurant' | 'shopping' | 'photo' | 'activity' | 'transport';
  note?: string;
  link?: string;
  time?: string;
  completed: boolean;
}

export interface DailyPlan {
  id: string;
  date: string;
  city: string;
  transport?: string;
  accommodation?: Accommodation;
  spots: Spot[];
  notes?: string;
}

export interface WishlistItem {
  id: string;
  url: string;
  category: 'hotel' | 'restaurant' | 'tour' | 'shopping' | 'transport' | 'other';
  note: string;
  addedBy: string;
  confirmed: boolean;
  targetDate?: string;
}

export interface TipItem {
  id: string;
  category: 'reservation' | 'safety' | 'shopping' | 'update';
  title: string;
  content: string;
  checked: boolean;
}

export interface TripData {
  tripInfo: TripInfo;
  fixedTransport: FixedTransport[];
  dailyPlans: DailyPlan[];
  wishlist: WishlistItem[];
  tips: TipItem[];
}

export type TabType = 'flights' | 'plans' | 'wishlist' | 'tips';
