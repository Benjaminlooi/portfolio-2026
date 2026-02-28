import Image from "next/image";

type Props = React.SVGProps<SVGSVGElement>;

const Logo: React.FC<Props> = () => {
  return (
    <Image
      src="/images/ben_bighead.png"
      alt="Benjamin Looi"
      height={50}
      width={50}
      sizes="50px"
      priority
    />
  );
};

export default Logo;
