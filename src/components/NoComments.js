import Image from "next/image";

export default function NoComments() {
  return (
    <div className={styles.noComments}>
      <Image
        src="/images/img_nocomments.png"
        alt="No comments"
        width={151}
        height={208}
      />
    </div>
  );
}
