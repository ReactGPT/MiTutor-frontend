interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5">
      <span className="font-montserrat text-4xl font-bold text-primary">{title}</span>
    </div>
  );
};

export default Header;