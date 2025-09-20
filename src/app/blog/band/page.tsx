import Link from "next/link";
import Image from "next/image";

// 이미지 파일은 /public/images/ 아래에 넣어 주세요.
// 예: /public/images/band.png, /public/images/instagram.png, /public/images/twitter.png

type SocialItem = {
  title: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
};

function SocialCard({ item }: { item: SocialItem }) {
  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.title}
      className="group block h-full"
    >
      <div className="h-full rounded-2xl border ring-1 ring-black/10 bg-white/70 dark:bg-white/5 p-2 shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-all duration-200 group-hover:shadow-lg">
        <div className="text-center">
          <h3 className="mb-6 text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {item.title}
          </h3>
          <div className="mx-auto flex items-center justify-center">
            <Image
              src={item.imgSrc}
              alt={item.imgAlt}
              width={200}
              height={200}
              className="h-[100px] w-[100px] sm:h-[140px] sm:w-[140px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Page() {
  const socialLinks: SocialItem[] = [
    {
      title: "하나와영 밴드 링크",
      href: "https://www.band.us/band/98494837",
      imgSrc: "/band.png",
      imgAlt: "BAND 아이콘",
    },
    {
      title: "하나와영 인스타그램",
      href: "https://www.instagram.com/ku_oaz",
      imgSrc: "/instagram.png",
      imgAlt: "Instagram 아이콘",
    },
    // 새로운 SNS를 추가하려면 이 배열에 객체를 더 넣으세요
    // 예: {
    //   title: "하나와영 트위터",
    //   href: "https://twitter.com/",
    //   imgSrc: "/images/twitter.png",
    //   imgAlt: "Twitter 아이콘",
    // },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 sm:px-8">
      <div className="h-6 sm:h-10" />

      <section className="rounded-3xl bg-white/40 dark:bg-white/5 p-5 sm:p-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map((item) => (
            <SocialCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <div className="h-10" />
    </main>
  );
}
