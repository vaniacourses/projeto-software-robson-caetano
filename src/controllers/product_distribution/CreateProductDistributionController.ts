import { NotFoundError } from "~/errors/domain/NotFoundError";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";
import { ProductRepositoryStrategy } from "~/repositories/product/ProductRepositoryStrategy";
import { ProductDistributionRepositoryStrategy } from "~/repositories/product_distribution/ProductDistributionRepositoryStrategy";
import { RoomRepositoryStrategy } from "~/repositories/room/RoomRepositoryStrategy";
import { StorageRepositoryStrategy } from "~/repositories/storage/StorageRepositoryStrategy";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";


interface Params {
    roomId: number;
    productId: number;
    quantity: number;
    distributedByUserId: number;
}

export class CreateProductDistributionController {
    constructor(
        private roomRepository: RoomRepositoryStrategy,
        private userRepository: UserRepositoryStrategy,
        private productRepository: ProductRepositoryStrategy,
        private storageRepository: StorageRepositoryStrategy,
        private productDistributionRepository: ProductDistributionRepositoryStrategy
    ) { }

    async createProductDistribution({
        roomId,
        productId,
        quantity,
        distributedByUserId
    }: Params) {
        // Verificar se a sala existe
        const room = await this.roomRepository.getById(roomId);
        if (!room) {
            throw new NotFoundError("Sala não encontrada");
        }

        // Verificar se o produto existe
        const product = await this.productRepository.getById(productId);
        if (!product) {
            throw new NotFoundError("Produto não encontrado");
        }

        // Verificar se o usuário existe
        const userExists = await this.userRepository.getById(distributedByUserId);
        if (!userExists) {
            throw new NotFoundError("Usuário não encontrado");
        }

        // Verificar a quantidade disponível no armazenamento
        const storage = await this.storageRepository.getByProductId(productId);
        if (!storage || storage.quantity < quantity) {
            throw new UnprocessableEntityError("não possui quantidade sufiente no estoque para realizar o cadastro");
        }

        // Criar a distribuição do produto
        const productDistribution = await this.productDistributionRepository.create(
            roomId,
            productId,
            quantity,
            distributedByUserId
        );

        if (storage.quantity === quantity) {
            // Quantidade do produto acabou no estoque
            await this.storageRepository.deleteByProductId(productId);
        } else {
            // Atualizar a quantidade no armazenamento
            await this.storageRepository.updateByProductId(productId, storage.quantity - quantity);
        }


        return productDistribution;
    }
}