import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { deleteFile } from '@utils/file';
import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const checkUuid = validate(car_id);

    if (!checkUuid) {
      throw new AppError('Invalid car id', 400);
    }

    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exists.', 404);
    }

    const carImages = await this.carsImagesRepository.findAllById(car_id);

    carImages.forEach(async (carImage) => {
      await this.carsImagesRepository.deleteImage(carImage.id);
      await deleteFile(`./tmp/cars/${carImage.image_name}`);
    });

    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
