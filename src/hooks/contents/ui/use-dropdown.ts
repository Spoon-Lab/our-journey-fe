import { useState } from 'react';

/**
 * useDropdown 훅은 드롭다운의 열림/닫힘 상태를 관리하고 이를 토글할 수 있는 기능을 제공합니다.
 *
 * @returns {object} - 드롭다운의 상태와 이를 제어하는 함수들을 포함한 객체를 반환합니다.
 * @returns {boolean} isOpen - 드롭다운이 열려있는지 여부를 나타내는 상태값.
 * @returns {() => void} toggleDropdown - 드롭다운의 열림/닫힘을 토글하는 함수.
 * @returns {() => void} closeDropdown - 드롭다운을 강제로 닫는 함수.
 *
 */

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggleDropdown,
    closeDropdown,
  };
};
