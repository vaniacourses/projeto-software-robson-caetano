-- CreateTable
CREATE TABLE "ProductDistribution" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "distributedByUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDistribution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductDistribution" ADD CONSTRAINT "ProductDistribution_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDistribution" ADD CONSTRAINT "ProductDistribution_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDistribution" ADD CONSTRAINT "ProductDistribution_distributedByUserId_fkey" FOREIGN KEY ("distributedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
