// 작업 목록. 새 작업은 배열 맨 앞에 추가하고, 이미지는 src/assets/work/ 에 kdj-<번호>-cover.webp 등으로 넣는다.
import type { ImageMetadata } from 'astro';

export type WorkType = 'MOV' | 'IDN' | 'WEB';
export interface Work {
  no: string;          // 파일 번호 (KDJ_014)
  type: WorkType;      // MOV=영상, IDN=아이덴티티·디자인, WEB=웹
  title: string;       // 짧은 영문 라벨
  year: number;
  client: string;
  role: string;
  featured?: boolean;  // 메인 히어로 대표작
}

export const TYPE_LABEL: Record<WorkType, string> = { MOV: 'Film', IDN: 'Identity', WEB: 'Web' };

export const works: Work[] = [
  { no: '014', type: 'MOV', title: 'Brand film', year: 2026, client: 'Client A', role: 'Direction, Edit', featured: true },
  { no: '013', type: 'IDN', title: 'Identity', year: 2026, client: 'Client B', role: 'Brand identity' },
  { no: '012', type: 'WEB', title: 'Website', year: 2026, client: 'Client C', role: 'Design, Development' },
  { no: '011', type: 'MOV', title: 'Music video', year: 2025, client: 'Artist D', role: 'Direction' },
  { no: '010', type: 'IDN', title: 'Poster series', year: 2025, client: 'Client E', role: 'Graphic design' },
  { no: '009', type: 'WEB', title: 'Lookbook site', year: 2025, client: 'Client F', role: 'Design, Development' },
  { no: '008', type: 'MOV', title: 'Campaign', year: 2025, client: 'Client G', role: 'Direction, Edit' },
  { no: '007', type: 'IDN', title: 'Packaging', year: 2025, client: 'Client H', role: 'Packaging design' },
  { no: '006', type: 'MOV', title: 'Teaser', year: 2024, client: 'Client I', role: 'Edit, Motion' },
  { no: '005', type: 'IDN', title: 'Logotype', year: 2024, client: 'Client J', role: 'Logotype' },
  { no: '004', type: 'WEB', title: 'Portfolio', year: 2024, client: 'Client K', role: 'Design, Development' },
  { no: '003', type: 'MOV', title: 'Short film', year: 2024, client: 'Self', role: 'Direction' },
];

export const fileName = (w: Work) => `KDJ_${w.no}.${w.type}`;
export const slug = (w: Work) => `kdj-${w.no}`;

// 이미지 연결: src/assets/work/kdj-<no>-{cover,01,02}.webp
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/work/*.webp', { eager: true });
const img = (name: string) => images[`../assets/work/${name}.webp`]?.default;
export const cover = (w: Work) => img(`kdj-${w.no}-cover`);
export const gallery = (w: Work) => ['01', '02'].map((s) => img(`kdj-${w.no}-${s}`)).filter(Boolean) as ImageMetadata[];
export const featureImage = () => img('feature');
