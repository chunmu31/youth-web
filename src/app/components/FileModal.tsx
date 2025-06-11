import React from 'react';

interface FileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FileModal: React.FC<FileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // 파일 목록 예시 (파일은 public 폴더에 저장되어 있어야 함)
  const files = [
    { name: '자율활동 일지', href: '/[장기]청년도전지원사업 자율활동 일지_성명.hwp' },
    { name: '이력서&자기소개서', href: '/[동구청년센터] 이력서 및 자기소개서_성명.hwp' },
    { name: '외부연계 참여확인서', href: '/청년도전지원사업 외부연계활동 참여 확인서.docx' },
    // 필요한 파일 목록을 추가하세요.
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="w-11/12 max-w-md bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">파일 목록</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="space-y-3">
          {files.map((file) => (
            <li key={file.href}>
              <a
                href={file.href}
                download
                className="block rounded-lg bg-gray-700 px-4 py-2 text-white text-center hover:bg-gray-600 transition-colors"
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-700 hover:bg-red-500 transition-colors py-2 rounded-lg text-white"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default FileModal;