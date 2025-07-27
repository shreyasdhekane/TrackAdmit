import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { HeroHeader } from "./header";
import FooterSection from "./Footer";
import Features from "./Features";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 0.6,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <div className="absolute inset-0 -z-10 size-full "></div>
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup>
                  <Link
                    href="#link"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      Get ready to conqure college application
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-8 text-balance text-2xl md:text-4xl lg:mt-16 xl:text-6xl"
                >
                  Manage Your College Applications Like a Pro
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg"
                >
                  Track deadlines, manage docs, and never miss an application
                  update. Designed for students. Built by one.
                </TextEffect>

                <AnimatedGroup className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                  >
                    <SignedIn>
                      <Button
                        asChild
                        size="lg"
                        className="rounded-xl px-5 text-base"
                      >
                        <Link href="/ApplicationManager">
                          <span className="text-nowrap">Start Building</span>
                        </Link>
                      </Button>
                    </SignedIn>
                    <SignedOut>
                      <Button
                        asChild
                        size="lg"
                        className="rounded-xl px-5 text-base"
                      >
                        <Link href="/sign-in">
                          <span className="text-nowrap">Start Building</span>
                        </Link>
                      </Button>
                    </SignedOut>
                  </div>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup>
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <Image
                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                    src="/product.png"
                    alt="app screen"
                    width="2700"
                    height="1440"
                  />
                  <Image
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                    src="/mail2-light.png"
                    alt="app screen"
                    width="2700"
                    height="1440"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        <section className="bg-background md:pb-8">
          <Features />
        </section>
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
            <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
              <h2 className="text-4xl font-medium lg:text-5xl">
                Application Manager in Numbers
              </h2>
              <p>
                Helping students simplify their college journey. Built with real
                feedback from applicants and tailored for global needs.
              </p>
            </div>

            <div className="grid divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
              <div className="space-y-4">
                <div className="text-5xl font-bold">+150</div>
                <p>Colleges Tracked</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold">30+</div>
                <p>Active Users</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold">+120</div>
                <p>Applications Completed</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <FooterSection />
        </section>
      </main>
    </>
  );
}
