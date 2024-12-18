import { Loader2, Workflow } from "lucide-react";
import { type MQTTProfile, useMQTTProfileList } from "./groupsHooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { ACTIVE_MQTT_PROFILE_STORAGE_KEY } from "@/shared/constants";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import useLocalStorageState from "ahooks/lib/useLocalStorageState";

export default function MQTTProfileSelector() {
  const { data: mqttProfiles, isLoading } = useMQTTProfileList();

  const [activeMQTTProfile, saveActiveMQTTProfile] = useLocalStorageState<
    MQTTProfile | undefined
  >(ACTIVE_MQTT_PROFILE_STORAGE_KEY, {
    defaultValue: mqttProfiles?.results?.[0],
    listenStorageChange: true,
  });

  const handleActiveMQTTUserChange = (orgGroupId: string) => {
    void saveActiveMQTTProfile(
      mqttProfiles?.results?.find((profile) => profile.id === orgGroupId),
    );
  };

  return (
    <Select
      value={activeMQTTProfile?.id}
      onValueChange={handleActiveMQTTUserChange}
    >
      <SelectTrigger className="w-[280px] bg-neutral-100">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <span className="flex">
              <Loader2 size={20} className="mr-2 animate-spin" />
              <span>Loading profiles...</span>
            </span>
          ) : (
            <Workflow
              size={20}
              strokeWidth={2.0}
              className="mr-2 text-neutral-600"
            />
          )}
          <SelectValue
            placeholder={!isLoading && "Select profile"}
            defaultValue={activeMQTTProfile?.id ?? undefined}
            className="font-medium"
          />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            <div>MQTT profiles</div>
            {isLoading && <Skeleton className="mt-2 h-10 w-full" />}
            {mqttProfiles?.results?.length === 0 && (
              <div className="mt-2 flex h-16 flex-col items-center justify-center gap-2 rounded border border-dashed">
                <div className="text-center text-sm font-normal text-neutral-500">
                  No mqtt profiles found
                </div>
              </div>
            )}
          </SelectLabel>
          {mqttProfiles?.results?.map((orgGroup) => (
            <SelectItem key={orgGroup.id} value={orgGroup.id}>
              {orgGroup.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
