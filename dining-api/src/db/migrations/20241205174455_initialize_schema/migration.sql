-- CreateEnum
CREATE TYPE "DietaryRestriction" AS ENUM ('Vegetarian', 'GlutenFree', 'Paleo', 'Vegan');

-- CreateTable
CREATE TABLE "diners" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "restrictions" "DietaryRestriction"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DinerToReservation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DinerToReservation_AB_unique" ON "_DinerToReservation"("A", "B");

-- CreateIndex
CREATE INDEX "_DinerToReservation_B_index" ON "_DinerToReservation"("B");

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DinerToReservation" ADD CONSTRAINT "_DinerToReservation_A_fkey" FOREIGN KEY ("A") REFERENCES "diners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DinerToReservation" ADD CONSTRAINT "_DinerToReservation_B_fkey" FOREIGN KEY ("B") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
