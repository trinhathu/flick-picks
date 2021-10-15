-- CreateTable
CREATE TABLE "Flick" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "Runtime" TEXT NOT NULL,
    "Genre" TEXT NOT NULL,
    "Plot" TEXT NOT NULL,
    "Poster" TEXT NOT NULL,
    "imdbRating" TEXT NOT NULL,
    "imdbVotes" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "totalSeasons" INTEGER NOT NULL
);
