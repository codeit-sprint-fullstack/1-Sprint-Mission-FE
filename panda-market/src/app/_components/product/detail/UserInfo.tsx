import Image from "next/image";

interface UserInfoProps {
  user: {
    id?: string;
    name: string | null;
    image?: string | null;
  };
  createdAt: Date;
  className?: string;
}

export function UserInfo({ user, createdAt, className = "" }: UserInfoProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const postedDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - postedDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes === 0) {
          return "방금 전";
        }
        return `${diffMinutes}분 전`;
      }
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return postedDate.toLocaleDateString();
    }
  };

  return (
    <div
      className={`flex items-center justify-between border-secondary-100 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={user.image ?? "/icons/icon-user-profile.svg"}
            alt={user.name ?? "사용자"}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-secondary-900">{user.name}</p>
          <p className="text-xs text-secondary-500">{formatDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
