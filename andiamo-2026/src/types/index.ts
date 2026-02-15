// ============================================
// Italy Honeymoon - Data Types
// ============================================

export interface ItineraryDay {
  id: string;
  city: string;
  date: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  note: string;
}

export interface CityGroup {
  name: string;
  eng: string;
  color: string;
  days: string[];
}

export interface ListItem {
  id: string;
  name: string;
  city: string;
  link: string;
  createdAt: number;
}

export interface Photo {
  id: string;
  url: string;
  createdAt: number;
}

export interface TripState {
  itinerary: Record<string, ItineraryDay>;
  restaurants: ListItem[];
  shopping: ListItem[];
  photos: Photo[];
}

export type TripAction =
  | { type: 'SET_ITINERARY'; payload: Record<string, ItineraryDay> }
  | { type: 'UPDATE_ITINERARY_DAY'; payload: { dayId: string; data: Partial<ItineraryDay> } }
  | { type: 'ADD_RESTAURANT'; payload: ListItem }
  | { type: 'DELETE_RESTAURANT'; payload: string }
  | { type: 'ADD_SHOPPING'; payload: ListItem }
  | { type: 'DELETE_SHOPPING'; payload: string }
  | { type: 'ADD_PHOTO'; payload: Photo }
  | { type: 'DELETE_PHOTO'; payload: string };
