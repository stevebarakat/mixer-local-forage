import { prisma } from "@/utils/db.server";

export async function getAutomationData() {
  const automationData = await prisma.automationData.findMany();
  return automationData;
}

export async function getSourceSong(slug: string | undefined) {
  const sourceSong = await prisma.song.findUnique({
    where: { slug },
    include: { tracks: true },
  });
  return sourceSong;
}

export async function getCurrentMix(mixId: string) {
  const currentMix = await prisma.mixSettings.findUnique({
    where: { id: mixId },
  });
  return currentMix;
}

export async function getCurrentTracks(mixId: string) {
  const currentTracks = await prisma.trackSettings.findMany({
    where: {
      mixSettingsId: mixId,
    },
    orderBy: {
      position: "asc",
    },
  });
  return currentTracks;
}
