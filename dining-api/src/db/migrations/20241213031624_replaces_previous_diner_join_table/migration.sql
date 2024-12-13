/*
  Warnings:

  - You are about to drop the `_DinerToReservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DinerToReservation" DROP CONSTRAINT "_DinerToReservation_A_fkey";

-- DropForeignKey
ALTER TABLE "_DinerToReservation" DROP CONSTRAINT "_DinerToReservation_B_fkey";

-- DropTable
DROP TABLE "_DinerToReservation";

-- CreateTable
CREATE TABLE "DinerReservations" (
    "reservationId" INTEGER NOT NULL,
    "dinerId" INTEGER NOT NULL,

    CONSTRAINT "DinerReservations_pkey" PRIMARY KEY ("reservationId","dinerId")
);

-- AddForeignKey
ALTER TABLE "DinerReservations" ADD CONSTRAINT "DinerReservations_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DinerReservations" ADD CONSTRAINT "DinerReservations_dinerId_fkey" FOREIGN KEY ("dinerId") REFERENCES "diners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
