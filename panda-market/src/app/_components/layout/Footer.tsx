"use client";

import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "public/icons/media-icons";

export default function Footer() {
  return (
    <footer className="h-40 bg-secondary-900">
      {/* 데스크톱 버전 (1920px) */}
      <div className="mx-auto hidden h-full max-w-[1920px] items-center justify-between px-16 xl:flex">
        <span className="text-secondary-400">©codeit - 2024</span>

        <div className="flex max-w-[160px] gap-4">
          <Link
            href="/privacy"
            className="hover:text-secondary-300 text-secondary-400"
          >
            Privacy Policy
          </Link>
          <Link
            href="/faq"
            className="hover:text-secondary-300 text-secondary-400"
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://facebook.com" className="text-white">
            <FacebookIcon />
          </Link>
          <Link href="https://twitter.com" className="text-white">
            <TwitterIcon />
          </Link>
          <Link href="https://youtube.com" className="text-white">
            <YoutubeIcon />
          </Link>
          <Link href="https://instagram.com" className="text-white">
            <InstagramIcon />
          </Link>
        </div>
      </div>

      {/* 태블릿 버전 (744px) */}
      <div className="mx-auto hidden h-full max-w-[744px] items-center justify-between px-6 sm:flex xl:hidden">
        <span className="text-secondary-400">©codeit - 2024</span>

        <div className="flex max-w-[160px] gap-4">
          <Link
            href="/privacy"
            className="hover:text-secondary-300 text-secondary-400"
          >
            Privacy Policy
          </Link>
          <Link
            href="/faq"
            className="hover:text-secondary-300 text-secondary-400"
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://facebook.com" className="text-white">
            <FacebookIcon />
          </Link>
          <Link href="https://twitter.com" className="text-white">
            <TwitterIcon />
          </Link>
          <Link href="https://youtube.com" className="text-white">
            <YoutubeIcon />
          </Link>
          <Link href="https://instagram.com" className="text-white">
            <InstagramIcon />
          </Link>
        </div>
      </div>

      {/* 모바일 버전 (375px) */}
      <div className="mx-auto h-full max-w-[375px] px-4 sm:hidden">
        <div className="flex h-full flex-col justify-center">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex max-w-[160px] gap-4">
              <Link
                href="/privacy"
                className="hover:text-secondary-300 text-secondary-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/faq"
                className="hover:text-secondary-300 text-secondary-400"
              >
                FAQ
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="https://facebook.com" className="text-white">
                <FacebookIcon />
              </Link>
              <Link href="https://twitter.com" className="text-white">
                <TwitterIcon />
              </Link>
              <Link href="https://youtube.com" className="text-white">
                <YoutubeIcon />
              </Link>
              <Link href="https://instagram.com" className="text-white">
                <InstagramIcon />
              </Link>
            </div>
          </div>
          <span className="text-secondary-400">©codeit - 2024</span>
        </div>
      </div>
    </footer>
  );
}
