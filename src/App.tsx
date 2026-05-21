import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { avatars } from "./data/mock";
import { AvatarChatPage } from "./pages/AvatarChatPage";
import { AvatarNetworkPage } from "./pages/AvatarNetworkPage";
import { ConnectionsPage } from "./pages/ConnectionsPage";
import { DatasetPage } from "./pages/DatasetPage";
import { RoundtablePage } from "./pages/RoundtablePage";
import { SettingsPage } from "./pages/SettingsPage";
import { StudioPage } from "./pages/StudioPage";
import type { AvatarProfile, PageKey } from "./types";

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>("studio");
  const [roundtableParticipants, setRoundtableParticipants] = useState<AvatarProfile[]>(avatars.slice(0, 5));

  const inviteAvatar = (avatar: AvatarProfile) => {
    setRoundtableParticipants((items) => {
      if (items.some((item) => item.name === avatar.name)) return items;
      return [...items, avatar];
    });
  };

  return (
    <AppShell
      activePage={activePage}
      onPageChange={setActivePage}
      onBuildAvatar={() => setActivePage("studio")}
      onStartRoundtable={() => setActivePage("roundtable")}
    >
      {activePage === "studio" && <StudioPage />}
      {activePage === "chat" && <AvatarChatPage onInviteToRoundtable={inviteAvatar} />}
      {activePage === "roundtable" && <RoundtablePage participants={roundtableParticipants} />}
      {activePage === "network" && <AvatarNetworkPage participants={roundtableParticipants} onInvite={inviteAvatar} />}
      {activePage === "connections" && <ConnectionsPage />}
      {activePage === "dataset" && <DatasetPage />}
      {activePage === "settings" && <SettingsPage />}
    </AppShell>
  );
}
