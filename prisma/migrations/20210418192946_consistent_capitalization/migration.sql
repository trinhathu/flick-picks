/*
  Warnings:

  - You are about to drop the column `Title` on the `Flick` table. All the data in the column will be lost.
  - You are about to drop the column `Year` on the `Flick` table. All the data in the column will be lost.
  - You are about to drop the column `Runtime` on the `Flick` table. All the data in the column will be lost.
  - You are about to drop the column `Genre` on the `Flick` table. All the data in the column will be lost.
  - You are about to drop the column `Plot` on the `Flick` table. All the data in the column will be lost.
  - You are about to drop the column `Poster` on the `Flick` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `Flick` table. All the data in the column will be lost.
  - Added the required column `title` to the `Flick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Flick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `Flick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Flick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plot` to the `Flick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `Flick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Flick` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flick" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "runtime" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "imdbRating" TEXT NOT NULL,
    "imdbVotes" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "totalSeasons" INTEGER NOT NULL
);
INSERT INTO "new_Flick" ("id", "imdbRating", "imdbVotes", "imdbID", "totalSeasons") SELECT "id", "imdbRating", "imdbVotes", "imdbID", "totalSeasons" FROM "Flick";
DROP TABLE "Flick";
ALTER TABLE "new_Flick" RENAME TO "Flick";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
