import { TripData } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const seedData: TripData = {
  tripInfo: {
    title: '이탈리아 신혼여행 🇮🇹',
    travelers: ['UserA', 'UserB'],
    startDate: '2026-03-01',
    endDate: '2026-03-13',
  },

  // ── const: 고정 항공편 (수정 불가) ──
  fixedTransport: [
    {
      id: 'flight-in',
      type: 'flight',
      direction: 'IN',
      flightNo: 'OZ561',
      depTime: '2026-03-01 14:05',
      arrTime: '2026-03-01 19:35',
      depAirport: 'ICN (T2)',
      arrAirport: 'FCO (T3)',
      seat: '26D',
    },
    {
      id: 'flight-out',
      type: 'flight',
      direction: 'OUT',
      flightNo: 'OZ562',
      depTime: '2026-03-13 22:00',
      arrTime: '2026-03-14 17:35',
      depAirport: 'FCO (T3)',
      arrAirport: 'ICN (T2)',
      seat: '31A',
    },
  ],

  // ── let: 유동 일정 (CRUD 가능) ──
  dailyPlans: [
    {
      id: uuidv4(),
      date: '2026-03-01',
      city: 'Rome',
      accommodation: {
        name: '테르미니역 인근 호텔 (미정)',
        link: '',
        status: 'pending',
        price: 0,
      },
      spots: [
        { id: uuidv4(), name: 'FCO 공항 도착', category: 'transport', completed: false },
        { id: uuidv4(), name: '테르미니역 이동 & 체크인', category: 'activity', completed: false },
        { id: uuidv4(), name: '근처 식당에서 저녁 식사', category: 'restaurant', completed: false },
      ],
      notes: '숙소: 테르미니역 도보 5분 이내 추천',
    },
    {
      id: uuidv4(),
      date: '2026-03-02',
      city: 'Verona',
      transport: '기차 이동 (Roma Termini → Verona Porta Nuova)',
      accommodation: {
        name: '베로나 포르타 누오바 역 근처 (미정)',
        link: '',
        status: 'pending',
        price: 0,
      },
      spots: [
        { id: uuidv4(), name: '줄리엣의 집 (Casa di Giulietta)', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '아레나 원형극장 (Arena di Verona)', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '카스텔 산 피에트로 일몰', category: 'photo', completed: false },
      ],
    },
    {
      id: uuidv4(),
      date: '2026-03-03',
      city: 'Verona',
      spots: [
        { id: uuidv4(), name: '베네치아 당일치기 - 산 마르코 광장', category: 'sightseeing', completed: false, note: '기차 왕복 편도 1시간 15분' },
        { id: uuidv4(), name: '리알토 다리', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '곤돌라 탑승', category: 'activity', completed: false },
        { id: uuidv4(), name: '부라노 섬 (시간 여유 시)', category: 'sightseeing', completed: false },
      ],
      notes: '베네치아 입장세 QR코드 사전 발급 필요!',
    },
    {
      id: uuidv4(),
      date: '2026-03-04',
      city: 'Verona',
      spots: [
        { id: uuidv4(), name: '시르미오네 당일치기 - 가르다 호수', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '스칼리제로 성', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '카툴로 동굴 (Grotte di Catullo)', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '온천 스파', category: 'activity', completed: false },
      ],
      notes: '버스/기차 이동',
    },
    {
      id: uuidv4(),
      date: '2026-03-05',
      city: 'Florence',
      transport: '기차 이동 (Verona → Firenze SMN)',
      accommodation: {
        name: '산타 마리아 노벨라 역 근처 (미정)',
        link: '',
        status: 'pending',
        price: 0,
      },
      spots: [
        { id: uuidv4(), name: '스냅 사진 촬영', category: 'photo', completed: false, note: '피렌체 스냅 업체 사전 예약' },
        { id: uuidv4(), name: '베키오 다리 (Ponte Vecchio)', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '피렌체 중앙시장 (Mercato Centrale)', category: 'restaurant', completed: false },
      ],
    },
    {
      id: uuidv4(),
      date: '2026-03-06',
      city: 'Florence',
      spots: [
        { id: uuidv4(), name: '더 몰 아울렛 (The Mall Firenze)', category: 'shopping', completed: false, note: '구찌, 프라다, 보테가 베네타 등' },
        { id: uuidv4(), name: '우피치 미술관 (Galleria degli Uffizi)', category: 'sightseeing', completed: false, note: '사전 예약 필수!' },
      ],
      notes: '오전: 아울렛 쇼핑, 오후: 우피치',
    },
    {
      id: uuidv4(),
      date: '2026-03-07',
      city: 'Florence',
      spots: [
        { id: uuidv4(), name: '두오모 쿠폴라 (Cupola del Brunelleschi)', category: 'sightseeing', completed: false, note: '463계단 — 예약 필수' },
        { id: uuidv4(), name: '산타마리아 노벨라 약국 (고현정 크림)', category: 'shopping', completed: false },
        { id: uuidv4(), name: '미켈란젤로 언덕 (Piazzale Michelangelo) 야경', category: 'photo', completed: false },
        { id: uuidv4(), name: '티본스테이크 (Bistecca alla Fiorentina)', category: 'restaurant', completed: false, note: '추천: Trattoria Mario' },
      ],
      notes: '시내 도보 여행일',
    },
    {
      id: uuidv4(),
      date: '2026-03-08',
      city: 'Rome',
      transport: '기차 이동 (Firenze SMN → Roma Termini)',
      accommodation: {
        name: '로마 시내 숙소 (미정) — 이후 연박',
        link: '',
        status: 'pending',
        price: 0,
      },
      spots: [
        { id: uuidv4(), name: '스페인 광장 (Piazza di Spagna)', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '트레비 분수 (Fontana di Trevi)', category: 'sightseeing', completed: false, note: '2026년 관광세 부과 검토 중' },
        { id: uuidv4(), name: '나보나 광장 (Piazza Navona)', category: 'sightseeing', completed: false },
      ],
    },
    {
      id: uuidv4(),
      date: '2026-03-09',
      city: 'Rome',
      spots: [
        { id: uuidv4(), name: '바티칸 박물관 (Musei Vaticani)', category: 'sightseeing', completed: false, note: '가이드 투어 예약 권장' },
        { id: uuidv4(), name: '시스티나 예배당', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '성 베드로 대성당 (Basilica di San Pietro)', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '산탄젤로 성 (Castel Sant\'Angelo)', category: 'sightseeing', completed: false },
      ],
      notes: '바티칸 투어 — 가이드 투어 사전 예약',
    },
    {
      id: uuidv4(),
      date: '2026-03-10',
      city: 'Rome',
      spots: [
        { id: uuidv4(), name: '남부 투어: 폼페이 유적지', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '포지타노 (Positano) 해안 마을', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '아말피 코스트 절경', category: 'photo', completed: false },
      ],
      notes: '전일 버스 투어 (조기 출발)',
    },
    {
      id: uuidv4(),
      date: '2026-03-11',
      city: 'Rome',
      spots: [
        { id: uuidv4(), name: '콜로세움 (Colosseo)', category: 'sightseeing', completed: false, note: '통합권 사전 예약 필수' },
        { id: uuidv4(), name: '포로 로마노 (Foro Romano)', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '팔라티노 언덕', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '진실의 입 (Bocca della Verità)', category: 'sightseeing', completed: false },
      ],
      notes: '고대 로마 투어일 — 통합권으로 효율적 관람',
    },
    {
      id: uuidv4(),
      date: '2026-03-12',
      city: 'Rome',
      spots: [
        { id: uuidv4(), name: '판테온 (Pantheon)', category: 'sightseeing', completed: false },
        { id: uuidv4(), name: '코르소 거리 쇼핑 (Via del Corso)', category: 'shopping', completed: false },
        { id: uuidv4(), name: '로마 3대 젤라또 맛집', category: 'restaurant', completed: false, note: 'Giolitti, Fassi, Come il Latte' },
        { id: uuidv4(), name: '로마 3대 커피 (Sant\'Eustachio il Caffè)', category: 'restaurant', completed: false },
      ],
      notes: '여유로운 마지막 관광일 — 선물 쇼핑',
    },
    {
      id: uuidv4(),
      date: '2026-03-13',
      city: 'Rome → ICN',
      spots: [
        { id: uuidv4(), name: '체크아웃 & 짐 보관', category: 'activity', completed: false },
        { id: uuidv4(), name: '근처 카페에서 마지막 에스프레소', category: 'restaurant', completed: false },
        { id: uuidv4(), name: '18:00 공항 이동 (FCO)', category: 'transport', completed: false },
        { id: uuidv4(), name: '택스 리펀 서류 처리', category: 'activity', completed: false, note: '공항 내 세관 도장 → 리펀 카운터' },
        { id: uuidv4(), name: '22:00 출국 (OZ562)', category: 'transport', completed: false },
      ],
      notes: '택스 리펀 서류 미리 준비! 공항 3시간 전 도착 권장',
    },
  ],

  // ── 위시리스트 (공유 링크 저장소) ──
  wishlist: [
    { id: uuidv4(), url: '', category: 'hotel', note: '로마 테르미니역 도보 5분 이내 호텔 후보', addedBy: 'UserA', confirmed: false },
    { id: uuidv4(), url: '', category: 'hotel', note: '베로나 포르타 누오바 역 근처 숙소', addedBy: 'UserB', confirmed: false },
    { id: uuidv4(), url: '', category: 'hotel', note: '피렌체 산타 마리아 노벨라 역 근처', addedBy: 'UserA', confirmed: false },
    { id: uuidv4(), url: '', category: 'hotel', note: '로마 시내 연박 숙소 (3/8~3/13)', addedBy: 'UserB', confirmed: false },
    { id: uuidv4(), url: '', category: 'restaurant', note: '피렌체 티본스테이크 맛집 Trattoria Mario', addedBy: 'UserA', confirmed: false },
    { id: uuidv4(), url: '', category: 'tour', note: '바티칸 가이드 투어 업체 비교', addedBy: 'UserB', confirmed: false },
    { id: uuidv4(), url: '', category: 'tour', note: '남부 투어 (폼페이 + 포지타노) 버스 투어', addedBy: 'UserA', confirmed: false },
    { id: uuidv4(), url: '', category: 'shopping', note: '더 몰 피렌체 아울렛 브랜드 리스트', addedBy: 'UserB', confirmed: false },
  ],

  // ── 팁 & 체크리스트 ──
  tips: [
    // 예약 필수 항목
    { id: uuidv4(), category: 'reservation', title: '기차표 예매', content: '트렌이탈리아(Trenitalia) 또는 이딸로(Italo) — 3개월 전 오픈 시 할인가 예매. Roma↔Verona, Verona↔Firenze, Firenze↔Roma 총 3구간.', checked: false },
    { id: uuidv4(), category: 'reservation', title: '우피치 미술관 예약', content: '공식 홈페이지에서 사전 예약 필수 (3/6). 성수기에는 빠르게 매진됩니다.', checked: false },
    { id: uuidv4(), category: 'reservation', title: '콜로세움 통합권 예약', content: '콜로세움 + 포로 로마노 + 팔라티노 언덕 통합권 (3/11). 공식 사이트 예매.', checked: false },
    { id: uuidv4(), category: 'reservation', title: '바티칸 박물관 예약', content: '공식 홈페이지 사전 예매 (3/9). 가이드 투어 포함 옵션 추천.', checked: false },
    { id: uuidv4(), category: 'reservation', title: '두오모 쿠폴라 예약', content: '피렌체 두오모 쿠폴라 입장 사전 예약 (3/7). 463계단 올라감.', checked: false },
    { id: uuidv4(), category: 'reservation', title: '피렌체 스냅 촬영 예약', content: '피렌체 스냅 사진 업체 선정 및 예약 (3/5 추천).', checked: false },

    // 안전 및 주의사항
    { id: uuidv4(), category: 'safety', title: '소매치기 주의', content: '지하철 입구, 타고 내릴 때, 붐비는 버스 안 주의. 가방은 반드시 앞으로! 크로스백 추천.', checked: false },
    { id: uuidv4(), category: 'safety', title: '테이블 사기 주의', content: '식당/카페 테이블 위에 핸드폰 올려두지 말 것. 서명 요청이나 팔찌 채우는 사람은 무시 ("No Grazie").', checked: false },
    { id: uuidv4(), category: 'safety', title: '도시세 현금 준비', content: '호텔 체크아웃 시 1박당 도시세(City Tax) 현금 필요. 2026년 인상 가능성 있음. 도시별 €3~7 정도.', checked: false },

    // 쇼핑 리스트
    { id: uuidv4(), category: 'shopping', title: '피렌체 쇼핑', content: '산타마리아 노벨라 약국 (고현정 크림, 향수), 가죽 제품(산 로렌조 시장), 더 몰 아울렛.', checked: false },
    { id: uuidv4(), category: 'shopping', title: '슈퍼마켓 쇼핑리스트', content: '포켓커피, 마비스 치약, 리몬첼로(레몬술), 트러플 오일, 발사믹 식초, 파스타, 건조 포르치니.', checked: false },
    { id: uuidv4(), category: 'shopping', title: '와인 추천', content: '키안티 클라시코(Chianti Classico) — 검은 수탉(Gallo Nero) 마크 확인. 브루넬로 디 몬탈치노도 추천.', checked: false },

    // 2026년 변동사항
    { id: uuidv4(), category: 'update', title: '트레비 분수 관광세', content: '2026년 로마 트레비 분수 관광세 부과 검토 중. 출발 전 최신 정보 확인 필요.', checked: false },
    { id: uuidv4(), category: 'update', title: '베네치아 입장세', content: '베네치아 당일치기 입장료(도시 입장세) 부과. 날짜별 확인 및 QR코드 사전 발급 필요 (3/3).', checked: false },
    { id: uuidv4(), category: 'update', title: '택스 리펀 확인', content: '이탈리아 택스 리펀 최소 금액 및 절차 확인. 공항 출발 3시간 전 도착하여 세관 도장 처리.', checked: false },
  ],
};
