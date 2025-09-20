import TimetableGrid from "./TimetableGrid";

// 수업 블럭 타입
export interface ClassBlock {
  title: string;
  location: string;
  day: number;       // 0: 월, 1: 화, ..., 4: 금
  startHour: number; // 예: 11 (오전 11시)
  endHour: number;   // 예: 13 (오후 1시)
}
function getTimeRangeFromBlocks(blocks: ClassBlock[]) {
  const start = Math.min(...blocks.map((b) => b.startHour));
  const end = Math.max(...blocks.map((b) => b.endHour));
  return { startHour: start, endHour: end };
}

// 예시 데이터
export const classBlocks: ClassBlock[] = [
  { title: "미시경제원론", location: "상헌110", day: 0, startHour: 11, endHour: 13 },
  { title: "한국문화유산의이해", location: "2404", day: 2, startHour: 11, endHour: 13 },
  { title: "동아시아전통과기술", location: "3103", day: 3, startHour: 13, endHour: 15 },
  { title: "현대사회문화", location: "사회303", day: 4, startHour: 11, endHour: 13 },
  { title: "영화의이해", location: "#111", day: 0, startHour: 9, endHour: 11 },
];
export default function PersonalTimeTable() {
  const { startHour, endHour } = getTimeRangeFromBlocks(classBlocks);
  const hoursCount = endHour - startHour ;

  return (
    <div className="w-full aspect-[5/6] relative">
      

      <div className="relative w-full h-full">
        <TimetableGrid startHour={startHour} endHour={endHour} />

        {classBlocks.map((block, idx) => {
          const topPercent = ((block.startHour - startHour + 1) / (hoursCount+1)) * 100;
          const heightPercent = ((block.endHour - block.startHour) / (hoursCount+1)) * 100;
          const leftPercent = ((block.day + 1) / 6) * 100;

          return (
            <div
              key={idx}
              className="absolute bg-gray-400 text-white text-[9px] px-[2px] py-[1px] rounded-[2px] leading-tight break-keep"
              style={{
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
                height: `${heightPercent}%`,
                width: `${100 / 6}%`,
              }}
            >
              <div className="font-semibold text-[8px] overflow-hidden text-ellipsis">{block.title}</div>
              <div>{block.location}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
