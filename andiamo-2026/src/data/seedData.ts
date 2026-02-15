import { ItineraryDay, CityGroup, TripState } from '../types';

export const cityGroups: CityGroup[] = [
  { name: '로마', eng: 'Rome', color: 'blue', days: ['day1', 'day8', 'day9', 'day10', 'day11', 'day12', 'day13'] },
  { name: '베로나', eng: 'Verona/Venice', color: 'emerald', days: ['day2', 'day3', 'day4'] },
  { name: '피렌체', eng: 'Florence', color: 'orange', days: ['day5', 'day6', 'day7'] },
];

export const defaultItinerary: ItineraryDay[] = [
  {
    id: 'day1',
    city: '로마',
    date: '3/1 (일)',
    title: '인천 → 로마 도착',
    morning: '14:05 출국 (OZ561)',
    afternoon: '기내 휴식',
    evening: '19:35 도착 후 호텔 체크인',
    note: '📍 로마 테르미니역 인근 숙소',
  },
  {
    id: 'day2',
    city: '베로나',
    date: '3/2 (월)',
    title: '로마 → 베로나 이동',
    morning: '테르미니역 이동',
    afternoon: '베로나 열차(3h)',
    evening: '줄리엣의 집 & 야경',
    note: '',
  },
  {
    id: 'day3',
    city: '베로나',
    date: '3/3 (화)',
    title: '베네치아 당일치기',
    morning: '본섬 이동(1h)',
    afternoon: '리알토 & 산마르코',
    evening: '베로나 복귀',
    note: '베네치아 입장세 QR코드 사전 발급 필요!',
  },
  {
    id: 'day4',
    city: '베로나',
    date: '3/4 (수)',
    title: '시르미오네 힐링',
    morning: '가르다 호수 이동',
    afternoon: '온천 스파 & 성곽',
    evening: '호숫가 저녁식사',
    note: '',
  },
  {
    id: 'day5',
    city: '피렌체',
    date: '3/5 (목)',
    title: '베로나 → 피렌체',
    morning: '피렌체 이동(1.5h)',
    afternoon: '스냅 촬영 투어',
    evening: '티본 스테이크 디너',
    note: '',
  },
  {
    id: 'day6',
    city: '피렌체',
    date: '3/6 (금)',
    title: '쇼핑 & 미술관',
    morning: '더 몰 아울렛',
    afternoon: '우피치 미술관',
    evening: '가죽 시장 구경',
    note: '',
  },
  {
    id: 'day7',
    city: '피렌체',
    date: '3/7 (토)',
    title: '피렌체 하이라이트',
    morning: '두오모 쿠폴라',
    afternoon: '미켈란젤로 언덕',
    evening: '베키오 다리 산책',
    note: '',
  },
  {
    id: 'day8',
    city: '로마',
    date: '3/8 (일)',
    title: '피렌체 → 로마 복귀',
    morning: '로마 이동(1.5h)',
    afternoon: '트레비 분수',
    evening: '스페인 광장',
    note: '',
  },
  {
    id: 'day9',
    city: '로마',
    date: '3/9 (월)',
    title: '바티칸 집중 투어',
    morning: '바티칸 박물관',
    afternoon: '성 베드로 성당',
    evening: '트라스테베레',
    note: '',
  },
  {
    id: 'day10',
    city: '로마',
    date: '3/10 (화)',
    title: '남부 전일 투어',
    morning: '폼페이 이동',
    afternoon: '포지타노 해변',
    evening: '로마 복귀',
    note: '',
  },
  {
    id: 'day11',
    city: '로마',
    date: '3/11 (수)',
    title: '고대 로마 탐구',
    morning: '콜로세움 내부',
    afternoon: '포로 로마노',
    evening: '나보나 광장',
    note: '',
  },
  {
    id: 'day12',
    city: '로마',
    date: '3/12 (목)',
    title: '로마 피날레',
    morning: '판테온 & 카페',
    afternoon: '콘도티 거리 쇼핑',
    evening: '최후의 만찬',
    note: '',
  },
  {
    id: 'day13',
    city: '로마',
    date: '3/13 (금)',
    title: '귀국',
    morning: '짐 정리',
    afternoon: '공항 이동',
    evening: '22:00 출국 (OZ562)',
    note: '택스 리펀 서류 미리 준비! 공항 3시간 전 도착 권장',
  },
];

export function buildInitialItinerary(): Record<string, ItineraryDay> {
  const map: Record<string, ItineraryDay> = {};
  defaultItinerary.forEach((day) => {
    map[day.id] = day;
  });
  return map;
}

export const initialState: TripState = {
  itinerary: buildInitialItinerary(),
  restaurants: [],
  shopping: [],
  photos: [],
};
