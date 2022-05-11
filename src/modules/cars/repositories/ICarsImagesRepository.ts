import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  findAllById(car_id: string): Promise<CarImage[]>;
  deleteImage(id: string): Promise<void>;
}

export { ICarsImagesRepository };
