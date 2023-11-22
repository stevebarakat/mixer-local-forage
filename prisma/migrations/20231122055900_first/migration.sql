-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "studio" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    CONSTRAINT "Track_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MixSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "songSlug" TEXT NOT NULL,
    "mixName" TEXT NOT NULL,
    "artistPhoto" TEXT NOT NULL DEFAULT 'default',
    "coverArt" TEXT NOT NULL DEFAULT '0',
    "private" BOOLEAN NOT NULL DEFAULT false,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "volume" REAL NOT NULL DEFAULT -32,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MixSettings_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User" ("userName") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrackSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" INTEGER NOT NULL DEFAULT 0,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Song_slug_key" ON "Song"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MixSettings_mixName_key" ON "MixSettings"("mixName");
