import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortnerController } from './url-shortner.controller';

describe('UrlShortnerController', () => {
  let controller: UrlShortnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortnerController],
    }).compile();

    controller = module.get<UrlShortnerController>(UrlShortnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
