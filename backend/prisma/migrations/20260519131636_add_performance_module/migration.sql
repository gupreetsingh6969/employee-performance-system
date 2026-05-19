/*
  Warnings:

  - You are about to drop the column `feedback` on the `Performance` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Performance` table. All the data in the column will be lost.
  - Added the required column `kpi` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "feedback",
DROP COLUMN "score",
ADD COLUMN     "kpi" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL,
ADD COLUMN     "reviewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
