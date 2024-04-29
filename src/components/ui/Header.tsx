interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center bg-[rgba(255,_255,_255,_0.50)] rounded-2xl border border-[rgba(116,170,255,0.70)] border-solid drop-shadow-md p-5">
      <span className="font-montserrat text-4xl font-bold text-primary">{title}</span>
    </div>
  );
};

export default Header;