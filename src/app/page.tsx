export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="w-full max-w-[320px] sm:max-w-md flex flex-col gap-6">
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-[#18181B]">
          Emir Aydın
        </h1>
        <p className="text-[15px] sm:text-base text-[#18181B] leading-relaxed">
          I build web applications where the code, trade-offs, and verification are visible.
        </p>
        <div className="w-12 h-px bg-[#E4E4E7]"></div>
        <p className="text-sm font-medium text-[#2563EB]">
          Portfolio coming soon.
        </p>
      </div>
    </main>
  );
}
