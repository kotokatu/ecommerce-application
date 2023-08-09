export default function setActiveLink({ isActive }: { isActive: boolean }) {
  return isActive ? `header__link active-link` : 'header__link';
}
