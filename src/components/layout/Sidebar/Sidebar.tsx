"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Braces, ChevronsUpDown, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { env } from "@/env.mjs";

const NavTreeView = dynamic(() => import("./NavTreeView"), {
  ssr: false,
  loading: () => (
    <div className="p-2">
      <Skeleton className=" h-40 w-full" />
    </div>
  ),
});

export function AppSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar className="dark" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {open && (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex items-center justify-center rounded-lg data-[state=open]:block">
                  <Link
                    href={"/dashboard"}
                    className={"flex justify-center text-center"}
                  >
                    <Image
                      src={"/bitswan-logo.svg"}
                      alt="bitswan logo"
                      className="mr-auto transform duration-100 ease-in-out"
                      width={150}
                      height={100}
                    />
                  </Link>
                </div>
              </SidebarMenuButton>
            )}
            {!open && (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="mx-auto flex items-center justify-center rounded-lg">
                  <Link
                    href={"/dashboard"}
                    className={"mx-auto flex justify-center text-center"}
                  >
                    <Image
                      src={"/bitswan-logo-sm.svg"}
                      alt="bitswan logo"
                      className="mr-auto transform duration-100 ease-in-out"
                      width={25}
                      height={25}
                    />
                  </Link>
                </div>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="text-neutral-200">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={"pipelines"}>
                <SidebarMenuButton asChild>
                  <a href={"#"}>
                    <Braces />
                    <span>{"Pipelines"}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavTreeView />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-neutral-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={"#"} alt={"Mike Farad"} />
                    <AvatarFallback className="rounded-lg">MF</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {"Mike Farad"}
                    </span>
                    <span className="truncate text-xs">
                      {"mike@example.com"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={"#"} alt={"Mike Farad"} />
                      <AvatarFallback className="rounded-lg">MF</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {"Mike Farad"}
                      </span>
                      <span className="truncate text-xs">
                        {"mike@example.com"}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="text-sm">
                  <Link href={"/dashboard/settings"}>
                    <DropdownMenuItem className="text-sm">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut size={16} className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export type BuildTagsProps = {
  expanded: boolean;
};

function BuildTags(props: Readonly<BuildTagsProps>) {
  const { expanded } = props;

  return (
    <div
      className={clsx(
        "flex w-full flex-col justify-center space-y-3 pl-6 font-mono text-[8px] md:pl-0",
      )}
    >
      <div
        className={clsx("space-y-0.5", {
          "flex gap-1 pl-2 md:justify-start": expanded,
        })}
      >
        <div className="font-bold">Commit Hash:</div>
        <div className="text-neutral-500 underline">
          #{env.NEXT_PUBLIC_COMMIT_HASH.substring(0, 6)}
        </div>
      </div>
      <div
        className={clsx("space-y-0.5", {
          "flex gap-1 pl-2 md:justify-start": expanded,
        })}
      >
        <div className="font-bold">Build No:</div>
        <div className="text-neutral-500 underline">
          {env.NEXT_PUBLIC_BUILD_NO}
        </div>
      </div>
    </div>
  );
}