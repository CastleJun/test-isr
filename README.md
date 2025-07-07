# ISR Blog App

Next.js 14 App Router와 ISR(Incremental Static Regeneration)을 활용한 블로그 애플리케이션입니다.

## 주요 특징

- **Next.js 14**: 최신 버전의 Next.js 사용
- **App Router**: 새로운 app 디렉터리 구조 사용
- **ISR (Incremental Static Regeneration)**: 60초마다 정적 페이지 재생성
- **Dynamic Routes**: Catch-all segments를 사용한 동적 라우팅
- **TypeScript**: 타입 안전성 보장
- **Tailwind CSS**: 모던하고 반응형 UI 디자인
- **JSONPlaceholder API**: 실제 외부 API 요청 구현

## 기능

### 1. 홈 페이지 (`/`)
- 최신 포스트 목록 표시 (ISR 적용)
- 네비게이션 링크 제공

### 2. 포스트 목록 (`/posts`)
- 모든 포스트를 카드 형태로 표시
- 60초마다 ISR로 재생성

### 3. 포스트 상세 (`/posts/[id]`)
- 개별 포스트 상세 정보
- 작성자 정보
- 댓글 목록

### 4. 사용자별 포스트 (`/posts/user/[id]`)
- 특정 사용자의 모든 포스트
- 사용자 정보 표시

### 5. 포스트 댓글 (`/posts/[id]/comments`)
- 특정 포스트의 모든 댓글
- 댓글 작성자 정보

## 설치 및 실행

### 1. 패키지 설치
```bash
pnpm install
```

### 2. 개발 서버 실행
```bash
pnpm dev
```

### 3. 프로덕션 빌드
```bash
pnpm build
pnpm start
```

## 프로젝트 구조

```
.
├── app/
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈 페이지
│   └── posts/
│       └── [...slug]/       # 동적 catch-all 라우트
│           └── page.tsx     # ISR 적용된 포스트 페이지
├── components/
│   ├── PostCard.tsx         # 포스트 카드 컴포넌트
│   └── PostList.tsx         # 포스트 목록 컴포넌트
├── lib/
│   └── api.ts               # API 함수들
├── types/
│   └── index.ts             # TypeScript 타입 정의
├── package.json
├── next.config.js
├── tsconfig.json
└── tailwind.config.js
```

## ISR 동작 확인

ISR이 정상적으로 동작하는지 확인하려면:

1. 프로덕션 빌드 후 실행: `pnpm build && pnpm start`
2. 페이지 접속 시 하단에 표시되는 "마지막 생성 시간" 확인
3. 60초 후 페이지 새로고침하여 시간이 업데이트되는지 확인

## 기술 스택

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com)
- **Deployment**: Vercel (권장)

## 주요 라우트 예시

- `/` - 홈 페이지
- `/posts` - 모든 포스트 목록
- `/posts/1` - 포스트 ID 1 상세 페이지
- `/posts/user/1` - 사용자 ID 1의 포스트 목록
- `/posts/1/comments` - 포스트 ID 1의 댓글 목록 # test-isr
