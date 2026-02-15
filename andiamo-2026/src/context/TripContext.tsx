import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { TripState, TripAction } from '../types';
import { initialState } from '../data/seedData';

function tripReducer(state: TripState, action: TripAction): TripState {
  switch (action.type) {
    case 'SET_ITINERARY':
      return { ...state, itinerary: action.payload };

    case 'UPDATE_ITINERARY_DAY': {
      const { dayId, data } = action.payload;
      return {
        ...state,
        itinerary: {
          ...state.itinerary,
          [dayId]: { ...state.itinerary[dayId], ...data },
        },
      };
    }

    case 'ADD_RESTAURANT':
      return { ...state, restaurants: [...state.restaurants, action.payload] };

    case 'DELETE_RESTAURANT':
      return { ...state, restaurants: state.restaurants.filter((r) => r.id !== action.payload) };

    case 'ADD_SHOPPING':
      return { ...state, shopping: [...state.shopping, action.payload] };

    case 'DELETE_SHOPPING':
      return { ...state, shopping: state.shopping.filter((s) => s.id !== action.payload) };

    case 'ADD_PHOTO':
      return { ...state, photos: [...state.photos, action.payload] };

    case 'DELETE_PHOTO':
      return { ...state, photos: state.photos.filter((p) => p.id !== action.payload) };

    default:
      return state;
  }
}

interface TripContextType {
  state: TripState;
  dispatch: React.Dispatch<TripAction>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const STORAGE_KEY = 'italy_honeymoon_v2';

export function TripProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tripReducer, initialState, (initial) => {
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
