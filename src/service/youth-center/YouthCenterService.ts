import { YouthCenter } from '../../domain/YouthCenter';
import { BaseService } from '../base/BaseService';

export class YouthCenterService extends BaseService<YouthCenter> {
  constructor() {
    super('centers');
  }
}
