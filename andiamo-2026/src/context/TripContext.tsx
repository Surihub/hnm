import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { TripData, DailyPlan, WishlistItem, TipItem, Spot, Accommodation } from '../types';
import { seedData } from '../data/seedData';
import { v4 as uuidv4 } from 'uuid';

// ── Actions ──
type Action =
  | { type: 'LOAD_DATA'; payload: TripData }
  | { type: 'ADD_SPOT'; payload: { planId: string; spot: Omit<Spot, 'id' | 'completed'> } }
  | { type: 'UPDATE_SPOT'; payload: { planId: string; spotId: string; spot: Partial<Spot> } }
  | { type: 'DELETE_SPOT'; payload: { planId: string; spotId: string } }
  | { type: 'TOGGLE_SPOT'; payload: { planId: string; spotId: string } }
  | { type: 'REORDER_SPOTS'; payload: { planId: string; spots: Spot[] } }
  | { type: 'UPDATE_ACCOMMODATION'; payload: { planId: string; accommodation: Accommodation } }
  | { type: 'UPDATE_PLAN_NOTES'; payload: { planId: string; notes: string } }
  | { type: 'ADD_WISHLIST'; payload: Omit<WishlistItem, 'id' | 'confirmed'> }
  | { type: 'UPDATE_WISHLIST'; payload: { id: string; item: Partial<WishlistItem> } }
  | { type: 'DELETE_WISHLIST'; payload: string }
  | { type: 'CONFIRM_WISHLIST'; payload: string }
  | { type: 'TOGGLE_TIP'; payload: string }
  | { type: 'UPDATE_TRAVELERS'; payload: string[] };

// ── Reducer ──
function tripReducer(state: TripData, action: Action): TripData {
  switch (action.type) {
    case 'LOAD_DATA':
      return action.payload;

    case 'ADD_SPOT': {
      const { planId, spot } = action.payload;
      return {
        ...state,
        dailyPlans: state.dailyPlans.map((plan) =>
          plan.id === planId
            ? { ...plan, spots: [...plan.spots, { ...spot, id: uuidv4(), completed: false }] }
            : plan
        ),
      };
    }

    case 'UPDATE_SPOT': {
      const { planId, spotId, spot } = action.payload;
      return {
        ...state,
        dailyPlans: state.dailyPlans.map((plan) =>
          plan.id === planId
            ? {
                ...plan,
                spots: plan.spots.map((s) => (s.id === spotId ? { ...s, ...spot } : s)),
              }
            : plan
        ),
      };
    }

    case 'DELETE_SPOT': {
      const { planId, spotId } = action.payload;
      return {
        ...state,
        dailyPlans: state.dailyPlans.map((plan) =>
          plan.id === planId
            ? { ...plan, spots: plan.spots.filter((s) => s.id !== spotId) }
            : plan
        ),
      };
    }

    case 'TOGGLE_SPOT': {
      const { planId, spotId } = action.payload;
      return {
        ...state,
        dailyPlans: state.dailyPlans.map((plan) =>
          plan.id === planId
            ? {
                ...plan,
                spots: plan.spots.map((s) =>
                  s.id === spotId ? { ...s, completed: !s.completed } : s
                ),
              }
            : plan
        ),
      };
    }

    case 'REORDER_SPOTS': {
      const { planId, spots } = action.payload;
      return {
        ...state,
        dailyPlans: state.dailyPlans.map((plan) =>
          plan.id === planId ? { ...plan, spots } : plan
        ),
      };
    }

    case 'UPDATE_ACCOMMODATION': {
      const { planId, accommodation } = action.payload;
      return {
        ...state,
        dailyPlans: state.dailyPlans.map((plan) =>
          plan.id === planId ? { ...plan, accommodation } : plan
        ),
      };
    }

    case 'UPDATE_PLAN_NOTES': {
      const { planId, notes } = action.payload;
      return {
        ...state,
        dailyPlans: state.dailyPlans.map((plan) =>
          plan.id === planId ? { ...plan, notes } : plan
        ),
      };
    }

    case 'ADD_WISHLIST':
      return {
        ...state,
        wishlist: [
          ...state.wishlist,
          { ...action.payload, id: uuidv4(), confirmed: false },
        ],
      };

    case 'UPDATE_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.item } : item
        ),
      };

    case 'DELETE_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };

    case 'CONFIRM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.map((item) =>
          item.id === action.payload ? { ...item, confirmed: !item.confirmed } : item
        ),
      };

    case 'TOGGLE_TIP':
      return {
        ...state,
        tips: state.tips.map((tip) =>
          tip.id === action.payload ? { ...tip, checked: !tip.checked } : tip
        ),
      };

    case 'UPDATE_TRAVELERS':
      return {
        ...state,
        tripInfo: { ...state.tripInfo, travelers: action.payload },
      };

    default:
      return state;
  }
}

// ── Context ──
interface TripContextType {
  state: TripData;
  dispatch: React.Dispatch<Action>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const STORAGE_KEY = 'andiamo2026_trip_data';

export function TripProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tripReducer, seedData, (initial) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initial;
      }
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <TripContext.Provider value={{ state, dispatch }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
