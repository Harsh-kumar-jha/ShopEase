import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  return (
    <div className="sticky top-0 w-full z-30 bg-slate-200 shadow-sm">
      <div className="px-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              ShopEase
            </Link>
            <div className="hidden md:block">Search Bar</div>
            <div className="flex items-center gap-8 md:gap-12">
              <div className="">Cart Count</div>
              <div className="">User Menu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
