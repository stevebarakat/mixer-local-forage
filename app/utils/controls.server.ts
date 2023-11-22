import { prisma } from "@/utils/db.server";

// export async function getAutomationData() {
//   const automationData = await prisma.automationData.findMany();
//   return automationData;
// }

export async function getSourceSong(slug: string | undefined) {
  return await prisma.song.findUnique({
    where: { slug },
    include: { tracks: true },
  });
}

export async function getCurrentMix(mixId: string) {
  return await prisma.mixSettings.findUnique({
    where: { id: mixId },
  });
}

export async function getCurrentTracks(mixId: string) {
  return await prisma.trackSettings.findMany({
    where: {
      mixSettingsId: mixId,
    },
  });
}
