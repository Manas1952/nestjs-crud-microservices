import { Test, TestingModule } from '@nestjs/testing';
import { ProductServiceController } from '../../src/product-service.controller';
import { ProductServiceService } from '../../src/product-service.service';

describe('ProductServiceController', () => {
  let controller: ProductServiceController;
  let service: ProductServiceService;

  const mockService = {
    create: jest.fn(),
    updateStock: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductServiceController],
      providers: [
        {
          provide: ProductServiceService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductServiceController>(ProductServiceController);
    service = module.get<ProductServiceService>(ProductServiceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET → should return all products', async () => {
    const mockProducts = [{ id: 1, name: 'A', stock: 10 }];
    mockService.findAll.mockResolvedValue(mockProducts);

    const result = await controller.getUsers();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });

  it('POST → should create a product', async () => {
    const payload = { name: 'New Product', stock: 5 };
    const createdProduct = { id: 1, ...payload };
    mockService.create.mockResolvedValue(createdProduct);

    const result = await controller.create(payload);

    expect(service.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual(createdProduct);
  });

  it('PUT → should update product stock', async () => {
    const body = { id: 1, stock: 99 };
    const updated = { id: 1, name: 'Existing', stock: 99 };
    mockService.updateStock.mockResolvedValue(updated);

    const result = await controller.updateStock(body);

    expect(service.updateStock).toHaveBeenCalledWith(1, 99);
    expect(result).toEqual(updated);
  });

  it('DELETE → should remove product', async () => {
    const body = { id: 1 };
    const response = { affected: 1 };
    mockService.remove.mockResolvedValue(response);

    const result = await controller.remove(body);

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(response);
  });
});
