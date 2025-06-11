'use client';

import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import FileModal from './components/FileModal';

interface BusinessEntry {
  date: string;
  program: string;
  type: string;
  time: number;
}

interface ExternalEntry {
  date: string;
  program: string;
  time: number;
}

const Home: NextPage = () => {
  // 파일 모달
  const [isFileModalOpen, setFileModalOpen] = useState(false);
  // 단일 회차 선택 (0~4)
  const [selectedCycle, setSelectedCycle] = useState<number>(3);
  // // 해당 회차 내에서 선택된 사업일정 항목 인덱스 배열
  const [selectedBusiness, setSelectedBusiness] = useState<Record<number, number>>({});;
  // 해당 회차 내에서 선택된 외부연계 항목 인덱스 배열
  const [selectedExternal, setSelectedExternal] = useState<Record<number, number>>({});
  // 자율활동 시간 상태 (0~3)
  const [selfActivityTime, setSelfActivityTime] = useState<number | "">("");


  // 회차 변경 시, 다중 선택 항목 초기화
  const handleCycleChange = (index: number) => {
    setSelectedCycle(index);
    setSelectedBusiness({});
    setSelectedExternal({});
  };

  // 각 회차별 더미 데이터 (여러 항목)
  const businessSchedules: BusinessEntry[][] = [
    // 첫 번째 회차는 예시 데이터를 포함
    [ // 1회차
      { date: '02.17(월)', program: '오리엔테이션', type: '밀착상담', time: 3 },
      { date: '회차 내', program: '1:1 티타임1', type: '밀착상담', time: 2 },
      { date: '02.17(월)', program: '나만의 유화 그리기', type: '자신감회복', time: 3 },
      { date: '02.24(월)', program: '주도적인 꿈 찾기', type: '진로탐색', time: 2 },
      { date: '02.24(월)', program: '기업 분석법1', type: '진로탐색', time: 2 },
      { date: '03.04(화)', program: '진로 목표 설계1', type: '진로탐색', time: 2 },
      { date: '03.04(화)', program: '네온사인 만들기', type: '자신감회복', time: 2 },
      { date: '03.10(월)', program: '스트레스와 감정관리', type: '사례관리', time: 2 },
      { date: '03.10(월)', program: '스트레칭 교육', type: '사례관리', time: 2 },
      { date: '03.17(월)', program: '이력서&자소서 작성1', type: '취업역량강화', time: 2 },
    ],
    [ // 2회차
      { date: '03.24(월)', program: '중간 상담1', type: '밀착상담', time: 3 },
      { date: '03.24(월)', program: '테라리움 만들기', type: '자신감회복', time: 2 },
      { date: '03.31(월)', program: '청년 정책 안내', type: '사례관리', time: 2 },
      { date: '03.31(월)', program: 'DISC 검사', type: '사례관리', time: 3 },
      { date: '04.01(화)', program: '가치관 경매', type: '진로탐색', time: 2 },
      { date: '04.01(화)', program: '챗 GPT 활용법', type: '취업역량강화', time: 2 },
      { date: '04.07(월)', program: '시간 관리법', type: '사례관리', time: 2 },
      { date: '04.14(월)', program: '진로 목표 설계2', type: '진로탐색', time: 2 },
      { date: '04.14(월)', program: '이력서&자소서 작성2', type: '취업역량강화', time: 2 },
    ],
    [ // 3회차
      { date: '회차 내', program: '1:1 티타임2', type: '밀착상담', time: 2 },
      { date: '04.28(월)', program: '심커리어', type: '진로탐색', time: 3 },
      { date: '04.28(월)', program: '라탄 공예', type: '자신감회복', time: 3 },
      { date: '05.12(월)', program: '소통을 통한 관계개선', type: '자신감회복', time: 3 },
      { date: '05.12(월)', program: '구해줘 멘토1', type: '밀착상담', time: 2 },
      { date: '05.19(월)', program: '취업 멘토링1', type: '취업역량강화', time: 2 },
      { date: '05.19(월)', program: '채용트렌드', type: '취업역량강화', time: 2 },
      { date: '05.20(화)', program: '응급의료교육', type: '사례관리', time: 4 },
      { date: '05.26(월)', program: '비즈니스 매너', type: '취업역량강화', time: 2 },
      { date: '05.26(월)', program: '기업 분석법2', type: '진로탐색', time: 2 },
    ],
    [ // 4회차
      { date: '회차 내', program: '1:1 티타임3', type: '밀착상담', time: 2 },
      { date: '06.02(월)', program: '유리 전사지', type: '자신감회복', time: 2 },
      { date: '06.02(월)', program: '자소서 첨삭 및 피드백', type: '취업역량강화', time: 3 },
      { date: '06.05(목)', program: '중간 상담2', type: '밀착상담', time: 3 },
      { date: '06.09(월)', program: '면접이미지코칭', type: '취업역량강화', time: 2 },
      { date: '06.09(월)', program: '홀랜드 검사', type: '진로탐색', time: 3 },
      { date: '06.16(월)', program: '미리 알아보는 근로기준법', type: '사례관리', time: 2 },
      { date: '06.16(월)', program: '통장 쪼개기', type: '사례관리', time: 2 },
      { date: '06.23(월)', program: '협업 프로젝트', type: '취업역량강화', time: 4 },
      { date: '06.30(월)', program: '미니어쳐 만들기', type: '자신감회복', time: 3 },
      { date: '06.30(월)', program: '진로 목표 설계3', type: '진로탐색', time: 2 },
    ],
    [ // 5회차
      { date: '회차 내', program: '1:1 티타임4', type: '밀착상담', time: 2 },
      { date: '07.07(월)', program: '개인 포트폴리오 작성', type: '취업역량강화', time: 2 },
      { date: '07.07(월)', program: '기업 만들기', type: '진로탐색', time: 2 },
      { date: '07.14(월)', program: '현직자 강의', type: '취업역량강화', time: 2 },
      { date: '07.14(월)', program: '취업 멘토링2', type: '취업역량강화', time: 3 },
      { date: '07.21(월)', program: '배드민턴<토너먼트>', type: '자신감회복', time: 4 },
      { date: '07.28(월)', program: '후기상담', type: '밀착상담', time: 3 },
      { date: '08.04(월)', program: '면접 가이드', type: '취업역량강화', time: 2 },
      { date: '08.04(월)', program: '모의 면접', type: '취업역량강화', time: 3 },
      { date: '08.05(화)', program: '구해줘 멘토', type: '사례관리', time: 2 },
    ],
  ];

  const externalSchedules: ExternalEntry[][] = [
    [ // 1회차
      { date: '02.20(목)', program: '근대역사관', time: 3 },
      { date: '02.26(수)', program: '글라스 공예', time: 2 },
      { date: '03.13(목)', program: '간송 미술관', time: 3 },
      { date: '03.17(월)', program: '특강', time: 2 },
      { date: '03.18(화)', program: '레고협동 프로젝트', time: 5 },
    ],
    [ // 2회차
       { date: '03.25(화)', program: '팀 빌딩', time: 2 },
       { date: '04.02(수)', program: 'NCS 특강(기초)', time: 3 },
       { date: '04.08(화) 오전', program: '스토리라인 설정과 스피치 전략', time: 3 },
       { date: '04.08(화) 오후', program: '기업탐방', time: 3 },
       { date: '04.21(월) 오전', program: 'SNS 마케팅 전략', time: 3 },
       { date: '04.21(월) 오후', program: '이색직업 강의&체험', time: 3 },
       { date: '04.25(금)', program: 'Skill-Up 역량강화(ITQ-한글)', time: 6 },
    ],
    [ // 3회차
       { date: '05.08(목) 오후', program: '카네이션 키링 만들기', time: 3 },
       { date: '05.13(화) 오전', program: '비건 샌드위치 만들기', time: 2 },
       { date: '05.13(화) 오후', program: '그림심리검사', time: 3 },
       { date: '05.15(목) 오후', program: 'NCS 모의고사', time: 2 },
       { date: '05.27(화) 오후', program: '이색직업 및 체험', time: 2 },
    ],
    [ // 4회차
       { date: '06.04(수) 오전', program: '브런치 콘서트', time: 2 },
       { date: '06.13(금) 오전', program: 'Chat GPT 심화과정', time: 4 },
       { date: '06.17(화) 오후', program: '청년미래포럼', time: 3 },
    ],
    [ // 5회차
      // { date: '2023-08-04', program: '외부 프로그램 E1', time: 2 },
      // { date: '2023-08-04', program: '외부 프로그램 E2', time: 1 },
    ],
  ];


  // 사업일정 항목 토글 함수
  const toggleBusiness = (index: number) => {
    setSelectedBusiness((prev) => {
      const entry = businessSchedules[selectedCycle][index];
      const newState = { ...prev };
      if (newState[index] !== undefined) {
        delete newState[index];
      } else {
        newState[index] = entry.time;
      }
      return newState;
    });
  };

  const toggleExternal = (index: number) => {
    setSelectedExternal((prev) => {
      const entry = externalSchedules[selectedCycle][index];
      const newState = { ...prev };
      if (newState[index] !== undefined) {
        delete newState[index];
      } else {
        newState[index] = entry.time;
      }
      return newState;
    });
  };

  const adjustBusinessTime = (index: number, delta: number) => {
    setSelectedBusiness((prev) => {
      const current = prev[index] ?? 0;
      const newValue = Math.max(0, current + delta);
      const newState = { ...prev };
      if (newValue === 0) {
        delete newState[index];
      } else {
        newState[index] = newValue;
      }
      return newState;
    });
  };

  const adjustExternalTime = (index: number, delta: number) => {
    setSelectedExternal((prev) => {
      const current = prev[index] ?? 0;
      const newValue = Math.max(0, current + delta);
      const newState = { ...prev };
      if (newValue === 0) {
        delete newState[index];
      } else {
        newState[index] = newValue;
      }
      return newState;
    });
  };
  

  const handleSelfActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setSelfActivityTime("");
      return;
    }
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      setSelfActivityTime("");
    } else if (numValue >= 4) {
      setSelfActivityTime(3);
    } else {
      setSelfActivityTime(numValue);
    }
  };

  const effectiveSelfActivityTime = selfActivityTime === "" ? 0 : selfActivityTime;

  const businessTime = Object.values(selectedBusiness).reduce((acc, cur) => acc + cur, 0);
  const externalTime = Object.values(selectedExternal).reduce((acc, cur) => acc + cur, 0);
  const totalCompleted = businessTime + externalTime + effectiveSelfActivityTime;
  const REQUIRED_HOURS = 32;
  const neededTime = totalCompleted >= REQUIRED_HOURS ? 0 : REQUIRED_HOURS - totalCompleted;

  
  // 본문
  return (
    <div className="bg-[#080808] min-h-screen text-white font-sans">
      <Head>
        <title>청년도전 지원사업 - 장기</title>
        <meta name="description" content="청년도전 지원사업" />
      </Head>

      {/* 상단 타이틀/아이콘 (모바일 우선) */}
      <header className="pt-6 pb-3 text-center">
        {/* 간단한 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-2 h-10 w-10 text-indigo-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2l8 4v8l-8 4-8-4V6l8-4z"
          />
        </svg>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide">
          청년도전 지원사업 - 장기
        </h1>
        <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-300">
          2025.02.17 ~ 2025.08.05
        </p>
        <button
              onClick={() => setFileModalOpen(true)}
              className="mt-4 bg-customBox1 hover:bg-customHover border border-customBoxBorder transition-all px-3 py-2 rounded-md text-white text-sm sm:text-base md:text-lg"
            >
              파일목록
            </button>
      </header>
      
          
      {/* 메인 컨테이너 (모바일 우선) */}
      <div className="max-w-2xl mx-auto px-3 py-4 sm:px-4">
        <div className="bg-[#313131] rounded-md shadow-md p-3 sm:p-5">

          {/* 주요 정보 (모바일에서는 단일 컬럼) */}
          <section className="flex flex-col items-center gap-4 text-center mb-6 border-b border-gray-700 pb-3">
            <div className="flex items-center justify-center">
              <h3 className="text-base sm:text-base md:text-lg font-bold text-gray-400">
                5가지 모듈 이수
              </h3>
              <span className="mx-2">-</span>
              <p className="text-base sm:text-lg md:text-xl text-white font-bold">
                회차 당 각 1개 이상
              </p>
            </div>
            <div className="flex items-center justify-center">
              <h3 className="text-base sm:text-base md:text-lg font-bold text-gray-400">이수 시간</h3>
              <span className="mx-2">-</span>
              <p className="text-base sm:text-lg md:text-xl text-white font-bold">회차 당 32시간 이상</p>
            </div>
            <div className="flex items-center justify-center">
              <h3 className="text-base sm:text-base md:text-lg font-bold text-gray-400">중복참여 제한</h3>
              <span className="mx-2">-</span>
              <p className="text-base sm:text-lg md:text-xl text-white font-bold whitespace-normal md:whitespace-nowrap">
                수당지급 사업 참여 전 확인필요
              </p>
            </div>
          </section>

          {/* 회차 선택 */}
          <section className="mb-5 text-center">
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2">회차 선택</h3>
            <div className="flex justify-center flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCycleChange(index)}
                  className={`px-3 py-2 text-xs sm:text-sm md:text-base rounded-md transition-all ${
                    selectedCycle === index
                      ? 'bg-green-800'
                      : 'bg-gray-700 hover:bg-gray-500'
                  }`}
                >
                  {index + 1}회차
                </button>
              ))}
            </div>
          </section>
          {/* 사업일정 & 외부연계 (기본 1컬럼, md 이상 2컬럼) */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 items-start">
            {/* 사업일정 */}
            <section className="bg-black rounded-lg shadow p-3">
              <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-center">사업일정</h3>
              <div className="divide-y divide-gray-600">
                {businessSchedules[selectedCycle].map((entry, i) => {
                    const selected = selectedBusiness[i] !== undefined;
                    return (
                      <div
                        key={i}
                        onClick={() => toggleBusiness(i)}
                        className={`cursor-pointer py-2 px-2 transition-colors text-center mb-2 rounded text-xs sm:text-sm md:text-base ${selected ? 'bg-green-900' : 'bg-gray-700'} md:hover:bg-gray-500`}
                      >
                        <p>{entry.date}</p>
                        <p className="mt-1 font-bold text-[#04B6D4]">{entry.program}</p>
                        <p className="mt-1 text-gray-400">{entry.type}</p>
                        <div className="mt-1 flex justify-center items-center space-x-2">
                          <button onClick={(e) => { e.stopPropagation(); adjustBusinessTime(i, -1); }} className="px-2 bg-gray-600 rounded">-</button>
                          <span className="font-bold text-[#A855F8]">{selectedBusiness[i] ?? 0}h</span>
                          <button onClick={(e) => { e.stopPropagation(); adjustBusinessTime(i, 1); }} className="px-2 bg-gray-600 rounded">+</button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>

            {/* 외부연계 섹션 + 자율활동 영역 */}
            <section className="bg-black rounded-lg shadow p-3">
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-center">외부연계</h3>
              <div className="divide-y divide-gray-600">
              {externalSchedules[selectedCycle].map((entry, i) => {
                  const selected = selectedExternal[i] !== undefined;
                  return (
                    <div
                      key={i}
                      onClick={() => toggleExternal(i)}
                      className={`cursor-pointer py-2 px-2 transition-colors text-center mb-2 rounded text-xs sm:text-sm md:text-base ${selected ? 'bg-green-900' : 'bg-gray-700'} md:hover:bg-gray-500`}
                    >
                      <p>{entry.date}</p>
                      <p className="mt-1 font-bold text-[#04B6D4]">{entry.program}</p>
                      <div className="mt-1 flex justify-center items-center space-x-2">
                        <button onClick={(e) => { e.stopPropagation(); adjustExternalTime(i, -1); }} className="px-2 bg-gray-600 rounded">-</button>
                        <span className="font-bold text-[#A855F8]">{selectedExternal[i] ?? 0}h</span>
                        <button onClick={(e) => { e.stopPropagation(); adjustExternalTime(i, 1); }} className="px-2 bg-gray-600 rounded">+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* 자율활동 영역 하단 배치 */}
              <div className="mt-4 pt-4 border-t border-gray-600 divide-y divide-gray-600">
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-center">
                    자율활동
                  </h3>
                  <div className="flex flex-nowrap justify-center items-center space-x-2 sm:space-x-3 ">
                    <label className="font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap" htmlFor="selfActivity">
                      시간:
                    </label>
                    <input
                      id="selfActivity"
                      type="number"
                      min="0"
                      max="3"
                      placeholder="0"
                      value={selfActivityTime}
                      onChange={handleSelfActivityChange}
                      className="w-16 sm:w-20 p-2 rounded bg-gray-700 text-white outline-none text-center text-xs sm:text-sm md:text-base appearance-none hide-placeholder"
                    />
                    <span className="text-xs sm:text-sm md:text-base text-gray-400 ">(0~3h)</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 text-center">
                  <p className="text-lg sm:text-xl md:text-2xl text-white">
                    <span className="font-bold">이수시간</span> - {totalCompleted}h
                  </p>
                  <p className={`mt-3 text-lg sm:text-xl md:text-2xl font-bold ${neededTime >= 1 ? 'text-red-600' : 'text-white'} text-center`}>
                    필요시간 - {neededTime}h
                  </p>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>

      {/* 파일 목록 모달 */}
      <FileModal isOpen={isFileModalOpen} onClose={() => setFileModalOpen(false)} />
        
    </div>
  );
};

export default Home;