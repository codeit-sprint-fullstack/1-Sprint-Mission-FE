import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="btn-sign-in-frame">
      <Link className={"btn-sign-in-logo-frame"} href="/">
        <button className="btn-sign-in-logo" />
      </Link>
    </div>
  );
}
