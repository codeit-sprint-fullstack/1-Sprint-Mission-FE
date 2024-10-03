import Image from "next/image";
import Link from "next/link";

export default function Logo({ isLoginHeader = false }) {
  return (
    <Link href="/">
      {!isLoginHeader && (
        <picture>
          <source media="(max-width: 768px)" srcSet="/assets/logo_mobile.svg" />
          <Image
            src="/assets/logo.svg"
            alt="panda market logo"
            width={153}
            height={51}
            sizes="(max-width: 768px) 81px, 153px"
            priority
          />
        </picture>
      )}
      {isLoginHeader && (
        <Image
          src="/assets/logo.svg"
          width={396}
          height={132}
          alt="panda market logo"
          priority
        />
      )}
    </Link>
  );
}
