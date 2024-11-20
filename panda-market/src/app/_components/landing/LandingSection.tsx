import Image from "next/image";

interface LandingSectionProps {
  imageUrl: string;
  imageAlt: string;
  badge: string;
  title: string;
  description: string;
  alignment?: "start" | "end";
  reversed?: boolean;
}

const LandingSection = ({
  imageUrl,
  imageAlt,
  badge,
  title,
  description,
  alignment = "start",
  reversed = false,
}: LandingSectionProps) => {
  const alignmentClasses = {
    start: "items-start text-start",
    end: "items-end text-end",
  };

  const SectionTitle = ({ text }: { text: string }) => (
    <span className="whitespace-nowrap text-[24px] font-bold leading-[32px] text-secondary-700 tablet:text-[32px] tablet:leading-[42px] pc:whitespace-pre-line pc:text-[40px] pc:leading-[56px]">
      {text}
    </span>
  );

  const SectionDescription = ({ text }: { text: string }) => (
    <span className="whitespace-pre-line text-[16px] text-lg leading-[26px] text-secondary-700 tablet:text-[18px] pc:text-[24px] pc:leading-[32px]">
      {text}
    </span>
  );

  return (
    <section className="flex w-full items-center justify-center px-[15px] py-[20px] tablet:min-h-[720px] tablet:px-[24px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <div
          className={`flex flex-col items-center gap-8 pc:flex-row pc:items-center pc:gap-[64px] ${
            reversed ? "pc:flex-row-reverse" : ""
          }`}
        >
          <Image
            src={imageUrl}
            width={344}
            height={259}
            alt={imageAlt}
            className="w-full tablet:min-h-[524px] tablet:min-w-[696px] pc:min-w-[444px] pc:min-w-[588px]"
          />
          <div
            className={`flex w-full flex-col gap-4 ${alignmentClasses[alignment]} pc:${alignmentClasses[alignment]}`}
          >
            <span
              className={`flex text-lg font-bold text-primary-100 pc:text-[18px] ${alignmentClasses[alignment]}`}
            >
              {badge}
            </span>
            <div className="flex flex-col gap-[16px]">
              <SectionTitle text={title} />
              <SectionDescription text={description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
