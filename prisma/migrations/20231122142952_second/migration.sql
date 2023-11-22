/*
  Warnings:

  - You are about to drop the column `position` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `TrackSettings` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MixSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "songSlug" TEXT NOT NULL,
    "mixName" TEXT NOT NULL,
    "artistPhoto" TEXT NOT NULL DEFAULT 'default',
    "coverArt" TEXT NOT NULL DEFAULT '1',
    "private" BOOLEAN NOT NULL DEFAULT false,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "volume" REAL NOT NULL DEFAULT -32,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MixSettings_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User" ("userName") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MixSettings" ("artistPhoto", "coverArt", "createdAt", "id", "likes", "mixName", "private", "songSlug", "updatedAt", "userId", "userName", "volume") SELECT "artistPhoto", "coverArt", "createdAt", "id", "likes", "mixName", "private", "songSlug", "updatedAt", "userId", "userName", "volume" FROM "MixSettings";
DROP TABLE "MixSettings";
ALTER TABLE "new_MixSettings" RENAME TO "MixSettings";
CREATE UNIQUE INDEX "MixSettings_mixName_key" ON "MixSettings"("mixName");
CREATE TABLE "new_Track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    CONSTRAINT "Track_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Track" ("id", "name", "path", "songId") SELECT "id", "name", "path", "songId" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE TABLE "new_TrackSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "songSlug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mixName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "volume" INTEGER NOT NULL,
    "volumeMode" TEXT NOT NULL,
    "pan" INTEGER NOT NULL,
    "panMode" TEXT NOT NULL,
    "soloMute" TEXT NOT NULL,
    "soloMuteMode" TEXT NOT NULL,
    "fxNames" TEXT NOT NULL DEFAULT '[]',
    "delaySettings" TEXT NOT NULL,
    "reverbSettings" TEXT NOT NULL,
    "pitchShiftSettings" TEXT NOT NULL,
    "panelPosition" TEXT NOT NULL,
    "panelSize" TEXT NOT NULL,
    "panelActive" BOOLEAN NOT NULL,
    "mixSettingsId" TEXT NOT NULL,
    CONSTRAINT "TrackSettings_mixSettingsId_fkey" FOREIGN KEY ("mixSettingsId") REFERENCES "MixSettings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TrackSettings" ("delaySettings", "fxNames", "id", "mixName", "mixSettingsId", "name", "pan", "panMode", "panelActive", "panelPosition", "panelSize", "path", "pitchShiftSettings", "reverbSettings", "soloMute", "soloMuteMode", "songSlug", "volume", "volumeMode") SELECT "delaySettings", "fxNames", "id", "mixName", "mixSettingsId", "name", "pan", "panMode", "panelActive", "panelPosition", "panelSize", "path", "pitchShiftSettings", "reverbSettings", "soloMute", "soloMuteMode", "songSlug", "volume", "volumeMode" FROM "TrackSettings";
DROP TABLE "TrackSettings";
ALTER TABLE "new_TrackSettings" RENAME TO "TrackSettings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
