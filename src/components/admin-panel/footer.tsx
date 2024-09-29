import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          <Link href='https://adventleaders.com/unconference' target='_blank' className="font-medium italic underline underline-offset-4">
            2nd annual Advent UNconference
          </Link>,{" "}
          <Link href='https://maps.app.goo.gl/WfEvPcEFcg9qxjJaA' className="font-medium italic underline underline-offset-4" target='_blank'>Berivoi, Romania</Link>,{" "}
          October 16th - 19th, 2024.
        </p>
      </div>
    </div>
  );
}
